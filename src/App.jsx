import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Science from './pages/Science'
import CARTTech from './pages/CARTTech'
import Pipeline from './pages/Pipeline'
import Services from './pages/Services'
import Events from './pages/Events'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/science" element={<Science />} />
        <Route path="/cart-technology" element={<CARTTech />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/services" element={<Services />} />
        <Route path="/events" element={<Events />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
