import React, { useState } from 'react'

function TalentSearch({ onBack }) {
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
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setDemoForm({ name: '', email: '', phone: '', company: '', message: '' })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Talent Search & Outreach</h1>
          <p className="text-xl md:text-2xl text-gray-400">
            Discover skilled professionals and reach out with confidence
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What is Talent Search & Outreach?</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p className="text-lg">
              Talent Search & Outreach is a recruiting workflow tool that helps you find
              the right candidates, understand their fit, and move from search to
              conversation without juggling spreadsheets and ten different tabs.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl">🔎</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Smarter discovery</h3>
                  <p className="text-gray-400">
                    Surface professionals that match the skills, experience, and signals
                    you care about for each role.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">✉️</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Outreach built in</h3>
                  <p className="text-gray-400">
                    Go from shortlist to first touch with a consistent, trackable outreach
                    flow your team can repeat.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Pipeline clarity</h3>
                  <p className="text-gray-400">
                    Keep context on candidates and next steps so nothing falls through the
                    cracks between hiring managers and recruiters.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">⚡</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Built for speed</h3>
                  <p className="text-gray-400">
                    Spend less time on admin and more time talking to people who are actually
                    a fit for the role.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Key features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-2">Role-aware search</h3>
              <p className="text-gray-400">
                Tune search around the role you are hiring for instead of generic keyword
                dumps.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-2">Candidate context</h3>
              <p className="text-gray-400">
                Keep notes, stage, and history in one place so the whole team stays aligned.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-2">Outreach templates</h3>
              <p className="text-gray-400">
                Start from proven messaging and adapt per candidate without starting from
                zero every time.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-2">Team-ready</h3>
              <p className="text-gray-400">
                Works for solo founders scaling hiring and for small teams sharing the same
                pipeline.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Schedule a demo</h2>
          <p className="text-gray-400 text-center mb-8">
            See Talent Search & Outreach in action. Tell us about your hiring goals and we
            will walk you through a live walkthrough.
          </p>

          {submitted ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <p className="text-2xl font-bold text-green-400">Demo request submitted</p>
              <p className="text-gray-400 mt-2">We will contact you shortly.</p>
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
                Schedule demo
              </button>
            </form>
          )}
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

export default TalentSearch
