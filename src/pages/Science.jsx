import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, fadeLeft, fadeRight, staggerContainer, scaleIn } from '../utils/animations'
import { AlertCircle, Activity, Cpu } from 'lucide-react'
import './PageCommon.css'

function Fade({ children, variants, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  return <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? 'show' : 'hidden'} className={className}>{children}</motion.div>
}

const challenges = [
  { icon: <AlertCircle size={22}/>, title: 'Drug Resistance', desc: 'Tumor cells frequently fail to respond to drugs, making standard treatment ineffective for many patients.' },
  { icon: <Activity size={22}/>, title: 'Tumor Complexity', desc: 'Cancer is a genomic disease — every patient is unique, requiring personalized treatment strategies.' },
  { icon: <Cpu size={22}/>, title: 'Solid Tumor Barriers', desc: 'CAR-T therapies face unique challenges targeting solid tumors unlike hematological cancers.' },
]

const tmeFeatures = [
  { title: 'Physical Properties', desc: 'Accounts for the mechanical stiffness and physical structure of the tumor environment.' },
  { title: 'Chemical Properties', desc: 'Models oxygen, pH, and nutrient gradients found in real tumor conditions.' },
  { title: 'Ex Vivo Testing', desc: 'Tests drug efficacy in near-physiological conditions before clinical application.' },
]

export default function Science() {
  return (
    <main style={{ paddingTop: 76 }}>
      <section className="page-hero">
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="page-hero__content">
            <motion.span className="tag" variants={fadeUp}>Our Sciences</motion.span>
            <motion.h1 className="page-hero__title" variants={fadeUp}>Identifying the Challenge</motion.h1>
            <motion.p className="page-hero__desc" variants={fadeUp}>
              Cancer is the second leading cause of death globally and is rapidly worsening the state
              of public health in Southeast Asia. CanFinis is solving the core challenges.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container challenge-grid">
          <Fade variants={fadeLeft}>
            <span className="tag">The Problem</span>
            <h2 className="section-title">Why Standard Treatments Fall Short</h2>
            <p className="section-sub">
              Many times, tumor cells do not respond to the drug. Cancer is a genomic disease
              and every patient is unique. Personalized treatments are required that are specific and efficacious.
            </p>
            <div className="challenge-points">
              {challenges.map(c => (
                <div key={c.title} className="challenge-point">
                  <span className="challenge-point__icon">{c.icon}</span>
                  <div>
                    <h4>{c.title}</h4>
                    <p>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Fade>
          <Fade variants={fadeRight}>
            <img src="/tme.png" alt="Tumor Microenvironment Platform" className="rounded-img" />
          </Fade>
        </div>
      </section>

      <section className="section" style={{ background: '#f0f8ff' }}>
        <div className="container">
          <Fade variants={fadeUp} className="text-center mb-48">
            <span className="tag">Our Solution</span>
            <h2 className="section-title">The CanFinis TME Platform</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              The platform takes into account key tumor microenvironment factors such as physical,
              mechanical, and chemical properties, and tests the efficacy in nearly physiological conditions.
            </p>
          </Fade>
          <motion.div className="tme-features"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {tmeFeatures.map(f => (
              <motion.div key={f.title} className="tme-feature-card" variants={scaleIn}>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
