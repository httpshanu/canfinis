import { Link } from 'react-router-dom'
import { Globe, Mail, Phone, MapPin } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">
          <div className="footer__brand">
            <span className="footer__logo-text">
              <span>Can</span><span style={{color:'#00a8cc'}}>Fin</span><span style={{color:'#e63946'}}>is</span>
            </span>
            <p style={{fontSize:'0.78rem',letterSpacing:'0.15em',color:'#94a3b8',textTransform:'uppercase',marginTop:2}}>THERAPEUTICS</p>
            <p style={{marginTop:16,fontSize:'0.9rem',color:'#94a3b8',lineHeight:1.7,maxWidth:260}}>
              Pioneering affordable CAR-T cell therapies and personalized cancer treatments for India and Southeast Asia.
            </p>
          </div>

          <div className="footer__col">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/about#journey">Our Journey</Link>
            <Link to="/science">Our Science</Link>
            <Link to="/cart-technology">CAR-T Technology</Link>
            <Link to="/pipeline">Pipeline</Link>
          </div>

          <div className="footer__col">
            <h4>Services</h4>
            <Link to="/services">Advanced Solutions</Link>
            <Link to="/events">Events & News</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          <div className="footer__col">
            <h4>Contact</h4>
            <a href="https://canfinis.com" target="_blank" rel="noreferrer"><Globe size={13}/> www.canfinis.com</a>
            <a href="mailto:contact@canfinis.com"><Mail size={13}/> contact@canfinis.com</a>
            <a href="tel:+918861410623"><Phone size={13}/> +91 8861410623</a>
            <span><MapPin size={13}/> Kolkata, West Bengal, India</span>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <div className="footer__info-bar">
            <span><Globe size={13}/> www.canfinis.com</span>
            <span>|</span>
            <span><Mail size={13}/> contact@canfinis.com</span>
            <span>|</span>
            <span><Phone size={13}/> +91 8861410623</span>
            <span>|</span>
            <span><MapPin size={13}/> Kolkata, West Bengal, India</span>
          </div>
          <p>© 2024 CANFINIS THERAPEUTICS — All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
