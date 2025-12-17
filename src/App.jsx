import React, { useEffect, useRef, useState } from 'react'
import proMailVideo from './assets/mailman.mp4'
import landSurveyVideo from './assets/land-survey.mp4'
import solIncineratorVideo from './assets/dcsol.mp4'
import DCsol from './DCsol.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const heroRef = useRef(null)
  const surveyFlowRef = useRef(null)
  const proMailRef = useRef(null)
  const solIncineratorRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [heroScale, setHeroScale] = useState(1)
  const [surveyFlowScale, setSurveyFlowScale] = useState(0.9)
  const [proMailScale, setProMailScale] = useState(0.9)
  const [solIncineratorScale, setSolIncineratorScale] = useState(0.9)
  const [surveyFlowOpacity, setSurveyFlowOpacity] = useState(0)
  const [proMailOpacity, setProMailOpacity] = useState(0)
  const [solIncineratorOpacity, setSolIncineratorOpacity] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateScrollEffects = () => {
      // Hero scale effect (shrinks as you scroll down)
      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect()
        const heroProgress = Math.max(0, Math.min(1, 1 - (heroRect.top + heroRect.height / 2) / (window.innerHeight * 1.5)))
        setHeroScale(1 - heroProgress * 0.3) // Scale from 1 to 0.7
      }

      // SurveyFlow scale and opacity
      if (surveyFlowRef.current) {
        const rect = surveyFlowRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const windowCenter = windowHeight / 2
        const elementCenter = rect.top + rect.height / 2
        const distanceFromCenter = Math.abs(elementCenter - windowCenter)
        const maxDistance = windowHeight * 0.8
        
        // Scale: bigger when centered (1.05), smaller when far (0.85)
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1)
        const scale = 0.85 + (1.05 - 0.85) * (1 - normalizedDistance)
        setSurveyFlowScale(Math.max(0.85, Math.min(1.05, scale)))
        
        // Opacity: fade in as it enters viewport
        const visibleRatio = Math.max(0, Math.min(1, (windowHeight - Math.max(0, rect.top)) / (windowHeight * 0.6)))
        setSurveyFlowOpacity(visibleRatio)
      }

      // ProMail scale and opacity
      if (proMailRef.current) {
        const rect = proMailRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const windowCenter = windowHeight / 2
        const elementCenter = rect.top + rect.height / 2
        const distanceFromCenter = Math.abs(elementCenter - windowCenter)
        const maxDistance = windowHeight * 0.8
        
        // Scale: bigger when centered (1.05), smaller when far (0.85)
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1)
        const scale = 0.85 + (1.05 - 0.85) * (1 - normalizedDistance)
        setProMailScale(Math.max(0.85, Math.min(1.05, scale)))
        
        // Opacity: fade in as it enters viewport
        const visibleRatio = Math.max(0, Math.min(1, (windowHeight - Math.max(0, rect.top)) / (windowHeight * 0.6)))
        setProMailOpacity(visibleRatio)
      }

      // Sol Incinerator scale and opacity
      if (solIncineratorRef.current) {
        const rect = solIncineratorRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const windowCenter = windowHeight / 2
        const elementCenter = rect.top + rect.height / 2
        const distanceFromCenter = Math.abs(elementCenter - windowCenter)
        const maxDistance = windowHeight * 0.8
        
        // Scale: bigger when centered (1.05), smaller when far (0.85)
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1)
        const scale = 0.85 + (1.05 - 0.85) * (1 - normalizedDistance)
        setSolIncineratorScale(Math.max(0.85, Math.min(1.05, scale)))
        
        // Opacity: fade in as it enters viewport
        const visibleRatio = Math.max(0, Math.min(1, (windowHeight - Math.max(0, rect.top)) / (windowHeight * 0.6)))
        setSolIncineratorOpacity(visibleRatio)
      }

      setScrollY(window.scrollY)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollEffects)
        ticking = true
      }
    }

    // Initial calculation
    updateScrollEffects()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateScrollEffects, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateScrollEffects)
    }
  }, [])

  // Show DC sol page if route is active
  if (currentPage === 'dcsol') {
    return <DCsol onBack={() => setCurrentPage('home')} />
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section - Full Screen Impact */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-6 py-20 md:py-32 sticky top-0"
        style={{
          transform: `scale(${heroScale})`,
          opacity: Math.max(0, Math.min(1, 1 - scrollY / 600)),
          willChange: 'transform, opacity'
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 md:mb-8 tracking-tight leading-[0.9] text-balance">
            DC-Future-Tech
          </h1>
          <div className="text-2xl md:text-3xl lg:text-4xl text-gray-400 mb-8 md:mb-12 font-light">
            DC-based builder
          </div>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            I ship dead-simple AI tools that kill boring admin work.
          </p>
        </div>
      </section>

      {/* Tools Section - Large, Immersive Cards */}
      <section className="px-6 py-20 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
          
          {/* SurveyFlow Card - First */}
          <div 
            ref={surveyFlowRef}
            className="group"
            style={{
              transform: `scale(${surveyFlowScale})`,
              opacity: surveyFlowOpacity,
              willChange: 'transform, opacity'
            }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-gray-800/50 hover:border-gray-700/50 transition-all duration-500">
              <div className="p-8 md:p-16 lg:p-20">
                <div className="mb-8 md:mb-12">
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                    SurveyFlow
                  </h2>
                  <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 leading-relaxed max-w-4xl">
                    Upload a plat photo → get a permanent client link in 10 seconds
                  </p>
                  <p className="text-base md:text-lg text-gray-500">
                    For DMV land surveyors • First 10 locals get lifetime pricing
                  </p>
                </div>
                
                {/* Video Preview */}
                <div className="mb-10 md:mb-12 rounded-2xl bg-black border border-gray-700/50 h-64 md:h-96 lg:h-[500px] overflow-hidden group-hover:border-gray-600 transition-colors duration-500">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={landSurveyVideo} type="video/mp4" />
                  </video>
                </div>
                
                <div>
                  <a
                    href="https://d25t0cfr5vha42.cloudfront.net/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full md:w-auto"
                  >
                    <button className="w-full md:w-auto px-12 md:px-16 py-5 md:py-6 bg-white text-black font-bold text-xl md:text-2xl lg:text-3xl rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] active:scale-100 shadow-2xl hover:shadow-white/30">
                      Open SurveyFlow →
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ProMail Card */}
          <div 
            ref={proMailRef}
            className="group"
            style={{
              transform: `scale(${proMailScale})`,
              opacity: proMailOpacity,
              willChange: 'transform, opacity'
            }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-gray-800/50 hover:border-gray-700/50 transition-all duration-500">
              <div className="p-8 md:p-16 lg:p-20">
                <div className="mb-8 md:mb-12">
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                    ProMail
                  </h2>
                  <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 leading-relaxed max-w-4xl">
                    Private @yourdomain.com email
                  </p>
                  <p className="text-base md:text-lg text-gray-500">
                    Currently running for a pro tennis academy
                  </p>
                </div>
                
                {/* Video Preview */}
                <div className="mb-10 md:mb-12 rounded-2xl bg-black border border-gray-700/50 h-64 md:h-96 lg:h-[500px] overflow-hidden group-hover:border-gray-600 transition-colors duration-500">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={proMailVideo} type="video/mp4" />
                  </video>
                </div>
                
                <div>
                  <a
                    href="https://main.dfsb5g96bxdtb.amplifyapp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full md:w-auto"
                  >
                    <button className="w-full md:w-auto px-12 md:px-16 py-5 md:py-6 bg-white text-black font-bold text-xl md:text-2xl lg:text-3xl rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] active:scale-100 shadow-2xl hover:shadow-white/30">
                      Open ProMail →
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sol Incinerator Card */}
          <div 
            ref={solIncineratorRef}
            className="group"
            style={{
              transform: `scale(${solIncineratorScale})`,
              opacity: solIncineratorOpacity,
              willChange: 'transform, opacity'
            }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-gray-800/50 hover:border-gray-700/50 transition-all duration-500">
              <div className="p-8 md:p-16 lg:p-20">
                <div className="mb-8 md:mb-12">
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                    DC sol
                  </h2>
                  <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 leading-relaxed max-w-4xl">
                    Reclaim stuck SOLANA tokens from your wallet → burn dust tokens and clean up your balance
                  </p>
                  <p className="text-base md:text-lg text-gray-500">
                    Connect your wallet to reclaim and burn unwanted SOL tokens
                  </p>
                </div>
                
                {/* Video Preview */}
                <div className="mb-10 md:mb-12 rounded-2xl bg-black border border-gray-700/50 h-64 md:h-96 lg:h-[500px] overflow-hidden group-hover:border-gray-600 transition-colors duration-500">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={solIncineratorVideo} type="video/mp4" />
                  </video>
                </div>
                
                <div>
                  <button
                    onClick={() => setCurrentPage('dcsol')}
                    className="w-full md:w-auto px-12 md:px-16 py-5 md:py-6 bg-white text-black font-bold text-xl md:text-2xl lg:text-3xl rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] active:scale-100 shadow-2xl hover:shadow-white/30"
                  >
                    Reclaim SOL →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="px-6 py-20 md:py-32 border-t border-gray-800/50 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 font-light">
            More coming: OCR receipts, field notes, invoice extractor, etc.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-gray-500 text-base md:text-lg">
            <span>IT Office open 24/7 Text/Call: +1(202)903-9758</span>
            <span className="hidden md:inline text-gray-700">•</span>
            <a 
              href="mailto:dctech0610@gmail.com" 
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Email: mail@dcfuturetech.com
            </a>
          </div>
          <p className="text-gray-600 text-sm md:text-base pt-8">
            © 2025 DCTech • Built by Robert
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
