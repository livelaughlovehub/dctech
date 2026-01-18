import React, { useEffect, useRef, useState } from 'react'

function LumaStyleTest({ onBack }) {
  const heroRef = useRef(null)
  const section1Ref = useRef(null)
  const section2Ref = useRef(null)
  const section3Ref = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [heroScale, setHeroScale] = useState(1)
  const [heroOpacity, setHeroOpacity] = useState(1)
  const [section1Scale, setSection1Scale] = useState(0.9)
  const [section1Opacity, setSection1Opacity] = useState(0)
  const [section2Scale, setSection2Scale] = useState(0.9)
  const [section2Opacity, setSection2Opacity] = useState(0)
  const [section3Scale, setSection3Scale] = useState(0.9)
  const [section3Opacity, setSection3Opacity] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateScrollEffects = () => {
      // Hero scale and opacity (shrinks and fades as you scroll)
      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect()
        const heroProgress = Math.max(0, Math.min(1, 1 - (heroRect.top + heroRect.height / 2) / (window.innerHeight * 1.5)))
        setHeroScale(1 - heroProgress * 0.4) // Scale from 1 to 0.6
        setHeroOpacity(1 - heroProgress * 0.8) // Fade out faster
      }

      // Text section 1 - scale and opacity based on position
      if (section1Ref.current) {
        const rect = section1Ref.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const windowCenter = windowHeight / 2
        const elementCenter = rect.top + rect.height / 2
        const distanceFromCenter = Math.abs(elementCenter - windowCenter)
        const maxDistance = windowHeight * 0.8
        
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1)
        const scale = 0.85 + (1.05 - 0.85) * (1 - normalizedDistance)
        setSection1Scale(Math.max(0.85, Math.min(1.05, scale)))
        
        const visibleRatio = Math.max(0, Math.min(1, (windowHeight - Math.max(0, rect.top)) / (windowHeight * 0.6)))
        setSection1Opacity(visibleRatio)
      }

      // Text section 2 - same effect
      if (section2Ref.current) {
        const rect = section2Ref.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const windowCenter = windowHeight / 2
        const elementCenter = rect.top + rect.height / 2
        const distanceFromCenter = Math.abs(elementCenter - windowCenter)
        const maxDistance = windowHeight * 0.8
        
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1)
        const scale = 0.85 + (1.05 - 0.85) * (1 - normalizedDistance)
        setSection2Scale(Math.max(0.85, Math.min(1.05, scale)))
        
        const visibleRatio = Math.max(0, Math.min(1, (windowHeight - Math.max(0, rect.top)) / (windowHeight * 0.6)))
        setSection2Opacity(visibleRatio)
      }

      // Text section 3 - same effect
      if (section3Ref.current) {
        const rect = section3Ref.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const windowCenter = windowHeight / 2
        const elementCenter = rect.top + rect.height / 2
        const distanceFromCenter = Math.abs(elementCenter - windowCenter)
        const maxDistance = windowHeight * 0.8
        
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1)
        const scale = 0.85 + (1.05 - 0.85) * (1 - normalizedDistance)
        setSection3Scale(Math.max(0.85, Math.min(1.05, scale)))
        
        const visibleRatio = Math.max(0, Math.min(1, (windowHeight - Math.max(0, rect.top)) / (windowHeight * 0.6)))
        setSection3Opacity(visibleRatio)
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

    updateScrollEffects()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateScrollEffects, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateScrollEffects)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all"
      >
        ← Back to Home
      </button>

      {/* Hero Section - Luma Labs Style with Multi-line Text */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-6 py-20 md:py-32 sticky top-0"
        style={{
          transform: `scale(${heroScale})`,
          opacity: heroOpacity,
          willChange: 'transform, opacity'
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Multi-line headline like "New freedoms of imagination" */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 md:mb-8 tracking-tight leading-[0.85]">
            <span className="block">New freedoms</span>
            <span className="block text-gray-500">of imagination</span>
          </h1>
          
          {/* Subtitle */}
          <div className="text-2xl md:text-3xl lg:text-4xl text-gray-400 mb-8 md:mb-12 font-light">
            Make it real with <span className="text-white font-bold">Dream Machine</span>
          </div>
          
          {/* Description */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            A new fluid medium to create stunning images and videos that feel out of this world. All you need to do is ask.
          </p>
        </div>
      </section>

      {/* Text-Heavy Feature Section 1 - Centered */}
      <section 
        ref={section1Ref}
        className="min-h-screen flex items-center justify-center px-6 py-20 md:py-32 relative z-10"
        style={{
          transform: `scale(${section1Scale})`,
          opacity: section1Opacity,
          willChange: 'transform, opacity'
        }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
            Create beautiful images<br />
            <span className="text-gray-500">and videos, fast</span>
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
            Ideate and iterate as fast as you think. Explore endless ideas, make something unique and spectacular.
          </p>
        </div>
      </section>

      {/* Text-Heavy Feature Section 2 - Split Layout */}
      <section 
        ref={section2Ref}
        className="min-h-screen flex items-center justify-center px-6 py-20 md:py-32 relative z-10"
        style={{
          transform: `scale(${section2Scale})`,
          opacity: section2Opacity,
          willChange: 'transform, opacity'
        }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
              No prompt<br />
              <span className="text-gray-500">engineering needed,</span><br />
              just ask
            </h2>
          </div>
          <div>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 font-light leading-relaxed">
              Be as simple or as specific. Talk in your own way to generate, edit, and move through your explorations fluently.
            </p>
          </div>
        </div>
      </section>

      {/* Text-Heavy Feature Section 3 - Different Layout */}
      <section 
        ref={section3Ref}
        className="min-h-screen flex items-center justify-center px-6 py-20 md:py-32 relative z-10"
        style={{
          transform: `scale(${section3Scale})`,
          opacity: section3Opacity,
          willChange: 'transform, opacity'
        }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
            Reference<br />
            <span className="text-gray-500">and Remix anything</span>
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
            Explore creative alternatives. Bring in your own image, style and character references. Make it exactly how you see it.
          </p>
        </div>
      </section>

      {/* Large Feature Card Section - Similar to Your Current Cards */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 md:py-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-gray-800/50 hover:border-gray-700/50 transition-all duration-500">
            <div className="p-8 md:p-16 lg:p-20">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                Do it all with Dream Machine
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 leading-relaxed max-w-4xl">
                Make videos, create unique characters, reference visuals, modify content, brainstorm ideas, and share your creations.
              </p>
              <div className="h-64 md:h-96 lg:h-[500px] rounded-2xl bg-gray-900 border border-gray-700/50 flex items-center justify-center">
                <p className="text-gray-500 text-lg">Video/Image placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Spacer */}
      <div className="h-screen"></div>
    </div>
  )
}

export default LumaStyleTest

