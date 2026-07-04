import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, fadeLeft, fadeRight, staggerContainer, scaleIn } from '../utils/animations'
import { Users, FlaskConical, Award, Globe } from 'lucide-react'
import './PageCommon.css'

function FadeSection({ children, variants, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  return (
    <motion.div ref={ref} variants={variants} initial="hidden"
      animate={inView ? 'show' : 'hidden'} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  )
}

const team = [
  { name: 'Dr. Amjad Husain', role: 'Co-Founder, PhD, MBA', bio: 'Expert in oncology entrepreneurship and biotechnology with international experience in CAR-T development.' },
  { name: 'Dr. Chandra Ghosh', role: 'Co-Founder, PhD', bio: 'Renowned scientist in cell biology and tumor microenvironment research with global recognition.' },
  { name: 'Dr. Pradip Majumder', role: 'Co-Founder, PhD', bio: 'Leading researcher in cancer genomics and personalized medicine with extensive clinical expertise.' },
]

const milestones = [
  { year: '2021', event: 'CanFinis Therapeutics incorporated as a Private Limited Company, registered with MCA India' },
  { year: 'Lab Setup', event: 'Advanced laboratory established at RISE Foundation, IISER Kolkata' },
  { year: 'Team', event: 'Globally renowned scientists and clinicians onboarded across oncology, biotechnology, and entrepreneurship' },
  { year: 'Platform', event: 'Tumor Microenvironment Platform developed and deployed for oncology drug discovery partners' },
  { year: 'Mar 2023', event: 'Show & Tell presentation at TiE Dehradun' },
  { year: 'Apr 2024', event: 'AACR Presentation in San Diego, USA' },
  { year: 'May 2024', event: 'Presentation at CTCR Pune' },
]

const pillars = [
  { icon: <Award size={32}/>, title: 'Registered Company', desc: 'Incorporated in 2021 and registered with the Ministry of Corporate Affairs (MCA), India, complying with all regulatory requirements.' },
  { icon: <Users size={32}/>, title: 'Qualified Researchers', desc: 'Globally renowned scientists with unparalleled expertise in oncology and cell therapy, bringing international insights to advance cancer care.' },
  { icon: <FlaskConical size={32}/>, title: 'Advanced Lab Setup', desc: 'RISE Foundation, IISER Kolkata — a premier research institution equipped with state-of-the-art research accelerators.' },
  { icon: <Globe size={32}/>, title: 'Global Collaboration', desc: 'Poised for collaboration to develop and commercialize novel CAR-T products across India and Southeast Asia.' },
]

export default function About() {
  return (
    <main style={{ paddingTop: 76 }}>

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="page-hero__content">
            <motion.span className="tag" variants={fadeUp}>About Us</motion.span>
            <motion.h1 className="page-hero__title" variants={fadeUp}>About CanFinis Therapeutics</motion.h1>
            <motion.p className="page-hero__desc" variants={fadeUp}>
              An oncology research and cell therapy start-up founded by leading technology experts,
              entrepreneurs, and clinicians — pioneering affordable cancer immunotherapy.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Company Description */}
      <section className="section">
        <div className="container two-col">
          <FadeSection variants={fadeLeft}>
            <img src="/lab.png" alt="CanFinis Lab" className="rounded-img" />
          </FadeSection>
          <FadeSection variants={fadeRight}>
            <span className="tag">Who We Are</span>
            <h2 className="section-title">Advancing Cancer Treatment Through Innovation</h2>
            <p className="section-sub" style={{marginBottom:16}}>
              CanFinis Therapeutics has developed an innovative Tumor Microenvironment (TME) Platform
              that tests the efficacy of both standard care drugs and novel molecules ex vivo at the
              preclinical stage.
            </p>
            <p className="section-sub">
              Additionally, CanFinis is pioneering CAR-T therapies targeting solid tumors prevalent in
              India and Southeast Asia, leveraging deep understanding of patient tumor antigens to
              optimize treatments, reduce time, and cut costs.
            </p>
          </FadeSection>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section" style={{background:'#f0f8ff', id:'journey'}}>
        <div className="container">
          <FadeSection variants={fadeUp} className="text-center mb-48">
            <span className="tag">Our Purpose</span>
            <h2 className="section-title">Vision & Mission</h2>
          </FadeSection>
          <div className="vm-grid">
            <FadeSection variants={fadeLeft} className="vm-card vm-card--vision">
              <h3>Our Vision</h3>
              <p>Every cancer patient deserves access to cutting-edge technologies and modern medicines at an affordable cost. CanFinis is dedicated to making this vision a reality by pioneering innovative therapies that prioritize both efficacy and accessibility for everyone.</p>
            </FadeSection>
            <FadeSection variants={fadeRight} className="vm-card vm-card--mission">
              <h3>Our Mission</h3>
              <p>To introduce state-of-the-art technologies for personalized cancer treatments targeting both hematological and solid cancers. Through innovation and dedication, CanFinis strives to advance the field of cancer treatment, offering tailored solutions to improve patient outcomes and quality of life.</p>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* Key Pillars */}
      <section className="section">
        <div className="container">
          <FadeSection variants={fadeUp} className="text-center mb-48">
            <span className="tag">Our Journey</span>
            <h2 className="section-title">Key Pillars of Our Journey</h2>
          </FadeSection>
          <motion.div className="pillars-grid"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{once:true, amount:0.1}}>
            {pillars.map(p => (
              <motion.div key={p.title} className="pillar-card" variants={scaleIn}>
                <div className="pillar-card__icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{background:'#0d2233'}}>
        <div className="container">
          <FadeSection variants={fadeUp} className="text-center mb-48">
            <span className="tag" style={{background:'rgba(0,168,204,0.15)',color:'#00a8cc'}}>Our History</span>
            <h2 className="section-title" style={{color:'#fff'}}>Key Milestones</h2>
          </FadeSection>
          <div className="timeline">
            {milestones.map((m, i) => (
              <FadeSection key={i} variants={i%2===0?fadeLeft:fadeRight} delay={i*0.05} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-year">{m.year}</div>
                <div className="timeline-event">{m.event}</div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <FadeSection variants={fadeUp} className="text-center mb-48">
            <span className="tag">Leadership</span>
            <h2 className="section-title">Co-Founders</h2>
            <p className="section-sub" style={{margin:'0 auto'}}>
              A highly qualified team adept in cutting-edge CAR-T therapy and drug development,
              with diverse expertise spanning oncology, biotechnology, clinical research and entrepreneurship.
            </p>
          </FadeSection>
          <motion.div className="team-grid"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{once:true}}>
            {team.map(m => (
              <motion.div key={m.name} className="team-card" variants={fadeUp}>
                <div className="team-card__avatar">
                  {m.name.split(' ').slice(-1)[0][0]}
                </div>
                <h3>{m.name}</h3>
                <span>{m.role}</span>
                <p>{m.bio}</p>
              </motion.div>
            ))}
          </motion.div>

          <FadeSection variants={fadeUp} className="advisory-section">
            <h3>Clinical Advisory Board</h3>
            <div className="advisory-list">
              {['Dr. Badal Kumar Sahu', 'Dr. Manas Kr. Mondal — DM, Gastroenterologist', 'Dr. Pinaki Roy — MD, DM'].map(a => (
                <div key={a} className="advisory-item">{a}</div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>
    </main>
  )
}
