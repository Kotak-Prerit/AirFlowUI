import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('[data-reveal]', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 75%'
        },
      })
      gsap.to('[data-parallax]', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          scrub: true,
        },
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef}>
      {/* Hero */}
      <section className="container-af pt-16 md:pt-24">
        <div className="mb-6 flex items-center gap-2" data-reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"/> 100% Free
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300">
            Open Source
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight" data-reveal>
          Your fastest path from idea to interface.
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-300" data-reveal>
          Airflow UI is a modern component toolkit you can copy in HTML/CSS, React, Vue, and Svelte. Crafted with simplicity and performance in mind.
        </p>
        <div className="mt-8" data-reveal>
          <a href="/components" className="inline-flex items-center rounded-md bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-500">
            Browse Components
          </a>
        </div>
        {/* Preview grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4" data-parallax>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-card aspect-video"/>
          ))}
        </div>
      </section>

      {/* Feature highlights */}
      <section className="container-af py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {['Fast', 'Consistent', 'Copy & Ship'].map((title, idx) => (
            <div key={idx} className="bg-card p-6" data-reveal>
              <div className="mb-3 text-blue-400">★</div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-zinc-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitasse elementum senectus facilisis.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Components grid teaser */}
      <section className="container-af pb-16 md:pb-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold" data-reveal>Meet the Toolkit</h2>
          <a href="/components" className="text-sm text-blue-400" data-reveal>See more →</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-card aspect-square" data-reveal/>
          ))}
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="container-af pb-24">
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-card p-6" data-reveal>
              <h3 className="font-semibold mb-2">Question #{i + 1}</h3>
              <p className="text-zinc-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis mattis viverra convallis.</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}


