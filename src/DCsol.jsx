import React, { useState, useEffect } from 'react'
import { Transaction } from '@solana/web3.js'

const API_GATEWAY_URL = 'https://l893o59kbj.execute-api.us-east-1.amazonaws.com/dev'

// Helper to handle CORS issues
const fetchWithRetry = async (url, options, retries = 1) => {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        mode: 'cors',
        credentials: 'omit'
      })
      return response
    } catch (error) {
      if (i === retries) throw error
      console.log(`Retry ${i + 1}...`)
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}

function DCsol({ onBack }) {
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState(null)
  const [publicKey, setPublicKey] = useState(null)
  const [loading, setLoading] = useState(false)
  const [eligibleItems, setEligibleItems] = useState([])
  const [totalReclaimable, setTotalReclaimable] = useState(0)

  // Connect Solana wallet
  const connectWallet = async () => {
    // Check for Phantom wallet
    if (typeof window !== 'undefined' && window.solana && window.solana.isPhantom) {
      try {
        // Check if already connected
        if (window.solana.isConnected) {
          const publicKey = window.solana.publicKey
          setPublicKey(publicKey)
          setWalletAddress(publicKey.toString())
          setWalletConnected(true)
          return
        }
        
        // Request connection
        const response = await window.solana.connect({ onlyIfTrusted: false })
        setPublicKey(response.publicKey)
        setWalletAddress(response.publicKey.toString())
        setWalletConnected(true)
      } catch (err) {
        console.error('Error connecting wallet:', err)
        if (err.code === 4001) {
          alert('Connection rejected. Please approve the connection request.')
        } else {
          alert('Failed to connect wallet: ' + (err.message || 'Unknown error'))
        }
      }
    } 
    // Check for Solflare wallet
    else if (typeof window !== 'undefined' && window.solflare) {
      try {
        await window.solflare.connect()
        const publicKey = window.solflare.publicKey
        setPublicKey(publicKey)
        setWalletAddress(publicKey.toString())
        setWalletConnected(true)
      } catch (err) {
        console.error('Error connecting Solflare:', err)
        alert('Failed to connect Solflare wallet: ' + (err.message || 'Unknown error'))
      }
    } 
    else {
      alert('Please install Phantom or Solflare wallet extension!')
    }
  }

  // Scan wallet for eligible items
  const scanWallet = async () => {
    if (!walletAddress) return
    
    setLoading(true)
    try {
      console.log('Scanning wallet:', walletAddress)
      console.log('API URL:', `${API_GATEWAY_URL}/scan`)
      
      const response = await fetchWithRetry(`${API_GATEWAY_URL}/scan`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ walletAddress })
      })
      
      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)
      
      if (!response.ok) {
        let errorData
        try {
          errorData = await response.json()
        } catch (e) {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` }
        }
        console.error('API Error:', response.status, errorData)
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log('Scan response:', data)
      
      // Handle empty wallet gracefully
      setEligibleItems(data.items || [])
      setTotalReclaimable(parseFloat(data.totalReclaimable || 0))
      
      // If wallet is empty, that's fine - just show no items
      if (!data.items || data.items.length === 0) {
        console.log('No eligible items found - wallet may be empty or have no closed accounts')
      }
    } catch (error) {
      console.error('Error scanning wallet:', error)
      console.error('Full error details:', {
        message: error.message,
        stack: error.stack,
        walletAddress,
        apiUrl: `${API_GATEWAY_URL}/scan`
      })
      
      // More specific error messages
      if (error.message === 'Failed to fetch') {
        alert('Network error: Could not reach API Gateway.\n\nPossible causes:\n- CORS not configured\n- API Gateway endpoint incorrect\n- Network connectivity issue\n\nCheck browser console for details.')
      } else {
        alert(`Failed to scan wallet: ${error.message}\n\nCheck browser console for details.`)
      }
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
      const response = await fetchWithRetry(`${API_GATEWAY_URL}/reclaim`, {
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
      
      // Handle different wallet providers
      let signed
      let walletProvider
      
      if (window.solana && window.solana.isPhantom) {
        walletProvider = window.solana
      } else if (window.solflare) {
        walletProvider = window.solflare
      } else {
        throw new Error('No wallet provider found')
      }
      
      signed = await walletProvider.signTransaction(transactionObj)
      const signature = await walletProvider.sendTransaction(signed)
      
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

