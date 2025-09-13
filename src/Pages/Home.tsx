import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import Footer from '../components/Footer'
import { SiHtml5, SiNextdotjs, SiAstro, SiVuedotjs, SiSvelte } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

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

  // Starfield animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const totalObjects = 100
    const maxVelocity = 2
    const starSize = 1
    const twinkleFreq = 50000
    const shootingStarFreq = 500
    const shootingStarVelocity = 100
    const shootingStarSize = 1

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const stars: any[] = []
    const shootingStars: any[] = []

    class Star {
      X: number
      Y: number
      Velocity: number
      Opacity: number

      constructor() {
        this.X = canvas ? Math.random() * canvas.width : Math.random() * 1024
        this.Y = canvas ? Math.random() * canvas.height : Math.random() * 768
        this.Velocity = Math.random() * maxVelocity
        this.Opacity = ((Math.random() * 10) + 1) * 0.1
      }

      Update() {
        if (!canvas) return
        this.X -= this.Velocity
        if (this.X < 0) {
          this.X = canvas.width + 1
        }
      }

      Draw() {
        if (!ctx) return
        ctx.fillStyle = `rgba(255,255,255,${this.Opacity})`
        if (Math.round(Math.random() * twinkleFreq) === 1) {
          ctx.fillRect(this.X, this.Y, starSize + 2, starSize + 2)
        } else {
          ctx.fillRect(this.X, this.Y, starSize, starSize)
        }
      }
    }

    class ShootingStar {
      X: number
      Y: number
      Length: number

      constructor() {
        this.X = 2000
        this.Y = canvas ? Math.random() * canvas.height : 0
        this.Length = 1000
      }

      Update() {
        this.X -= shootingStarVelocity
      }

      Draw() {
        if (!ctx) return
        for (let i = 0; i < this.Length; i++) {
          const opacity = 0.8 - (0.001 * i)
          ctx.fillStyle = `rgba(255,255,255,${opacity})`
          ctx.fillRect(this.X + i, this.Y, shootingStarSize, shootingStarSize)
        }
      }
    }

    function init() {
      for (let i = 0; i < totalObjects; i++) {
        stars.push(new Star())
      }
    }

    function draw() {
      requestAnimationFrame(draw)
      if (!ctx || !canvas) return
      
      ctx.fillStyle = 'rgba(0, 0, 0, .4)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      for (let f = 0; f < stars.length; f++) {
        stars[f].Update()
        stars[f].Draw()
      }
      
      for (let f = 0; f < shootingStars.length; f++) {
        shootingStars[f].Update()
        shootingStars[f].Draw()
      }
    }

    function update() {
      if (Math.round(Math.random() * shootingStarFreq) === 1) {
        shootingStars.push(new ShootingStar())
      }
      
      for (let f = shootingStars.length - 1; f >= 0; f--) {
        if (shootingStars[f].X < -1000) {
          shootingStars.splice(f, 1)
        }
      }
    }

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    init()
    const updateInterval = setInterval(update, 30)
    draw()

    return () => {
      clearInterval(updateInterval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div ref={heroRef}>
      {/* Hero */}
      <section className="container-af pt-16 md:pt-24 flex flex-col justify-center h-[calc(90vh-4rem)] relative overflow-hidden">
        {/* Starfield Canvas Background */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}
        />
        
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
          Airflow UI is a modern component toolkit you can copy in HTML, Next.js, Vue.js, Astro and Svelte. Crafted with simplicity and performance in mind.
        </p>
        <div className="mt-8" data-reveal>
          <a href="/components" className="inline-flex items-center rounded-md bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-500">
            Browse Components
          </a>
        </div>
      </section>

        {/* Preview grid */}
      <section className="container-af pt-16 md:pt-24 flex flex-col justify-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Supported Languages & Frameworks</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">AirflowUI lets you copy and use components in HTML, Next.js, Astro, Vue.js, and Svelte. Choose your stack and get started instantly.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4" data-parallax>
            {/* Supported Languages/Frameworks */}
            {[
              { name: 'HTML', icon: <SiHtml5 className="text-orange-500 w-8 h-8 mx-auto" /> },
              { name: 'Next.js', icon: <SiNextdotjs className="text-white w-8 h-8 mx-auto" /> },
              { name: 'Astro', icon: <SiAstro className="text-purple-500 w-8 h-8 mx-auto" /> },
              { name: 'Vue.js', icon: <SiVuedotjs className="text-green-500 w-8 h-8 mx-auto" /> },
              { name: 'Svelte', icon: <SiSvelte className="text-orange-400 w-8 h-8 mx-auto" /> },
            ].map((lang) => (
                <div
                key={lang.name}
                className="bg-zinc-900/60 border border-zinc-800 rounded-2xl aspect-video flex flex-col items-center justify-center rounded-xl border border-zinc-800 transition-colors duration-200 hover:bg-zinc-800 hover:cursor-pointer"
                >
                {lang.icon}
                <span className="mt-2 text-base font-medium text-white">{lang.name}</span>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="container-af py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Why Choose AirflowUI?</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Built for modern developers who value speed, consistency, and ease of use. 
            Get professional components that work perfectly out of the box.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card p-6" data-reveal>
            <div className="mb-3 text-blue-400">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Fast</h3>
            <p className="text-zinc-400">AirflowUI components are optimized for performance and load instantly. No unnecessary bloat—just snappy, responsive UI for every project.</p>
          </div>
          <div className="bg-card p-6" data-reveal>
            <div className="mb-3 text-blue-400">🔗</div>
            <h3 className="text-lg font-semibold mb-2">Consistent</h3>
            <p className="text-zinc-400">Built on a unified design system, every component looks and feels cohesive. Consistent spacing, colors, and typography for a professional finish.</p>
          </div>
          <div className="bg-card p-6" data-reveal>
            <div className="mb-3 text-blue-400">📋</div>
            <h3 className="text-lg font-semibold mb-2">Copy & Ship</h3>
            <p className="text-zinc-400">Just copy, paste, and deploy. AirflowUI is designed to be instantly usable in HTML, React, Vue, Svelte, and Astro—no setup required.</p>
          </div>
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Everything you need to know about AirflowUI and how to get started with our component library.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {[
            {
              id: 'what-is-airflowui',
              question: 'What is AirflowUI?',
              answer: 'AirflowUI is a modern, open-source component library that provides beautiful, accessible UI components for HTML, Next.js, Vue.js, Astro, and Svelte. All components are designed to be copy-paste ready with no complex setup required.'
            },
            {
              id: 'how-to-use',
              question: 'How do I use AirflowUI components?',
              answer: 'Simply browse our component library, select the framework you\'re using, copy the component code, and paste it directly into your project. No installation or configuration needed - just copy, paste, and customize as needed.'
            },
            {
              id: 'free-to-use',
              question: 'Is AirflowUI free to use?',
              answer: 'Yes! AirflowUI is completely free and open-source. You can use it in personal projects, commercial applications, and modify the components as needed. No licensing fees or restrictions.'
            },
            {
              id: 'frameworks-supported',
              question: 'Which frameworks are supported?',
              answer: 'AirflowUI supports HTML/CSS, Next.js, Vue.js, Astro, and Svelte. Each component comes with framework-specific implementations, so you can use the same design across different tech stacks.'
            },
            {
              id: 'customization',
              question: 'Can I customize the components?',
              answer: 'Absolutely! All components are built with Tailwind CSS and are designed to be easily customizable. You can modify colors, spacing, animations, and styling to match your brand and design requirements.'
            }
          ].map((faq) => (
            <div key={faq.id} className="border-b border-zinc-800 last:border-b-0">
              <button
                className="w-full py-6 text-left flex justify-between items-center hover:text-blue-400 transition-colors focus:outline-none"
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={openFAQ === faq.id}
              >
                <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                <span className="text-zinc-400 transition-transform duration-200">
                  {openFAQ === faq.id ? (
                    <MdOutlineKeyboardArrowUp size={24} />
                  ) : (
                    <MdOutlineKeyboardArrowDown size={24} />
                  )}
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFAQ === faq.id ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-zinc-400 leading-relaxed pr-8">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}


