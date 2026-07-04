import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, staggerContainer, scaleIn } from '../utils/animations'
import { Target, Shield, Zap } from 'lucide-react'
import './PageCommon.css'

function Fade({ children, variants, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? 'show' : 'hidden'} className={className}>{children}</motion.div>
}

const services = [
  {
    icon: <Target size={32}/>,
    title: 'Tailored Precision',
    desc: 'Precision-engineered CAR-T treatments tailored to individual patients for enhanced efficacy and outcomes. Every treatment protocol is customized based on the patient\'s unique tumor antigen profile.',
    badge: 'Personalized Medicine'
  },
  {
    icon: <Shield size={32}/>,
    title: 'Breaking Barriers',
    desc: 'Advancing CAR-T therapy to target solid tumors, overcoming previous limitations for broader cancer treatment. CanFinis is pioneering CAR-T for gastric, peritoneal, lung, and prostate cancers.',
    badge: 'Solid Tumor Focus'
  },
  {
    icon: <Zap size={32}/>,
    title: 'Revolutionizing Treatment',
    desc: 'Innovating cancer care by assessing CAR-T efficacy in realistic tumor environments pre-treatment using our TME Platform, ensuring optimal results before clinical application.',
    badge: 'TME Platform'
  },
]

export default function Services() {
  return (
    <main style={{ paddingTop: 76 }}>
      <section className="page-hero">
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="page-hero__content">
            <motion.span className="tag" variants={fadeUp}>Services</motion.span>
            <motion.h1 className="page-hero__title" variants={fadeUp}>Advanced CAR-T Solutions</motion.h1>
            <motion.p className="page-hero__desc" variants={fadeUp}>
              Three core pillars of innovation driving CanFinis's mission to make personalized
              cancer treatment accessible and affordable.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Fade variants={fadeUp} className="text-center mb-48">
            <span className="tag">What We Offer</span>
            <h2 className="section-title">Our Core Capabilities</h2>
          </Fade>
          <motion.div className="services-grid"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
            {services.map(s => (
              <motion.div key={s.title} className="service-card" variants={scaleIn}>
                <div className="service-card__icon">{s.icon}</div>
                <span className="tag" style={{ marginBottom: 10 }}>{s.badge}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ background: '#f0f8ff' }}>
        <div className="container two-col">
          <Fade variants={fadeUp}>
            <img src="/market.png" alt="Oncology Market Growth" className="rounded-img" />
          </Fade>
          <Fade variants={fadeUp}>
            <span className="tag">Value Propositions</span>
            <h2 className="section-title">Why CanFinis?</h2>
            {[
              ['Affordable Treatment', 'Developing affordable novel CAR-Ts for solid cancer treatment, targeting a 10x cost reduction from current US pricing.'],
              ['Market Growth', 'Oncology market estimated at ~USD 150 billion, projected to exceed USD 400 billion by 2027.'],
              ['Qualified Team', 'Globally renowned scientists with expertise in oncology, biotechnology, and entrepreneurship.'],
              ['Advanced Lab', 'Cutting-edge research facility at RISE Foundation, IISER Kolkata.'],
            ].map(([title, desc]) => (
              <div key={title} className="approach-item" style={{ marginBottom: 16 }}>
                <div className="approach-dot" />
                <div>
                  <strong style={{ color: '#003d5b', display: 'block', marginBottom: 4 }}>{title}</strong>
                  <p style={{ fontSize: '0.87rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </Fade>
        </div>
      </section>
    </main>
  )
}
