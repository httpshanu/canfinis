import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import './Navbar.css'

const aboutLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/about#journey', label: 'Our Journey' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setAboutOpen(false) }, [pathname])

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img src="/logo.svg" alt="CanFinis Therapeutics" onError={e => { e.target.style.display='none' }} />
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links">
          <NavLink to="/" className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>

          <div className="nav-dropdown" onMouseEnter={()=>setAboutOpen(true)} onMouseLeave={()=>setAboutOpen(false)}>
            <span className={`nav-link ${pathname.startsWith('/about') ? 'active' : ''}`}>
              About Us <ChevronDown size={14} />
            </span>
            <AnimatePresence>
              {aboutOpen && (
                <motion.div className="dropdown-menu"
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
                  {aboutLinks.map(l => <Link key={l.to} to={l.to} className="dropdown-item">{l.label}</Link>)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/science" className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'}>Our Science</NavLink>
          <NavLink to="/cart-technology" className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'}>CAR-T Technology</NavLink>
          <NavLink to="/pipeline" className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'}>Pipeline</NavLink>
          <NavLink to="/services" className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'}>Services</NavLink>
          <NavLink to="/events" className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'}>Events</NavLink>
        </nav>

        <Link to="/contact" className="btn-primary navbar__cta">Get in Touch</Link>

        {/* Mobile toggle */}
        <button className="navbar__hamburger" onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="mobile-menu"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="mobile-menu__inner">
              {[['/', 'Home'], ['/about', 'About Us'], ['/science', 'Our Science'],
                ['/cart-technology', 'CAR-T Technology'], ['/pipeline', 'Pipeline'],
                ['/services', 'Services'], ['/events', 'Events & News'],
                ['/careers', 'Careers'], ['/contact', 'Contact Us']
              ].map(([to, label]) => (
                <NavLink key={to} to={to} className={({isActive})=> isActive ? 'mobile-link active' : 'mobile-link'}>{label}</NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
