import React, { useState } from 'react'

function SurveyFlow({ onBack }) {
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission (send to Lambda/email service)
    setSubmitted(true)
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setDemoForm({ name: '', email: '', phone: '', company: '', message: '' })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">SurveyFlow</h1>
          <p className="text-xl md:text-2xl text-gray-400">
            AI-Powered OCR for Land Surveyors
          </p>
        </div>

        {/* What It Does Section */}
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What is SurveyFlow?</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p className="text-lg">
              SurveyFlow is an AI-powered OCR (Optical Character Recognition) application designed specifically for DMV land surveyors. Transform your workflow by converting plat photos into permanent client links in seconds.
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📸</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Upload Plat Photos</h3>
                  <p className="text-gray-400">Simply upload a photo of your survey plat and let our AI do the work.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-2xl">⚡</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">10-Second Processing</h3>
                  <p className="text-gray-400">Get a permanent client link in just 10 seconds. No manual data entry required.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-2xl">🔗</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Permanent Client Links</h3>
                  <p className="text-gray-400">Each processed plat gets a unique, permanent link you can share with clients instantly.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Built for DMV Surveyors</h3>
                  <p className="text-gray-400">Specialized for the DMV region. First 10 local surveyors get lifetime pricing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-2">AI-Powered OCR</h3>
              <p className="text-gray-400">Advanced OCR technology extracts text and data from survey plats with high accuracy.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-2">Fast Processing</h3>
              <p className="text-gray-400">Process plat photos in 10 seconds or less, saving hours of manual work.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-2">Client Portal</h3>
              <p className="text-gray-400">Generate permanent links that clients can access anytime, anywhere.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-2">DMV Focused</h3>
              <p className="text-gray-400">Optimized for DMV land surveyor workflows and requirements.</p>
            </div>
          </div>
        </div>

        {/* Schedule Demo Section */}
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Schedule a Demo</h2>
          <p className="text-gray-400 text-center mb-8">
            See SurveyFlow in action. Book a demo and see how we can streamline your workflow.
          </p>
          
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <p className="text-2xl font-bold text-green-400">Demo Request Submitted!</p>
              <p className="text-gray-400 mt-2">We'll contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={demoForm.name}
                  onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={demoForm.email}
                  onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Phone</label>
                <input
                  type="tel"
                  value={demoForm.phone}
                  onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Company</label>
                <input
                  type="text"
                  value={demoForm.company}
                  onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Message</label>
                <textarea
                  value={demoForm.message}
                  onChange={(e) => setDemoForm({ ...demoForm, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xl rounded-xl transition-all"
              >
                Schedule Demo
              </button>
            </form>
          )}
        </div>

        {/* Back to Home */}
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

export default SurveyFlow


