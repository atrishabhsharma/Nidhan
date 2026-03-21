import { useState, useEffect, useRef, useCallback, useMemo, forwardRef } from 'react'

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polygon points="8,5 19,12 8,19" />
  </svg>
)

// Custom golden SVG icon set
const L = { strokeWidth:'1.5', strokeLinecap:'round', strokeLinejoin:'round', fill:'none', stroke:'currentColor' }
const LocationIcon  = () => <svg className="icon-svg" viewBox="0 0 24 24" {...L}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
const PhoneIcon     = () => <svg className="icon-svg" viewBox="0 0 24 24" {...L}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
const EmailIcon     = () => <svg className="icon-svg" viewBox="0 0 24 24" {...L}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const ChatIcon      = () => <svg className="icon-svg" viewBox="0 0 24 24" {...L}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
const CalendarIcon  = () => <svg className="icon-svg" viewBox="0 0 24 24" {...L}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
const DocumentIcon  = () => <svg className="icon-svg" viewBox="0 0 24 24" {...L}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
const HomeIcon      = () => <svg className="icon-svg" viewBox="0 0 24 24" {...L}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
const PlanetIcon    = () => <svg className="icon-svg" viewBox="0 0 24 24" {...L}><circle cx="12" cy="12" r="4"/><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-30 12 12)"/></svg>
const HeartIcon     = () => <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
const ShareIcon     = () => <svg className="icon-svg" viewBox="0 0 24 24" {...L}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
const BirthChartIcon= () => <svg className="icon-svg" viewBox="0 0 24 24" {...L}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="22"/><line x1="2" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="22" y2="12"/></svg>
const TempleIcon    = () => <svg className="icon-svg" viewBox="0 0 24 24" {...L}><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12,2 20,7 4,7"/></svg>
const ClockIcon     = () => <svg className="icon-svg" viewBox="0 0 24 24" {...L}><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
const RingsIcon     = () => <svg className="icon-svg" viewBox="0 0 24 24" {...L}><circle cx="9" cy="12" r="5"/><circle cx="15" cy="12" r="5"/></svg>
const WrenchIcon    = () => <svg className="icon-svg" viewBox="0 0 24 24" {...L}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
const NumbersIcon   = () => <svg className="icon-svg" viewBox="0 0 24 24" {...L}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>
const SparkIcon     = () => <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l1.68 8.32L22 12l-8.32 1.68L12 22l-1.68-8.32L2 12l8.32-1.68z"/></svg>

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// Star background canvas
function useStarCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let stars = []
    let shootingStars = []
    let animId

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function initStars() {
      stars = []
      for (let i = 0; i < 220; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.4 + 0.4,
          baseAlpha: Math.random() * 0.45 + 0.35,
          speed: Math.random() * 0.005 + 0.002,
          phase: Math.random() * Math.PI * 2,
          gold: Math.random() > 0.3
        })
      }
      for (let i = 0; i < 30; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2.2 + 1.2,
          baseAlpha: Math.random() * 0.45 + 0.40,
          speed: Math.random() * 0.004 + 0.001,
          phase: Math.random() * Math.PI * 2,
          gold: true,
          crosshair: true
        })
      }
    }

    function spawnShootingStar() {
      shootingStars.push({
        x: Math.random() * canvas.width * 0.7,
        y: Math.random() * canvas.height * 0.4,
        len: Math.random() * 90 + 60,
        speed: Math.random() * 3 + 2.5,
        alpha: 0,
        angle: Math.PI / 5 + (Math.random() - 0.5) * 0.3,
        life: 0,
        maxLife: Math.random() * 55 + 45
      })
    }

    function draw(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        const alpha = s.baseAlpha * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase))
        if (s.crosshair) {
          ctx.save()
          ctx.globalAlpha = alpha * 0.9
          ctx.strokeStyle = '#d4a843'
          ctx.lineWidth = 0.7
          ctx.beginPath()
          ctx.moveTo(s.x - s.r * 3, s.y)
          ctx.lineTo(s.x + s.r * 3, s.y)
          ctx.moveTo(s.x, s.y - s.r * 3)
          ctx.lineTo(s.x, s.y + s.r * 3)
          ctx.stroke()
          ctx.restore()
        }
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.gold
          ? `rgba(212,168,67,${alpha})`
          : `rgba(245,240,232,${alpha * 0.85})`
        ctx.fill()
      })

      if (Math.random() < 0.018 && shootingStars.length < 5) spawnShootingStar()
      shootingStars = shootingStars.filter(s => s.life < s.maxLife)
      shootingStars.forEach(s => {
        s.life++
        if (s.life < 12) s.alpha = s.life / 12
        else if (s.life > s.maxLife - 18) s.alpha = (s.maxLife - s.life) / 18
        else s.alpha = 1

        const tx = Math.cos(s.angle) * s.len
        const ty = Math.sin(s.angle) * s.len
        // Tail trails behind the head (opposite direction of motion)
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - tx, s.y - ty)
        grad.addColorStop(0, `rgba(240,200,74,${s.alpha * 0.55})`)
        grad.addColorStop(0.4, `rgba(240,200,74,${s.alpha * 0.2})`)
        grad.addColorStop(1, 'rgba(240,200,74,0)')

        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - tx, s.y - ty)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.2
        ctx.stroke()

        // Bright dot at the head (leading point)
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,240,180,${s.alpha * 0.7})`
        ctx.fill()

        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    initStars()
    animId = requestAnimationFrame(draw)

    const onResize = () => { resize(); initStars() }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return canvasRef
}

// Hero sparkles canvas
function useSparklesCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let sparkles = []
    let animId

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function init() {
      sparkles = []
      for (let i = 0; i < 38; i++) {
        sparkles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 2,
          alpha: Math.random() * 0.4 + 0.05,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.006 + 0.002,
          drift: (Math.random() - 0.5) * 0.12
        })
      }
    }

    function drawSparkle(x, y, size, alpha) {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.strokeStyle = '#f0c84a'
      ctx.lineWidth = 0.8
      ctx.beginPath()
      ctx.moveTo(x, y - size)
      ctx.lineTo(x, y + size)
      ctx.moveTo(x - size, y)
      ctx.lineTo(x + size, y)
      const d = size * 0.45
      ctx.moveTo(x - d, y - d)
      ctx.lineTo(x + d, y + d)
      ctx.moveTo(x + d, y - d)
      ctx.lineTo(x - d, y + d)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x, y, size * 0.18, 0, Math.PI * 2)
      ctx.fillStyle = '#f0c84a'
      ctx.fill()
      ctx.restore()
    }

    function animate(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      sparkles.forEach(s => {
        const pulse = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase)
        const a = s.alpha * pulse
        if (a > 0.02) drawSparkle(s.x, s.y, s.size * (0.7 + 0.3 * pulse), a)
        s.x += s.drift
        if (s.x < -10) s.x = canvas.width + 10
        if (s.x > canvas.width + 10) s.x = -10
      })
      animId = requestAnimationFrame(animate)
    }

    resize()
    init()
    animId = requestAnimationFrame(animate)

    const onResize = () => { resize(); init() }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return canvasRef
}

// Scroll reveal hook
function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

function Reveal({ children, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

// Staggered reveal for grids (P1)
function StaggeredReveal({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`stagger-parent ${className}`}>{children}</div>
}

// Count-up hook (P2)
function useCountUp(target, duration = 1800, delay = 0) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let animId
    const start = performance.now() + delay

    function tick(now) {
      const elapsed = now - start
      if (elapsed < 0) { animId = requestAnimationFrame(tick); return }
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - (1 - t) * (1 - t) // easeOutQuad
      setCount(Math.round(eased * target))
      if (t < 1) animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [started, target, duration, delay])

  return { ref, count }
}

// Nav
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={scrolled ? 'nav-scrolled' : ''}>
      <span className="nav-logo" onClick={() => scrollToSection('hero')}>
        <img src="/Logo.png" alt="NidanGuru" className="nav-logo-img" />
      </span>
      <ul>
        <li><button className="nav-link" onClick={() => scrollToSection('about')}>About</button></li>
        <li><button className="nav-link" onClick={() => scrollToSection('videos')}>Videos</button></li>
        <li><button className="nav-link" onClick={() => scrollToSection('vastu')}>Vastu</button></li>
        <li><button className="nav-link" onClick={() => scrollToSection('classes')}>Classes</button></li>
        <li><button className="nav-link" onClick={() => scrollToSection('testimonials')}>Testimonials</button></li>
        <li><button className="nav-link" onClick={() => scrollToSection('services')}>Services</button></li>
        <li><button className="nav-cta nav-link" onClick={() => scrollToSection('booking')}>Book Now</button></li>
      </ul>
    </nav>
  )
}

// Mandala SVG
const MandalaSVG = forwardRef(function MandalaSVG(props, ref) {
  return (
    <svg className="mandala" ref={ref} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="200" r="190" stroke="#c9a84c" strokeWidth="0.5"/>
      <circle cx="200" cy="200" r="160" stroke="#c9a84c" strokeWidth="0.5"/>
      <circle cx="200" cy="200" r="120" stroke="#c9a84c" strokeWidth="0.5"/>
      <circle cx="200" cy="200" r="80" stroke="#c9a84c" strokeWidth="0.5"/>
      <circle cx="200" cy="200" r="40" stroke="#c9a84c" strokeWidth="0.5"/>
      <line x1="200" y1="10" x2="200" y2="390" stroke="#c9a84c" strokeWidth="0.5"/>
      <line x1="10" y1="200" x2="390" y2="200" stroke="#c9a84c" strokeWidth="0.5"/>
      <line x1="65" y1="65" x2="335" y2="335" stroke="#c9a84c" strokeWidth="0.5"/>
      <line x1="335" y1="65" x2="65" y2="335" stroke="#c9a84c" strokeWidth="0.5"/>
      <polygon points="200,60 230,130 300,140 250,195 265,270 200,235 135,270 150,195 100,140 170,130" stroke="#c9a84c" strokeWidth="0.5" fill="none"/>
      <polygon points="200,100 222,163 290,163 235,202 255,268 200,228 145,268 165,202 110,163 178,163" stroke="#c9a84c" strokeWidth="0.3" fill="none"/>
    </svg>
  )
})

// Hero
function Hero() {
  const sparklesRef = useSparklesCanvas()
  const [scrollHintVisible, setScrollHintVisible] = useState(true)
  const mandalaRef = useRef(null)
  const glowRef = useRef(null)
  const portraitRef = useRef(null)
  const heroRef = useRef(null)

  useEffect(() => {
    const hide = () => setScrollHintVisible(false)
    window.addEventListener('scroll', hide, { passive: true, once: true })
    window.addEventListener('wheel', hide, { passive: true, once: true })
    return () => {
      window.removeEventListener('scroll', hide)
      window.removeEventListener('wheel', hide)
    }
  }, [])

  // Parallax-lite (P9) — disabled on mobile
  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return
    const onScroll = () => {
      const hero = heroRef.current
      if (!hero) return
      const limit = hero.offsetHeight
      const y = Math.min(window.scrollY, limit)
      if (mandalaRef.current) mandalaRef.current.style.transform = `translate(-50%, calc(-50% + ${y * -0.15}px))`
      if (glowRef.current) glowRef.current.style.transform = `translate(-50%, calc(-52% + ${y * -0.15}px))`
      if (portraitRef.current) portraitRef.current.style.transform = `translateY(${y * -0.08}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" ref={heroRef}>
      <canvas id="hero-sparkles" ref={sparklesRef} />
      <div className="hero-glow" ref={glowRef} />
      <MandalaSVG ref={mandalaRef} />
      <div className="hero-content">
        <div className="hero-portrait" ref={portraitRef}>
          <img src="/guru.jpg" alt="Acharya Nidhan Singh" />
        </div>
        <p className="hero-eyebrow">Tantra , Astrology & Vastu</p>
        <h1 className="hero-title">
          Ancient Wisdom, <em>Modern Living,</em>
        </h1>
<div className="hero-btns">
          <button className="btn-primary" onClick={() => scrollToSection('booking')}>Seek Your Nidan</button>
          <button className="btn-ghost" onClick={() => scrollToSection('services')}>Explore Services</button>
        </div>
      </div>
      <div className="scroll-hint" style={{ opacity: scrollHintVisible ? 0.5 : 0, pointerEvents: scrollHintVisible ? 'auto' : 'none' }}>
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}

// Social platform SVG logos
const InstagramLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="social-svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const FacebookLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="social-svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const YouTubeLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="social-svg">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const XLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="social-svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const LinkedInLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="social-svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const socialsData = [
  { platform: 'Instagram', count: '34K+', label: 'Followers', url: 'https://www.instagram.com/nidanguru?igsh=MXJhcm5ham80NTVxaA%3D%3D&wa_status_inline=true', Logo: InstagramLogo },
  { platform: 'Facebook', count: '10K+', label: 'Followers', url: 'https://www.facebook.com/@acharyadrvivekpanchtatw/?wa_status_inline=true&ref=2&hr=1&wtsid=rdr_063XAv0kE0Dvtxj4n', Logo: FacebookLogo },
  { platform: 'YouTube', count: '28K+', label: 'Subscribers', url: 'https://m.youtube.com/@nidanguru', Logo: YouTubeLogo },
  { platform: 'LinkedIn', count: '1.5K+', label: 'Followers', url: 'https://www.linkedin.com/in/acharya-dr-vivek-panchtatw-4123356?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', Logo: LinkedInLogo },
]

function StatsStrip() {
  return (
    <section className="stats-section">
      <div className="section-wrap">
        <p className="social-strip-heading">A community of seekers and believers</p>
        <div className="hero-stats-grid">
          {socialsData.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="stat-cell social-cell"
            >
              <s.Logo />
              <div className="stat-num">{s.count}</div>
              <div className="stat-label">{s.label} on {s.platform}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// About
function About() {
  return (
    <section id="about">
      <div className="section-wrap">
        <div className="about-grid">
          <Reveal>
            <div className="about-img-wrap">
              <div className="about-portrait">
                <img src="/guru-about.jpg" alt="Acharya Nidhan Singh" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
              </div>
              <div className="about-badge">
                <strong>20+</strong>
                <span>Years</span>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="about-content">
              <p className="section-label">✦ Who is Nidanguru?</p>
              <h2 className="section-title">NidanGuru ~ Acharya Dr <em>Vivek Panchtatw</em></h2>
              <div className="gold-divider left" />
              <p className="section-desc" style={{ marginBottom: '1.5rem' }}>
                A lineage-trained Vedic astrologer and Vastu consultant with over 20 years of dedicated practice. Acharyaji combines classical Parashari and Jaimini systems with deep intuitive insight, offering guidance that is both scripturally grounded and practically transformative.
              </p>
              <p className="section-desc">
                Having studied under revered Gurus across Varanasi and Haridwar, he brings rare depth to every consultation — whether it is a birth chart reading, a complex Muhurta, or a comprehensive Vastu audit for your home or business.
              </p>
              <div className="credentials">
                <div className="cred-item">
                  <strong>PhD in Astro-Vastu</strong>
                  <span>Institute of Psychology</span>
                </div>
                <div className="cred-item">
                  <strong>2,500+</strong>
                  <span>Vastu Visits</span>
                </div>
                <div className="cred-item">
                  <strong>1 Lakh+</strong>
                  <span>Consultations</span>
                </div>
                <div className="cred-item">
                  <strong>Multi-Dimension Vastu</strong>
                  <span>Prashna Shastra, Medical Astrology, Jaimini etc.</span>
                </div>
              </div>
              <button className="btn-primary" style={{ marginTop: '2.5rem' }} onClick={() => scrollToSection('booking')}>
                Book with Acharyaji
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// Videos
const videosData = [
  {
    id: 'video1',
    thumb: 'https://img.youtube.com/vi/Owul1HlA-ss/maxresdefault.jpg',
    url: 'https://youtu.be/Owul1HlA-ss',
    tag: 'Vastu Shastra',
    title: 'Vastu Dose ~ Best Entry of the Property',
    desc: 'Discover the most auspicious entry directions for your property and how the right entrance can transform the flow of energy in your home or office.',
  },
  {
    id: 'video2',
    thumb: 'https://img.youtube.com/vi/PSmclVas4wE/maxresdefault.jpg',
    url: 'https://youtu.be/PSmclVas4wE',
    tag: 'Vedic Astrology',
    title: 'Learn Astrology in Expert Guidance: Unlock the Secrets of the Stars',
    desc: 'Acharya Dr Vivek Panchtatw takes you on a journey through Vedic Astrology — decoding planetary wisdom and empowering you to read the language of the cosmos.',
  },
  {
    id: 'video3',
    thumb: 'https://img.youtube.com/vi/1SuijLdJ6Co/maxresdefault.jpg',
    url: 'https://youtu.be/1SuijLdJ6Co',
    tag: 'Tantra',
    title: 'Navratri Tantra Sadhana and the 8th House',
    desc: 'An in-depth exploration of Navratri Tantra Sadhana and the mystical significance of the 8th house in Vedic Astrology — for sincere seekers on the spiritual path.',
  }
]

function Videos() {
  return (
    <section id="videos">
      <div className="section-wrap">
        <Reveal className="videos-header">
          <p className="section-label">✦ Watch & Learn</p>
          <h2 className="section-title">From Our <em>YouTube</em> Channel</h2>
          <div className="gold-divider" />
        </Reveal>
        <StaggeredReveal className="videos-grid">
          {videosData.map(v => (
            <a className="video-card" key={v.id} href={v.url} target="_blank" rel="noopener noreferrer">
              <div className="video-thumb">
                <img
                  src={v.thumb}
                  alt={v.title}
                  onError={(e) => { e.target.src = `https://placehold.co/640x360/111827/c9a84c?text=${encodeURIComponent(v.tag)}` }}
                />
                <div className="video-play">
                  <div className="play-btn"><PlayIcon /></div>
                </div>
              </div>
              <div className="video-body">
                <p className="video-tag">{v.tag}</p>
                <h3 className="video-title">{v.title}</h3>
                <p className="video-desc">{v.desc}</p>
              </div>
            </a>
          ))}
        </StaggeredReveal>
        <Reveal>
          <div className="videos-cta">
            <a href="https://m.youtube.com/@nidanguru" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <YouTubeLogo /> View All Videos
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// Vastu Section
const vastuOfferings = [
  { Icon: DocumentIcon, title: 'Vastu Reports',              desc: 'Detailed written reports mapping spatial energies of your property with precise directional remedies and action points.' },
  { Icon: HomeIcon,     title: 'In-Person Offline Visit',    desc: 'On-site evaluation by Acharyaji himself — a thorough walk-through of your home or business premises.' },
  { Icon: PlanetIcon,   title: 'Astro-Vastu Included',       desc: 'Every consultation integrates your personal birth chart with Vastu analysis for a truly personalised spatial remedy.' },
  { Icon: ChatIcon,     title: '45-Day Open Discussion Window', desc: 'Post-consultation support for 45 days — ask follow-up questions, clarify remedies, and track your progress directly with Acharyaji.' },
]

function Vastu() {
  return (
    <section id="vastu" className="vastu-section">
      <div className="section-wrap">
        <div className="vastu-grid">

          {/* Left — Offerings */}
          <Reveal className="vastu-left">
            <p className="section-label">✦ Vastu Shastra</p>
            <h2 className="section-title">Sacred Space,<br /><em>Harmonised Life</em></h2>
            <div className="gold-divider left" style={{ marginBottom: '2rem' }} />
            <div className="vastu-offerings">
              {vastuOfferings.map((item, i) => (
                <div className="vastu-item" key={i}>
                  <div className="vastu-item-icon"><item.Icon /></div>
                  <div>
                    <h4 className="vastu-item-title">{item.title}</h4>
                    <p className="vastu-item-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary" style={{ marginTop: '2.8rem' }} onClick={() => scrollToSection('booking')}>
              Book a Vastu Consultation
            </button>
          </Reveal>

          {/* Right — Reel-style video placeholder */}
          <Reveal className="vastu-right">
            <div className="vastu-reel-wrap">
              <div className="vastu-reel-label">
                <InstagramLogo />
                <span>Reels</span>
              </div>
              <div className="vastu-reel-phone">
                <div className="vastu-reel-screen">
                  {/* Drop your Instagram reel video src here */}
                  <div className="vastu-reel-placeholder">
                    <div className="vastu-reel-play">
                      <PlayIcon />
                    </div>
                    <p className="vastu-reel-hint">Add your Instagram Reel here</p>
                  </div>
                  <div className="vastu-reel-overlay">
                    <div className="vastu-reel-user">
                      <div className="vastu-reel-avatar">NG</div>
                      <span>@nidanguru</span>
                    </div>
                    <div className="vastu-reel-actions">
                      <button className="reel-action-btn"><HeartIcon /><span>12K</span></button>
                      <button className="reel-action-btn"><ChatIcon /><span>340</span></button>
                      <button className="reel-action-btn"><ShareIcon /><span>Share</span></button>
                    </div>
                  </div>
                </div>
                <div className="vastu-reel-notch" />
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}

// Testimonials
const testimonialsData = [
  {
    text: "Dr Vivek, author of the insightful \"Life In Glimpse\", is such a warm and calming person. Always inspiring, and a wonderful treasure to spend time with. Thank you!",
    name: 'Geoffrey Pierson',
    role: 'Director, London',
    fallback: 'GP'
  },
  {
    text: "I had lost my gold bangle in Kuala Lumpur, where we live, and searched everywhere but couldn't find it. I then sought help from Acharya Ji, who was in India at the time. He guided me and asked me to check certain places — and miraculously, I found my gold bangle in the exact spot he had mentioned.",
    name: 'Neha Srivastava',
    role: 'Restaurant Owner, Malaysia',
    fallback: 'NS'
  },
  {
    text: "I had a truly transformative experience with Acharya Dr Vivek Panchtatw's Astro Vastu consultation. His deep knowledge, precise guidance, and practical remedies brought clarity and positive changes in my life. Highly recommended for anyone seeking authentic and effective solutions — and especially for my property in Tokyo, Japan, where I have witnessed his pure and authentic divine powers.",
    name: 'Sanjay Kaushik',
    role: 'Software Engineer, Japan',
    fallback: 'SK'
  }
]

// Classes Section
const classesData = [
  {
    subject: 'Tantra',
    Icon: SparkIcon,
    desc: 'A sacred Guru–Shishya Parampara. Acharyaji has acquired the rare knowledge of 10 Mahavidya Tantra — passed only one-on-one, as it has been for centuries. The identity of every student remains 100% private.',
    duration: 'Ongoing · 1-on-1',
    mode: 'Strictly Private',
    isTantra: true,
  },
  {
    subject: 'Vastu Shastra',
    Icon: TempleIcon,
    desc: 'Master the ancient science of spatial harmony — directions, elements, and energy flow for homes and businesses.',
    duration: '3 Months',
    mode: 'Offline · New Delhi',
    seats: 15,
    filled: 12,
  },
  {
    subject: 'Astrology',
    Icon: BirthChartIcon,
    desc: 'A comprehensive journey through Parashari Jyotish — birth charts, dashas, transits, and predictive techniques.',
    duration: '6 Months',
    mode: 'Offline · New Delhi',
    seats: 15,
    filled: 15,
  },
  {
    subject: 'Numerology',
    Icon: NumbersIcon,
    desc: 'Decode the vibrational language of numbers — names, dates, and life path numbers for self-discovery and guidance.',
    duration: '1 Month',
    mode: 'Offline · New Delhi',
    seats: 20,
    filled: 9,
  },
]

function ClassCard({ data }) {
  if (data.isTantra) {
    return (
      <div className="class-card class-card--tantra">
        <div className="tantra-glow" />
        <div className="class-card-top">
          <span className="class-icon"><data.Icon /></span>
          <span className="class-status-badge status-tantra">✦ Guru–Shishya Parampara</span>
        </div>
        <h3 className="class-subject tantra-subject">{data.subject}</h3>
        <div className="tantra-badges">
          <span className="tantra-badge">10 Mahavidya</span>
          <span className="tantra-badge">1-on-1 Only</span>
          <span className="tantra-badge">100% Private</span>
        </div>
        <p className="class-desc">{data.desc}</p>
        <div className="class-meta">
          <span><CalendarIcon /> {data.duration}</span>
          <span><LocationIcon /> {data.mode}</span>
        </div>
        <button className="class-enrol-btn class-enrol-btn--tantra" onClick={() => scrollToSection('booking')}>
          ✦ Request Audience
        </button>
      </div>
    )
  }

  const pct = Math.round((data.filled / data.seats) * 100)
  const isFull = data.filled >= data.seats

  let statusLabel, statusClass
  if (isFull)       { statusLabel = 'Fully Booked'; statusClass = 'status-full' }
  else if (pct >= 70) { statusLabel = `Only ${data.seats - data.filled} seats left`; statusClass = 'status-low' }
  else              { statusLabel = `${data.seats - data.filled} seats available`; statusClass = 'status-open' }

  return (
    <div className={`class-card ${isFull ? 'class-card--full' : ''}`}>
      <div className="class-card-top">
        <span className="class-icon"><data.Icon /></span>
        <span className={`class-status-badge ${statusClass}`}>{statusLabel}</span>
      </div>
      <h3 className="class-subject">{data.subject}</h3>
      <p className="class-desc">{data.desc}</p>
      <div className="class-meta">
        <span><CalendarIcon /> {data.duration}</span>
        <span><LocationIcon /> {data.mode}</span>
      </div>
      <div className="class-seats-bar">
        <div className="seats-bar-track">
          <div className="seats-bar-fill" style={{ width: `${pct}%`, background: isFull ? '#c0392b' : pct >= 70 ? '#e67e22' : 'var(--gold)' }} />
        </div>
        <span className="seats-bar-label">{data.filled}/{data.seats} filled</span>
      </div>
      <button
        className={`class-enrol-btn ${isFull ? 'class-enrol-btn--disabled' : ''}`}
        onClick={() => !isFull && scrollToSection('booking')}
        disabled={isFull}
      >
        {isFull ? 'Join Waitlist' : '✦ Enrol Now'}
      </button>
    </div>
  )
}

function Classes() {
  return (
    <section id="classes" className="classes-section">
      <div className="section-wrap">
        <Reveal className="classes-header">
<h2 className="section-title">Offline <em>Classes</em></h2>
          <div className="gold-divider" />
          <p className="section-desc" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '780px' }}>
            Taught personally by{' '}
            <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--gold-light)' }}>Acharya Dr Vivek Panchtatw</em>,{' '}
            Central Delhi's only offline Astro-Vastu consultant.
          </p>
        </Reveal>
        <StaggeredReveal className="classes-grid">
          {classesData.map((c, i) => <ClassCard key={i} data={c} />)}
        </StaggeredReveal>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials">
      <div className="section-wrap">
        <Reveal>
          <p className="section-label">✦ Client Stories</p>
          <h2 className="section-title">Words of <em>Trust</em></h2>
          <div className="gold-divider" />
        </Reveal>
        <StaggeredReveal className="testi-grid">
          {testimonialsData.map((t, i) => (
            <div className="testi-card" key={i}>
              <div className="testi-reviewer">
                <img
                  src={t.img || `https://placehold.co/48x48/111827/c9a84c?text=${t.fallback}`}
                  alt={t.name}
                  className="testi-avatar"
                  onError={(e) => { e.target.src = `https://placehold.co/48x48/111827/c9a84c?text=${t.fallback}` }}
                />
                <div>
                  <p className="testi-author">{t.name}</p>
                  <p className="testi-role">{t.role}</p>
                </div>
              </div>
              <div className="testi-stars">★★★★★</div>
              <div className="quote-mark">&ldquo;</div>
              <p className="testi-text">{t.text}</p>
            </div>
          ))}
        </StaggeredReveal>
        <Reveal>
          <div className="testi-cta">
            <a
              href="https://www.google.com/search?newwindow=1&sca_esv=119eba1c4e06741f&rlz=1C5XQIR_enIN1176IN1176&sxsrf=ANbL-n5jJPbNb21nIL_RqvJGp6H_G34s9g:1773831979379&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOZyMECwgn3MQO-4FvRx2gYz_xEffAkcpsTyJxWXHrz7gNacQtTXF8y1saVAMI-CZj3mz22sRE7EiO5klaDnLSAIXgPxH2cjGFw4-O_3pTto9QaoqeGIvMG5-jICgK6AYAu8s6Hg%3D&q=The+NIDAN+%28Acharya+Dr+Vivek+Panchtatw%29+Reviews&sa=X&ved=2ahUKEwjLpZaIp6mTAxUn4TgGHQlkB98Q0bkNegQIIhAH&biw=1440&bih=778&dpr=2"
              target="_blank"
              rel="noopener noreferrer"
              className="testi-google-btn"
            >
              <svg viewBox="0 0 24 24" className="google-icon" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              View Our Google Reviews
              <span className="testi-btn-arrow">↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// Services
const servicesData = [
  { Icon: TempleIcon,     title: 'Vastu Audit',                 desc: 'On-site or remote evaluation of your home or office to harmonise spatial energies, attract abundance, and eliminate invisible obstacles.',           link: 'Schedule Audit →' },
  { Icon: BirthChartIcon, title: 'Astrology',                   desc: "A deep Vedic reading of your Janma Kundali — uncovering personality, karmic patterns, dasha cycles, and the grand design of your life's journey.",  link: 'Consult Now →' },
  { Icon: SparkIcon,      title: 'Tantra',                      desc: 'Sacred Tantric guidance rooted in authentic Guru–Shishya Parampara. Acharya Ji holds rare knowledge of 10 Mahavidyas — offered with full discretion.', link: 'Enquire Privately →' },
  { Icon: RingsIcon,      title: 'Relationship Compatibility',  desc: 'Kundali Milan and Guna matching to understand the cosmic bond between two souls — ideal for marriage decisions and life partnerships.',               link: 'Check Compatibility →' },
  { Icon: ClockIcon,      title: 'Muhurta — Auspicious Timing', desc: 'Select the most fortuitous moment for weddings, business launches, property registration, or any significant life event.',                           link: 'Find Your Time →' },
  { Icon: WrenchIcon,     title: 'Vastu Remedies',              desc: 'Practical, non-demolition solutions using yantras, mirrors, colours, and elemental placements to correct existing spatial imbalances.',               link: 'Get Remedies →' },
]

function Services() {
  return (
    <section id="services">
      <div className="section-wrap">
        <Reveal className="services-header">
          <p className="section-label">✦ What We Offer</p>
          <h2 className="section-title">Sacred <em>Services</em></h2>
          <div className="gold-divider" />
        </Reveal>
        <StaggeredReveal className="services-grid">
          {servicesData.map((s, i) => (
            <div className="service-card" key={i}>
              <span className="svc-icon"><s.Icon /></span>
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-desc">{s.desc}</p>
              <button className="svc-link" onClick={() => scrollToSection('booking')}>{s.link}</button>
            </div>
          ))}
        </StaggeredReveal>
      </div>
    </section>
  )
}

// Booking
function Booking() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="booking">
      <div className="section-wrap">
        <div className="booking-inner">
          <Reveal>
            <p className="section-label">✦ Consultations</p>
            <h2 className="section-title">Begin Your<br /><em>Cosmic</em> Journey</h2>
            <div className="gold-divider left" />
            <p className="section-desc" style={{ marginBottom: '2.5rem' }}>
              Fill in your details and we will confirm your appointment within 24 hours. All sessions are available online or in-person at our Delhi centre.
            </p>

            <div className="contact-item">
              <div className="ci-icon"><LocationIcon /></div>
              <div>
                <div className="ci-label">Location</div>
                <div className="ci-val">23, Vastu Marg, Hauz Khas, New Delhi — 110016</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="ci-icon"><PhoneIcon /></div>
              <div>
                <div className="ci-label">Phone</div>
                <div className="ci-val">+91 98100 00000</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="ci-icon"><EmailIcon /></div>
              <div>
                <div className="ci-label">Email</div>
                <div className="ci-val">consult@nidanguru.com</div>
              </div>
            </div>

            <button className="whatsapp-btn" onClick={() => {}}>
              <ChatIcon /> Chat on WhatsApp
            </button>
          </Reveal>

          <Reveal>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="you@example.com" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+91 00000 00000" />
                </div>
                <div className="form-group">
                  <label>Service Required</label>
                  <select>
                    <option value="">— Select a service —</option>
                    <option>Birth Chart Analysis</option>
                    <option>Vastu Audit (Home / Office)</option>
                    <option>Muhurta — Auspicious Timing</option>
                    <option>Relationship Compatibility</option>
                    <option>Annual Forecast Report</option>
                    <option>Both Astrology &amp; Vastu</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>Your Message</label>
                  <textarea placeholder="Share a brief context or question..." />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', cursor: 'pointer', fontFamily: 'var(--sans)' }}>
                  Request Consultation
                </button>
              </form>
            ) : (
              <div style={{
                textAlign: 'center', padding: '2rem',
                border: '1px solid var(--gold)', marginTop: '1rem'
              }}>
                <p style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', color: 'var(--gold-light)' }}>✦ Thank you</p>
                <p style={{ color: 'var(--muted)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  We will reach out within 24 hours to confirm your appointment.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  const links = [
    { label: 'Home', target: 'hero' },
    { label: 'About', target: 'about' },
    { label: 'Videos', target: 'videos' },
    { label: 'Vastu', target: 'vastu' },
    { label: 'Testimonials', target: 'testimonials' },
    { label: 'Services', target: 'services' },
    { label: 'Book Now', target: 'booking' },
  ]

  return (
    <footer>
      <div className="section-wrap">
        <div className="footer-logo">
          <img src="/Logo.png" alt="NidanGuru" className="footer-logo-img" />
        </div>
        <div className="footer-social">
          <a className="soc" href="https://www.instagram.com/nidanguru?igsh=MXJhcm5ham80NTVxaA%3D%3D&wa_status_inline=true" target="_blank" rel="noopener noreferrer" title="Instagram"><InstagramLogo /></a>
          <a className="soc" href="https://www.facebook.com/@acharyadrvivekpanchtatw/?wa_status_inline=true&ref=2&hr=1&wtsid=rdr_063XAv0kE0Dvtxj4n" target="_blank" rel="noopener noreferrer" title="Facebook"><FacebookLogo /></a>
          <a className="soc" href="https://m.youtube.com/@nidanguru" target="_blank" rel="noopener noreferrer" title="YouTube"><YouTubeLogo /></a>
          <a className="soc" href="https://www.linkedin.com/in/acharya-dr-vivek-panchtatw-4123356?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" title="LinkedIn"><LinkedInLogo /></a>
        </div>
        <div className="footer-links">
          {links.map(l => (
            <button key={l.target} onClick={() => scrollToSection(l.target)}>{l.label}</button>
          ))}
        </div>
        <p className="footer-copy">© 2026 NidanGuru. All rights reserved. Powered by Cosmic Insights ✦</p>
      </div>
    </footer>
  )
}

// WhatsApp Toggle
function WhatsAppToggle() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (toggleRef.current && !toggleRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div id="wa-toggle" ref={toggleRef}>
      <div id="wa-panel" className={open ? 'open' : ''}>
        <strong>Chat on WhatsApp</strong>
        <p>Have a question? Reach out to Acharya directly for a quick response.</p>
        <a
          className="wa-chat-link"
          href="https://wa.me/919999999999?text=Namaste%2C%20I%20would%20like%20to%20know%20more%20about%20your%20Vedic%20Astrology%20services."
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon /> Chat Now
        </a>
      </div>
      <button id="wa-bubble" aria-label="Chat on WhatsApp" onClick={() => setOpen(o => !o)}>
        <WhatsAppIcon />
      </button>
    </div>
  )
}

// App
export default function App() {
  const starCanvasRef = useStarCanvas()

  return (
    <>
      <canvas id="stars" ref={starCanvasRef} />
      <Navbar />
      <Hero />
      <StatsStrip />
      <About />
      <Vastu />
      <Classes />
      <Videos />
      <Testimonials />
      <Services />
      <Booking />
      <Footer />
      <WhatsAppToggle />
    </>
  )
}
