import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, MapPin, FlaskConical, Mail, Phone, Clock, Eye, Target, Microscope, Dna, BarChart3, Zap } from 'lucide-react'
import CountUp from '../components/CountUp'
import ColorWave from '../components/ColorWave'
import CellAnimation from '../components/CellAnimation'
import DnaHelix from '../components/DnaHelix'
import FloatingParticles from '../components/FloatingParticles'
import './Home.css'

/* ── Stagger reveal wrapper ─────────────────────────── */
function RevealSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <div ref={ref} className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}>
      {children}
    </div>
  )
}

/* ── Animated line that grows ────────────────────────── */
function AnimatedLine({ delay = 0, width = 60 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  return (
    <div ref={ref} className="stat-line" style={{ width }}>
      <div className="stat-line__fill" style={{
        width: inView ? '100%' : '0%',
        transition: `width 1s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }} />
      <div className="stat-line__dot" style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'scale(1)' : 'scale(0)',
        transition: `all 0.4s ease ${delay + 0.6}s`,
      }} />
    </div>
  )
}

const infoItems = [
  { icon: <Building2 size={20}/>, label: 'Founded', value: '2021' },
  { icon: <MapPin size={20}/>, label: 'Headquarters', value: 'Kolkata, India' },
  { icon: <FlaskConical size={20}/>, label: 'Lab Location', value: 'RISE Foundation, IISER Kolkata' },
  { icon: <Mail size={20}/>, label: 'Email', value: 'contact@canfinis.com' },
  { icon: <Phone size={20}/>, label: 'Phone', value: '+91 8861410623' },
  { icon: <Clock size={20}/>, label: 'Working Hours', value: 'Mon – Sat: 9AM – 7PM' },
]

const featureCards = [
  { icon: <Microscope size={26}/>, title: 'Our Sciences', desc: 'Understanding the tumor microenvironment to test drug efficacy in near-physiological conditions for personalized treatment.', link: '/science' },
  { icon: <Dna size={26}/>, title: 'CAR-T Technology', desc: 'Next-generation CAR-T therapies targeting solid tumors with precision, safety, and higher efficacy.', link: '/cart-technology' },
  { icon: <Zap size={26}/>, title: 'Advanced Solutions', desc: 'Precision-engineered CAR-T treatments designed to break barriers and revolutionize cancer care.', link: '/services' },
  { icon: <BarChart3 size={26}/>, title: 'Market Opportunity', desc: 'The global oncology market is projected to exceed USD 400 billion by 2027, driving immense growth.', link: '/pipeline' },
]

const founders = [
  { name: 'Dr. Amjad Husain', role: 'Co-Founder & CEO', image: '/founder-amjad.jpg' },
  { name: 'Dr. Chandra Ghosh', role: 'Co-Founder & CSO', image: '/founder-chandra.jpg' },
  { name: 'Dr. Pradip Majumder', role: 'Co-Founder & CTO', image: '/founder-pradip.jpg' },
]

const statsData = [
  { value: 16, suffix: '+', label: 'Specialized Centers', icon: <FlaskConical size={18}/> },
  { value: 1000, suffix: '+', label: 'Collection Points', icon: <MapPin size={18}/> },
  { value: 172, suffix: '', label: 'Patients Diagnosed', icon: <Building2 size={18}/> },
  { value: 700, suffix: '+', label: 'Satisfied Users Globally', icon: <Zap size={18}/> },
]

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t) }, [])

  return (
    <main className="home" style={{paddingTop: 76}}>

      {/* ══════════════════════════════════════════════════════
          HERO — Shastra-style with giant background text
          ══════════════════════════════════════════════════════ */}
      <section className="hero">
        {/* Wave animation background */}
        <ColorWave
          colors={['#003d5b', '#00a8cc', '#005a80', '#00d4ff']}
          speed={0.6}
          amplitude={25}
        />
        {/* Floating cell particles */}
        <CellAnimation type="cells" count={15} colors={['#00a8cc', '#003d5b', '#00d4ff']} />
        {/* DNA Helix animation */}
        <DnaHelix />
        {/* Ambient floating particles */}
        <FloatingParticles count={25} color="#00a8cc" maxSize={3} speed={0.3} />
        {/* Grid pattern overlay */}
        <div className="hero__grid-overlay" />
        {/* Gradient blobs */}
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />
        {/* Floating circles */}
        <div className="hero__circle hero__circle--1" />
        <div className="hero__circle hero__circle--2" />
        <div className="hero__circle hero__circle--3" />

        {/* Giant background text — like Shastra VC */}
        <div className={`hero__bg-text ${loaded ? 'hero__bg-text--visible' : ''}`}>
          <span>CANFINIS</span>
        </div>

        {/* Gradient overlay to blend bg text */}
        <div className="hero__gradient-overlay" />

        <div className="container hero__inner">
          {/* Left: Text content */}
          <div className="hero__content">
            <div className={`hero__tag ${loaded ? 'hero__tag--visible' : ''}`}>
              Oncology · Cell Therapy · Innovation
            </div>

            <h1 className={`hero__title ${loaded ? 'hero__title--visible' : ''}`}>
              <span className="hero__title-line" style={{ transitionDelay: '0.15s' }}>Pioneering the</span>
              <span className="hero__title-line" style={{ transitionDelay: '0.3s' }}>Future of</span>
              <span className="hero__title-line hero__title-accent" style={{ transitionDelay: '0.45s' }}>Cancer Immunotherapy</span>
            </h1>

            <p className={`hero__desc ${loaded ? 'hero__desc--visible' : ''}`}>
              CanFinis Therapeutics is an oncology research and cell therapy start-up developing
              innovative CAR-T therapies and a Tumor Microenvironment Platform to advance
              personalized cancer treatment.
            </p>

            <div className={`hero__actions ${loaded ? 'hero__actions--visible' : ''}`}>
              <Link to="/science" className="btn-primary btn-primary--lg">Our Science <ArrowRight size={16}/></Link>
              <Link to="/pipeline" className="btn-outline btn-outline--lg">Explore Pipeline</Link>
            </div>
          </div>

          {/* Right: Image card */}
          <div className={`hero__visual ${loaded ? 'hero__visual--visible' : ''}`}>
            <div className="hero__image-card">
              <img src="/hero_cells.png" alt="CAR-T Cancer Immunotherapy" />
              <div className="hero__image-glow" />
            </div>
            <div className={`hero__floating-badge ${loaded ? 'hero__floating-badge--visible' : ''}`}>
              <span className="hero__floating-badge-icon"><Dna size={14}/></span>
              <span>CAR-T Cell Therapy</span>
            </div>
          </div>
        </div>

        {/* Bottom stats strip — Shastra style with lines */}
        <div className={`hero__bottom-stats ${loaded ? 'hero__bottom-stats--visible' : ''}`}>
          <div className="container">
            <div className="hero__bottom-stats-grid">
              {[
                { val: '$400B+', label: 'Global Oncology Market by 2027' },
                { val: '9AM–7PM', label: 'Mon – Sat Working Hours' },
                { val: 'IISER Kolkata', label: 'RISE Foundation Lab' },
              ].map((s, i) => (
                <div key={s.label} className="hero__bottom-stat">
                  <AnimatedLine delay={1.2 + i * 0.2} width={50} />
                  <h3 className="hero__bottom-stat__val">{s.val}</h3>
                  <p className="hero__bottom-stat__label">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INFO BAR
          ══════════════════════════════════════════════════════ */}
      <section className="info-bar">
        <div className="container">
          <div className="info-bar__grid">
            {infoItems.map((item, i) => (
              <RevealSection key={item.label} delay={i * 0.06}>
                <div className="info-bar__item">
                  <span className="info-bar__icon">{item.icon}</span>
                  <span className="info-bar__label">{item.label}</span>
                  <span className="info-bar__value">{item.value}</span>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ABOUT SNIPPET
          ══════════════════════════════════════════════════════ */}
      <section className="about-snippet">
        <div className="about-snippet__grid-bg" />
        <div className="container about-snippet__grid">
          <RevealSection className="about-snippet__text" delay={0}>
            <div className="section-label">
              <div className="section-label__line" />
              <span>About CanFinis</span>
              <div className="section-label__line" />
            </div>
            <h2 className="section-title">CanFinis Therapeutics is a Life Sciences start-up</h2>
            <p className="section-sub">
              CanFinis Therapeutics, an oncology research and cell therapy start-up based in Kolkata,
              was founded by leading technology experts, entrepreneurs, and clinicians. The company has
              developed an innovative tumor microenvironment platform that tests the efficacy of both
              standard care drugs and novel molecules ex vivo at the preclinical stage.
            </p>
            <Link to="/about" className="btn-primary" style={{marginTop:24}}>Read More About Us <ArrowRight size={14}/></Link>
          </RevealSection>

          <RevealSection className="about-snippet__lab" delay={0.15}>
            <img src="/lab.png" alt="CanFinis Research Lab at IISER Kolkata" />
            <div className="about-snippet__lab-badge">
              <FlaskConical size={14}/> RISE Foundation, IISER Kolkata
            </div>
          </RevealSection>

          <RevealSection className="about-snippet__cards" delay={0.3}>
            <div className="vision-card">
              <div className="vision-card__icon"><Eye size={20} color="#00a8cc"/></div>
              <div>
                <h4>Our Vision</h4>
                <p>Every cancer patient deserves access to cutting-edge technologies and modern medicines at an affordable cost.</p>
              </div>
            </div>
            <div className="vision-card">
              <div className="vision-card__icon"><Target size={20} color="#00a8cc"/></div>
              <div>
                <h4>Our Mission</h4>
                <p>To introduce state-of-the-art technologies for personalized cancer treatments targeting both hematological and solid cancers.</p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS BANNER — Shastra-style with animated lines
          ══════════════════════════════════════════════════════ */}
      <section className="stats-banner">
        <ColorWave
          colors={['#00d4ff', '#00a8cc', '#ffffff']}
          speed={1.2}
          amplitude={15}
        />
        <FloatingParticles count={12} color="#ffffff" maxSize={2} speed={0.4} />
        <div className="stats-banner__grid-overlay" />
        <div className="stats-banner__blob stats-banner__blob--1" />
        <div className="stats-banner__blob stats-banner__blob--2" />
        <div className="container">
          <div className="stats-banner__grid">
            {statsData.map((stat, i) => (
              <RevealSection key={stat.label} delay={i * 0.12}>
                <div className="stat-item">
                  <AnimatedLine delay={0.3 + i * 0.15} width={40} />
                  <div className="stat-item__icon">{stat.icon}</div>
                  <div className="stat-item__value">
                    <CountUp end={stat.value} suffix={stat.suffix} duration={1.8} />
                  </div>
                  <span className="stat-item__label">{stat.label}</span>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURE CARDS
          ══════════════════════════════════════════════════════ */}
      <section className="features">
        <ColorWave
          colors={['#00a8cc', '#003d5b', '#005a80']}
          speed={0.4}
          amplitude={20}
        />
        <CellAnimation type="molecules" count={10} colors={['#00a8cc', '#00d4ff']} />
        <FloatingParticles count={15} color="#00d4ff" maxSize={2} speed={0.2} />
        <div className="features__bg-pattern" />
        <div className="container">
          <RevealSection className="features-header">
            <div className="section-label section-label--light">
              <div className="section-label__line section-label__line--light" />
              <span>Explore CanFinis</span>
              <div className="section-label__line section-label__line--light" />
            </div>
            <h2 className="section-title section-title--light" style={{marginTop:8}}>Our Core Areas</h2>
            <p className="features-header__sub">Discover the science and innovation driving our mission to transform cancer treatment.</p>
          </RevealSection>
          <div className="features__grid">
            {featureCards.map((card, i) => (
              <RevealSection key={card.title} delay={i * 0.1}>
                <div className="feature-card">
                  <div className="feature-card__icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <Link to={card.link} className="feature-card__link">
                    Learn More <ArrowRight size={14}/>
                  </Link>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SCIENCE — Identifying the Challenge
          ══════════════════════════════════════════════════════ */}
      <section className="science-section">
        <div className="science-section__grid-bg" />
        <div className="container science-section__grid">
          <RevealSection className="science-section__text" delay={0}>
            <div className="section-label">
              <div className="section-label__line" />
              <span>Our Sciences</span>
              <div className="section-label__line" />
            </div>
            <h2 className="section-title">Identifying the Challenge</h2>
            <p className="section-sub">
              In addition to being the second leading cause of death globally, cancer is rapidly
              worsening the state of public health in Southeast Asia. Management of cancer is primarily
              driven by either surgery, medication and/or radiation therapy. Many times, the tumor cells
              do not respond to the drug and that's where our tumor microenvironment platform can help.
            </p>
            <p className="section-sub" style={{marginTop:12}}>
              The CanFinis tumor platform takes into account key tumor microenvironment factors such as
              physical, mechanical and chemical properties and tests the efficacy in nearly physiological
              conditions. Cancer is a genomic disease, and every patient is unique and different.
            </p>
            <Link to="/science" className="btn-primary" style={{marginTop:24}}>Explore Our Science <ArrowRight size={14}/></Link>
          </RevealSection>
          <RevealSection className="science-section__image" delay={0.15}>
            <img src="/the-problem.jpg" alt="Cancer Challenge - Tumor Microenvironment" />
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TEAM / CO-FOUNDERS
          ══════════════════════════════════════════════════════ */}
      <section className="team-section">
        <div className="team-section__grid-bg" />
        <div className="container">
          <RevealSection className="team-section__header">
            <div className="section-label">
              <div className="section-label__line" />
              <span>SCOPE</span>
              <div className="section-label__line" />
            </div>
            <h2 className="section-title" style={{textAlign:'center'}}>Our Co-Founders</h2>
            <p className="section-sub" style={{textAlign:'center', margin:'0 auto'}}>
              CanFinis boasts a highly qualified team adept in cutting-edge CAR-T therapy and drug
              development. With diverse expertise spanning oncology, biotechnology, clinical research
              and entrepreneurship, our team is committed to revolutionizing cancer treatment.
            </p>
          </RevealSection>
          <div className="team-grid">
            {founders.map((f, i) => (
              <RevealSection key={f.name} delay={i * 0.12}>
                <div className="team-card">
                  <div className="team-card__image">
                    <img src={f.image} alt={f.name} />
                  </div>
                  <div className="team-card__info">
                    <h3 className="team-card__name">{f.name}</h3>
                    <p className="team-card__role">{f.role}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
