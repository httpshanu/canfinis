import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, staggerContainer, scaleIn } from '../utils/animations'
import './PageCommon.css'

function Fade({ children, variants, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? 'show' : 'hidden'} className={className}>{children}</motion.div>
}

const pipeline = [
  {
    id: 'CF-003', desc: 'CAR-Ts for Metastatic Gastric Cancers',
    stages: { 2026: { label: 'Manufacturing & Phase I', cls: 'stage-phase1' }, 2027: { label: 'Phase II', cls: 'stage-phase2' }, 2028: { label: 'Approval', cls: 'stage-approval' }, 2029: { label: 'Commercial', cls: 'stage-commercial' } }
  },
  {
    id: 'CF-005', desc: 'CAR-Ts for Primary Gastric Cancers',
    stages: { 2026: { label: 'Preclinical', cls: 'stage-preclinical' }, 2027: { label: 'Manufacturing', cls: 'stage-manufacturing' }, 2028: { label: 'Phase I & IIa', cls: 'stage-phase1' }, 2029: { label: '—', cls: '' } }
  },
  {
    id: 'CF-007', desc: 'CAR-Ts for other metastatic cancer in peritoneal cavity',
    stages: { 2026: { label: 'Early Preclinical', cls: 'stage-preclinical' }, 2027: { label: 'Preclinical', cls: 'stage-preclinical' }, 2028: { label: 'Manufacturing', cls: 'stage-manufacturing' }, 2029: { label: '—', cls: '' } }
  },
  {
    id: 'CF-009', desc: 'CAR-Ts for Mesothelioma & Lung Cancer',
    stages: { 2026: { label: 'Target Selection', cls: 'stage-target' }, 2027: { label: 'Discovery & Lead IDs', cls: 'stage-discovery' }, 2028: { label: 'Preclinical POC', cls: 'stage-preclinical' }, 2029: { label: '—', cls: '' } }
  },
  {
    id: 'CF-011', desc: 'CAR-Ts for Metastatic Prostate Cancer',
    stages: { 2026: { label: 'Target Selection', cls: 'stage-target' }, 2027: { label: 'Discovery & Lead IDs', cls: 'stage-discovery' }, 2028: { label: 'Preclinical POC', cls: 'stage-preclinical' }, 2029: { label: '—', cls: '' } }
  },
]

export default function Pipeline() {
  return (
    <main style={{ paddingTop: 76 }}>
      <section className="page-hero">
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="page-hero__content">
            <motion.span className="tag" variants={fadeUp}>Pipeline</motion.span>
            <motion.h1 className="page-hero__title" variants={fadeUp}>CanFinis Product Pipeline</motion.h1>
            <motion.p className="page-hero__desc" variants={fadeUp}>
              5 CAR-T products in various stages of development, showcasing a diverse and expanding portfolio
              with near-term and long-term growth opportunities.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Fade variants={fadeUp} className="text-center mb-48">
            <span className="tag">Development Roadmap 2026–2029</span>
            <h2 className="section-title">Advanced CAR-T Portfolio</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              CanFinis stands out with its Advanced CAR-T Product, CF-003, poised for a potential
              gastro-intestinal cancer clinical trial soon.
            </p>
          </Fade>

          <Fade variants={fadeUp}>
            <div className="pipeline-table-wrap">
              <table className="pipeline-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>2026</th>
                    <th>2027</th>
                    <th>2028</th>
                    <th>2029</th>
                  </tr>
                </thead>
                <tbody>
                  {pipeline.map((p, i) => (
                    <motion.tr key={p.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}>
                      <td>{p.id}</td>
                      <td>{p.desc}</td>
                      {[2026, 2027, 2028, 2029].map(yr => (
                        <td key={yr}>
                          {p.stages[yr]?.label && p.stages[yr].label !== '—'
                            ? <span className={`stage-badge ${p.stages[yr].cls}`}>{p.stages[yr].label}</span>
                            : <span style={{ color: '#cbd5e1' }}>—</span>}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pipeline-legend">
              {[
                ['stage-target','Target Selection'],['stage-discovery','Discovery'],
                ['stage-preclinical','Preclinical'],['stage-manufacturing','Manufacturing'],
                ['stage-phase1','Phase I'],['stage-phase2','Phase II'],
                ['stage-approval','Approval'],['stage-commercial','Commercial'],
              ].map(([cls, label]) => (
                <div key={label} className="legend-item">
                  <span className={`stage-badge ${cls}`}>{label}</span>
                </div>
              ))}
            </div>
          </Fade>

          {/* Market Section */}
          <Fade variants={fadeUp} style={{ marginTop: 60 }}>
            <div className="text-center mb-48" style={{ marginTop: 60 }}>
              <span className="tag">Market Opportunity</span>
              <h2 className="section-title">Global Oncology Market</h2>
            </div>
            <div className="market-cards">
              <div className="market-card market-card--global">
                <h3>Global Market</h3>
                <div className="market-val">$200B+</div>
                <p>Global oncology market as of 2023, driven by advancements and growing R&D investments</p>
              </div>
              <div className="market-card market-card--india">
                <h3>India Market</h3>
                <div className="market-val">$20B</div>
                <p>Projected India oncology market by 2026 with rising healthcare access and personalized medicine focus</p>
              </div>
              <div className="market-card market-card--cost">
                <h3>Cost Reduction Goal</h3>
                <div className="market-val">10x</div>
                <p>CanFinis aims to reduce CAR-T cost from ~$500,000 (US) by 10x for Indian patients</p>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </main>
  )
}
