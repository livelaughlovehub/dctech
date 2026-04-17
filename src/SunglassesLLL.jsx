import React from 'react'

function SunglassesLLL({ onBack }) {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Sunglasses LL&L</h1>
          <p className="text-xl md:text-2xl text-gray-400">
            AI-Commerce Collection
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About the Glasses</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p className="text-lg">
              Sunglasses LL&L is a curated eyewear experience focused on clean style,
              premium feel, and all-day comfort. This page is your product detail hub
              where customers can learn about the collection before checkout.
            </p>
            <p>
              Built as part of your AI-commerce stack, this flow is designed to move
              from discovery to purchase with a clear offer and simple conversion path.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Highlights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-2">Premium Frames</h3>
              <p className="text-gray-400">Durable materials built for daily wear.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-2">UV Protection</h3>
              <p className="text-gray-400">Protective lenses for outdoor performance.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-2">Modern Styling</h3>
              <p className="text-gray-400">Clean looks that fit casual and premium outfits.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-2">Ready to Scale</h3>
              <p className="text-gray-400">Set up for AI-powered commerce and conversion.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Interested in a Demo?</h2>
          <p className="text-gray-400 mb-8">
            Want to see how this sunglasses commerce flow works end-to-end?
          </p>
          <a
            href="mailto:dctech0610@gmail.com?subject=Sunglasses%20LL%26L%20Demo%20Request"
            className="inline-block"
          >
            <button className="px-8 py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-100 transition-all">
              Contact for Demo
            </button>
          </a>
        </div>

        <div className="text-center mt-12">
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

export default SunglassesLLL
