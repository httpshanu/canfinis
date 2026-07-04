import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, fadeLeft, fadeRight, staggerContainer, scaleIn } from '../utils/animations'
import './PageCommon.css'

function Fade({ children, variants, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  return <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? 'show' : 'hidden'} className={className}>{children}</motion.div>
}

const steps = [
  { num: '01', title: 'Cell Collection', desc: 'T cells are extracted from the patient\'s blood using advanced apheresis techniques.' },
  { num: '02', title: 'Genetic Engineering', desc: 'T cells are genetically modified to express CAR receptors targeting cancer antigens.' },
  { num: '03', title: 'Expansion', desc: 'Engineered CAR-T cells are multiplied to therapeutic quantities in specialized facilities.' },
  { num: '04', title: 'Infusion', desc: 'CAR-T cells are infused back into the patient to seek and destroy cancer cells.' },
]

const approach = [
  'Developing personalized CAR-Ts for solid tumours, targeting both primary and metastasized cancers',
  'Developing an allogenic CAR-T platform to expedite personalized CAR-T development for solid tumors',
  'Using the Tumor Microenvironment Platform to test in-house CAR-T efficacy ex-vivo in physiological settings prior to treatment',
  'Targeting both primary and metastasized cancers based on understanding of tumor microenvironments and antigen heterogeneity',
]

export default function CARTTech() {
  return (
    <main style={{ paddingTop: 76 }}>
      <section className="page-hero">
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="page-hero__content">
            <motion.span className="tag" variants={fadeUp}>CAR-T Technology</motion.span>
            <motion.h1 className="page-hero__title" variants={fadeUp}>Next-Generation Cancer Immunotherapy</motion.h1>
            <motion.p className="page-hero__desc" variants={fadeUp}>
              CAR-T cell therapy uses genetically altered T cells to destroy cancer cells more effectively —
              generating substantial excitement in oncology with remarkable results in advanced leukemias.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Fade variants={fadeUp} className="text-center mb-48">
            <span className="tag">How It Works</span>
            <h2 className="section-title">The CAR-T Process</h2>
          </Fade>
          <motion.div className="cart-steps"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
            {steps.map(s => (
              <motion.div key={s.num} className="cart-step" variants={scaleIn}>
                <div className="cart-step__num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ background: '#f0f8ff' }}>
        <div className="container cart-approach">
          <Fade variants={fadeLeft}>
            <img src="/cart_diagram.png" alt="CAR-T Therapy Process" className="rounded-img" />
          </Fade>
          <Fade variants={fadeRight}>
            <span className="tag">CanFinis Approach</span>
            <h2 className="section-title">Our Unique CAR-T Strategy</h2>
            <p className="section-sub" style={{ marginBottom: 24 }}>
              While CAR-T has demonstrated remarkable efficacy in hematological cancers, solid cancers have
              not yet responded well. CanFinis is pioneering the next frontier.
            </p>
            <div className="approach-list">
              {approach.map((a, i) => (
                <div key={i} className="approach-item">
                  <div className="approach-dot" />
                  <p>{a}</p>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      <section className="section" style={{ background: '#0d2233' }}>
        <div className="container text-center">
          <Fade variants={fadeUp}>
            <span className="tag" style={{ background: 'rgba(0,168,204,0.15)', color: '#00a8cc' }}>FDA Approved</span>
            <h2 className="section-title" style={{ color: '#fff', marginBottom: 16 }}>Proven Track Record</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 600, margin: '0 auto', lineHeight: 1.75, fontSize: '0.95rem' }}>
              The FDA has approved several CAR-T cell treatments for blood malignancies, including
              multiple myeloma and some types of leukemia and lymphomas. CanFinis is extending this
              success to solid tumors prevalent in India and Southeast Asia.
            </p>
          </Fade>
        </div>
      </section>
    </main>
  )
}
