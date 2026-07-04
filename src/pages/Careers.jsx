import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'
import { Mail } from 'lucide-react'
import './PageCommon.css'

export default function Careers() {
  return (
    <main style={{ paddingTop: 76 }}>
      <section className="page-hero">
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="page-hero__content">
            <motion.span className="tag" variants={fadeUp}>Careers</motion.span>
            <motion.h1 className="page-hero__title" variants={fadeUp}>Join Our Mission</motion.h1>
            <motion.p className="page-hero__desc" variants={fadeUp}>
              Join the mission to revolutionize cancer treatment. Rewarding career opportunities
              await those who wish to contribute to cutting-edge CAR-T therapy development.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <motion.div className="careers-cta"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <Mail size={48} style={{ margin: '0 auto 20px', opacity: 0.85 }} />
            <h2>No Open Positions Right Now</h2>
            <p>
              We're always looking for passionate scientists, researchers, and entrepreneurs to join
              our team. While we don't have active postings right now, we welcome inquiries from
              talented individuals who share our vision of making cancer treatment accessible to all.
            </p>
            <a href="mailto:contact@canfinis.com" className="btn-white">
              Send Your Resume →
            </a>
          </motion.div>

          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#003d5b', marginBottom: 24, textAlign: 'center' }}>
              Areas We're Interested In
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {['Oncology Research', 'Cell Biology', 'CAR-T Engineering', 'Clinical Research', 'Bioinformatics', 'Regulatory Affairs', 'Business Development', 'Lab Operations'].map(role => (
                <motion.div key={role}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '14px 20px', fontWeight: 600, color: '#475569', fontSize: '0.87rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  {role}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
