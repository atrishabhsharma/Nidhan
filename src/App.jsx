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

      if (Math.random() < 0.003 && shootingStars.length < 2) spawnShootingStar()
      shootingStars = shootingStars.filter(s => s.life < s.maxLife)
      shootingStars.forEach(s => {
        s.life++
        if (s.life < 12) s.alpha = s.life / 12
        else if (s.life > s.maxLife - 18) s.alpha = (s.maxLife - s.life) / 18
        else s.alpha = 1

        const tx = Math.cos(s.angle) * s.len
        const ty = Math.sin(s.angle) * s.len
        const grad = ctx.createLinearGradient(s.x, s.y, s.x + tx, s.y + ty)
        grad.addColorStop(0, `rgba(240,200,74,${s.alpha * 0.55})`)
        grad.addColorStop(0.4, `rgba(240,200,74,${s.alpha * 0.2})`)
        grad.addColorStop(1, 'rgba(240,200,74,0)')

        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x + tx, s.y + ty)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.2
        ctx.stroke()

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
        Nidan<span>Guru</span>
      </span>
      <ul>
        <li><button className="nav-link" onClick={() => scrollToSection('about')}>About</button></li>
        <li><button className="nav-link" onClick={() => scrollToSection('videos')}>Videos</button></li>
        <li><button className="nav-link" onClick={() => scrollToSection('class-banner')}>Classes</button></li>
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
        <p className="hero-eyebrow">Vedic Astrology & Vastu Shastra</p>
        <h1 className="hero-title">
          Ancient Wisdom. <em>Modern Living.</em>
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

// Stats strip
function StatNumber({ target, delay, label }) {
  const { ref, count } = useCountUp(target, 1800, delay)
  return (
    <div className="stat-cell" ref={ref}>
      <div className="stat-num">{count.toLocaleString()}+</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

function StatsStrip() {
  return (
    <section className="stats-section">
      <div className="section-wrap">
        <div className="hero-stats-grid">
          <StatNumber target={25} delay={0} label="Years Experience" />
          <StatNumber target={10000} delay={200} label="Consultations" />
          <StatNumber target={500} delay={400} label="Vastu Audits" />
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
                <strong>25+</strong>
                <span>Years</span>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="about-content">
              <p className="section-label">✦ About the Guru</p>
              <h2 className="section-title">Acharya <em>Nidhan Singh</em></h2>
              <div className="gold-divider left" />
              <p className="section-desc" style={{ marginBottom: '1.5rem' }}>
                A lineage-trained Vedic astrologer and Vastu consultant with over 25 years of dedicated practice. Acharyaji combines classical Parashari and Jaimini systems with deep intuitive insight, offering guidance that is both scripturally grounded and practically transformative.
              </p>
              <p className="section-desc">
                Having studied under revered Gurus across Varanasi and Haridwar, he brings rare depth to every consultation — whether it is a birth chart reading, a complex Muhurta, or a comprehensive Vastu audit for your home or business.
              </p>
              <div className="credentials">
                <div className="cred-item">
                  <strong>Jyotish Acharya</strong>
                  <span>Varanasi Sanskrit Vidyapeeth</span>
                </div>
                <div className="cred-item">
                  <strong>Vastu Visharad</strong>
                  <span>All India Federation</span>
                </div>
                <div className="cred-item">
                  <strong>10,000+</strong>
                  <span>Consultations delivered</span>
                </div>
                <div className="cred-item">
                  <strong>Pan-India</strong>
                  <span>& International clients</span>
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
    thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    tag: 'Vedic Astrology',
    title: 'Understanding Your Birth Chart: A Complete Guide',
    desc: 'Learn the fundamentals of Janma Kundali and how planetary positions shape your destiny.',
    views: '125K'
  },
  {
    id: 'video2',
    thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    tag: 'Vastu Shastra',
    title: 'Top 10 Vastu Tips for Your Home',
    desc: 'Simple yet powerful Vastu corrections that can transform the energy of your living space.',
    views: '89K'
  },
  {
    id: 'video3',
    thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    tag: 'Muhurta',
    title: 'How to Choose the Perfect Wedding Date',
    desc: 'The ancient science of Muhurta and why timing is everything for auspicious beginnings.',
    views: '67K'
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
          <p className="section-desc" style={{ textAlign: 'center', margin: '0 auto' }}>
            Explore free wisdom through our carefully crafted video series on Vedic astrology and Vastu Shastra.
          </p>
        </Reveal>
        <StaggeredReveal className="videos-grid">
          {videosData.map(v => (
            <div className="video-card" key={v.id}>
              <div className="video-thumb">
                <img
                  src={v.thumb}
                  alt={v.title}
                  onError={(e) => { e.target.src = `https://placehold.co/640x360/111827/c9a84c?text=${encodeURIComponent(v.tag)}` }}
                />
                <div className="video-play">
                  <div className="play-btn"><PlayIcon /></div>
                </div>
                <div className="video-views-badge">👁 {v.views} views</div>
              </div>
              <div className="video-body">
                <p className="video-tag">{v.tag}</p>
                <h3 className="video-title">{v.title}</h3>
                <p className="video-desc">{v.desc}</p>
              </div>
            </div>
          ))}
        </StaggeredReveal>
      </div>
    </section>
  )
}

// Class Banner
function ClassBanner() {
  return (
    <section id="class-banner">
      <div className="class-banner-bg" />
      <div className="class-banner-border">
        <div className="class-banner-corner tl" />
        <div className="class-banner-corner tr" />
        <div className="class-banner-corner bl" />
        <div className="class-banner-corner br" />
      </div>
      <div className="class-banner-inner">
        <Reveal>
          <div className="class-banner-tag">🎓 Now Enrolling — Batch Starts April 2026</div>
          <h2 className="class-banner-title">
            Learn <em>Vedic Astrology</em> & Vastu Shastra
          </h2>
          <p className="class-banner-desc">
            Join Acharyaji's physical classroom programme in New Delhi. A structured 6-month course covering Parashari Jyotish, Muhurta, and practical Vastu — from foundation to advanced practice.
          </p>
          <div className="class-banner-perks">
            <div className="class-perk"><span>📍</span> In-person, New Delhi</div>
            <div className="class-perk"><span>📅</span> 6-Month Programme</div>
            <div className="class-perk"><span>📜</span> Certificate on Completion</div>
            <div className="class-perk"><span>👥</span> Small Batch (15 seats)</div>
          </div>
          <div className="class-banner-btns">
            <button className="btn-register" onClick={() => scrollToSection('booking')}>
              ✦ Register Interest
            </button>
            <button className="btn-ghost" onClick={() => scrollToSection('booking')}>Learn More</button>
          </div>
          <div className="class-seats">
            <span className="seats-dot" />
            Only 7 seats remaining — register early
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// Testimonials
const testimonialsData = [
  {
    text: "Acharyaji's birth chart reading was uncannily accurate. He identified a karmic pattern I had been struggling with for years and offered a remedy that genuinely shifted things within three months.",
    name: 'Priya Mehta',
    role: 'Entrepreneur, Mumbai',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    fallback: 'PM'
  },
  {
    text: 'We were facing constant disputes at our office. After the Vastu audit, simple rearrangements transformed the atmosphere completely. Our revenue has grown 40% since then.',
    name: 'Rahul Sinha',
    role: 'Director, Delhi NCR',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    fallback: 'RS'
  },
  {
    text: "The Muhurta consultation for our wedding was perfection. Acharyaji selected a time we initially thought was impossible given our constraints — and it turned out beautifully auspicious.",
    name: 'Ananya & Vikram Rao',
    role: 'Bangalore',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    fallback: 'AV'
  }
]

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
              <div className="quote-mark">&ldquo;</div>
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-reviewer">
                <img
                  src={t.img}
                  alt={t.name}
                  className="testi-avatar"
                  onError={(e) => { e.target.src = `https://placehold.co/48x48/111827/c9a84c?text=${t.fallback}` }}
                />
                <div>
                  <p className="testi-author">{t.name}</p>
                  <p className="testi-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </StaggeredReveal>
      </div>
    </section>
  )
}

// Services
const servicesData = [
  { icon: '☿', title: 'Birth Chart Analysis', desc: 'A comprehensive reading of your Janma Kundali revealing personality, karmic patterns, and life\'s grand design through the lens of Vedic astrology.', link: 'Consult Now →' },
  { icon: '🏛️', title: 'Vastu Audit', desc: 'On-site or remote evaluation of your home or office to harmonize spatial energies, attract abundance, and eliminate invisible obstacles.', link: 'Schedule Audit →' },
  { icon: '⚏', title: 'Muhurta — Auspicious Timing', desc: 'Select the most fortuitous moment for weddings, business launches, property registration, or any significant life event.', link: 'Find Your Time →' },
  { icon: '♃', title: 'Relationship Compatibility', desc: 'Kundali Milan and Guna matching to understand the cosmic bond between two souls—ideal for marriage and partnerships.', link: 'Check Compatibility →' },
  { icon: '🏠', title: 'Vastu Remedies', desc: 'Practical, non-demolition solutions using yantras, mirrors, colours, and elemental placements to correct existing spatial imbalances.', link: 'Get Remedies →' },
  { icon: '📜', title: 'Annual Forecast Report', desc: 'A detailed written Varshaphal report covering key planetary transits, dasha periods, and personalised guidance for the year ahead.', link: 'Order Report →' }
]

function Services() {
  return (
    <section id="services">
      <div className="section-wrap">
        <Reveal className="services-header">
          <p className="section-label">✦ What We Offer</p>
          <h2 className="section-title">Sacred <em>Services</em></h2>
          <div className="gold-divider" />
          <p className="section-desc" style={{ textAlign: 'center', margin: '0 auto' }}>
            Bridging the celestial and terrestrial—each offering is carefully crafted to illuminate your path.
          </p>
        </Reveal>
        <StaggeredReveal className="services-grid">
          {servicesData.map((s, i) => (
            <div className="service-card" key={i}>
              <span className="svc-icon">{s.icon}</span>
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
              <div className="ci-icon">📍</div>
              <div>
                <div className="ci-label">Location</div>
                <div className="ci-val">23, Vastu Marg, Hauz Khas, New Delhi — 110016</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="ci-icon">📞</div>
              <div>
                <div className="ci-label">Phone</div>
                <div className="ci-val">+91 98100 00000</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="ci-icon">✉️</div>
              <div>
                <div className="ci-label">Email</div>
                <div className="ci-val">consult@nidanguru.com</div>
              </div>
            </div>

            <button className="whatsapp-btn" onClick={() => {}}>
              <span>💬</span> Chat on WhatsApp
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
    { label: 'Classes', target: 'class-banner' },
    { label: 'Testimonials', target: 'testimonials' },
    { label: 'Services', target: 'services' },
    { label: 'Book Now', target: 'booking' },
  ]

  return (
    <footer>
      <div className="section-wrap">
        <div className="footer-logo">Nidan<span style={{ color: 'var(--white)' }}>Guru</span></div>
        <div className="footer-social">
          <span className="soc" title="Instagram">𝕀</span>
          <span className="soc" title="Facebook">𝔽</span>
          <span className="soc" title="YouTube">▶</span>
          <span className="soc" title="Twitter/X">𝕏</span>
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
      <Videos />
      <ClassBanner />
      <Testimonials />
      <Services />
      <Booking />
      <Footer />
      <WhatsAppToggle />
    </>
  )
}
