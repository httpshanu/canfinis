import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import './PageCommon.css'
import './Events.css'

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

const events = [
  {
    day: '09', mon: 'May', year: '2024',
    cat: 'Activities & News',
    title: 'Presentation at CTCR, Pune',
    desc: 'CanFinis presented its innovative CAR-T research and TME platform at the Cancer Treatment & Clinical Research conference in Pune, India.',
    image: '/event-ctcr-pune.jpg',
    location: 'Pune, India',
  },
  {
    day: '08', mon: 'Apr', year: '2024',
    cat: 'Activities & News',
    title: 'AACR Presentation — San Diego, USA',
    desc: 'CanFinis showcased its groundbreaking CAR-T therapy research at the American Association for Cancer Research Annual Meeting in San Diego.',
    image: '/event-aacr-san-diego.jpg',
    location: 'San Diego, USA',
  },
  {
    day: '30', mon: 'Mar', year: '2023',
    cat: 'Activities & News',
    title: 'Show & Tell — TiE Dehradun',
    desc: 'CanFinis presented its vision and early research at the TiE Dehradun entrepreneurship showcase, gaining recognition in the startup ecosystem.',
    image: '/event-show-tell-dehradun.jpg',
    location: 'Dehradun, India',
  },
]

export default function Events() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t) }, [])

  return (
    <main style={{ paddingTop: 76 }}>

      {/* ── Page Hero ──────────────────────────────────── */}
      <section className="events-hero">
        <div className="events-hero__grid-overlay" />
        <div className="events-hero__bg-text">
          <span className={loaded ? 'events-hero__bg-text--visible' : ''}>EVENTS</span>
        </div>
        <div className="container events-hero__inner">
          <div className={`events-hero__tag ${loaded ? 'events-hero__tag--visible' : ''}`}>
            <Calendar size={14} /> Events & News
          </div>
          <h1 className={`events-hero__title ${loaded ? 'events-hero__title--visible' : ''}`}>
            <span className="events-hero__title-line" style={{ transitionDelay: '0.15s' }}>Activities &</span>
            <span className="events-hero__title-line" style={{ transitionDelay: '0.3s' }}>Milestones</span>
          </h1>
          <p className={`events-hero__desc ${loaded ? 'events-hero__desc--visible' : ''}`}>
            CanFinis has been actively presenting at major international conferences,
            showcasing its research and innovation to the global oncology community.
          </p>
        </div>
      </section>

      {/* ── Events List ────────────────────────────────── */}
      <section className="events-section">
        <div className="events-section__grid-bg" />
        <div className="container">
          <RevealSection className="events-section__header">
            <div className="events-section__label">
              <div className="events-section__label-line" />
              <span>Latest</span>
              <div className="events-section__label-line" />
            </div>
            <h2 className="events-section__title">Recent Events</h2>
          </RevealSection>

          <div className="events-grid">
            {events.map((e, i) => (
              <RevealSection key={i} delay={i * 0.12}>
                <div className="event-card">
                  <div className="event-card__image">
                    <img src={e.image} alt={e.title} />
                    <div className="event-card__date-badge">
                      <span className="event-card__date-day">{e.day}</span>
                      <span className="event-card__date-rest">{e.mon} {e.year}</span>
                    </div>
                  </div>
                  <div className="event-card__content">
                    <div className="event-card__meta">
                      <span className="event-card__cat">{e.cat}</span>
                      <span className="event-card__location"><MapPin size={12} /> {e.location}</span>
                    </div>
                    <h3 className="event-card__title">{e.title}</h3>
                    <p className="event-card__desc">{e.desc}</p>
                    <button className="event-card__link" type="button" onClick={() => alert(`${e.title}\n\n${e.desc}\n\nLocation: ${e.location}\nDate: ${e.day} ${e.mon} ${e.year}`)}>
                      Read More <ArrowRight size={14} />
                    </button>
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
