import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeLeft, fadeRight, staggerContainer, fadeUp } from '../utils/animations'
import { MapPin, Mail, Phone, Clock, Globe, Send } from 'lucide-react'
import './PageCommon.css'

const contactInfo = [
  { icon: <MapPin size={20}/>, label: 'Address', value: 'RISE Foundation, IISER Kolkata, West Bengal, India' },
  { icon: <Mail size={20}/>, label: 'Email', value: 'contact@canfinis.com', href: 'mailto:contact@canfinis.com' },
  { icon: <Phone size={20}/>, label: 'Phone', value: '+91 8861410623', href: 'tel:+918861410623' },
  { icon: <Clock size={20}/>, label: 'Working Hours', value: 'Mon–Sat: 9:00 AM – 7:00 PM | Sunday: Closed' },
  { icon: <Globe size={20}/>, label: 'Website', value: 'www.canfinis.com', href: 'https://canfinis.com' },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <main style={{ paddingTop: 76 }}>
      <section className="page-hero">
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="page-hero__content">
            <motion.span className="tag" variants={fadeUp}>Contact</motion.span>
            <motion.h1 className="page-hero__title" variants={fadeUp}>Get In Touch</motion.h1>
            <motion.p className="page-hero__desc" variants={fadeUp}>
              Reach out to discuss collaborations, partnerships, or learn more about
              CanFinis Therapeutics and our pioneering cancer research.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          {/* Info */}
          <motion.div className="contact-info"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {contactInfo.map(c => (
              <motion.div key={c.label} className="contact-info-item" variants={fadeLeft}>
                <div className="contact-info-item__icon">{c.icon}</div>
                <div>
                  <h4>{c.label}</h4>
                  {c.href ? <a href={c.href}>{c.value}</a> : <p>{c.value}</p>}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="contact-form">
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#003d5b', marginBottom: 24 }}>
                Send Us a Message
              </h3>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>✅</div>
                  <h4 style={{ color: '#003d5b', marginBottom: 8 }}>Message Sent!</h4>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group"><label>First Name *</label><input type="text" required placeholder="John" /></div>
                    <div className="form-group"><label>Last Name *</label><input type="text" required placeholder="Doe" /></div>
                  </div>
                  <div className="form-group"><label>Email *</label><input type="email" required placeholder="john@example.com" /></div>
                  <div className="form-group"><label>Organization</label><input type="text" placeholder="Your company / institution" /></div>
                  <div className="form-group">
                    <label>Purpose</label>
                    <select>
                      <option>General Inquiry</option>
                      <option>Research Collaboration</option>
                      <option>Business Partnership</option>
                      <option>Media / Press</option>
                      <option>Career Inquiry</option>
                    </select>
                  </div>
                  <div className="form-group"><label>Message *</label><textarea required placeholder="Tell us how we can help..." /></div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <Send size={16}/> Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <div style={{ height: 360 }}>
        <iframe
          title="CanFinis Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3676.898!2d88.520!3d22.962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89e3e6d39e6b1%3A0x1!2sIISER+Kolkata!5e0!3m2!1sen!2sin!4v1"
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
        />
      </div>
    </main>
  )
}
