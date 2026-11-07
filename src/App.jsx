import { useEffect } from 'react'
import { go } from './engine'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Statement from './components/Statement'
import Work from './components/Work'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Talk from './components/Talk'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import WhatsApp from './components/WhatsApp'

export default function App() {
  // Any element with data-go="home|about|work|contact" scrolls to that section.
  useEffect(() => {
    const h = e => { const b = e.target.closest('[data-go]'); if (b) go(b.dataset.go) }
    document.addEventListener('click', h)
    return () => document.removeEventListener('click', h)
  }, [])
  // Elements with data-reveal fade/slide in once when they scroll into view.
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { threshold: .15, rootMargin: '0px 0px -6% 0px' })
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <>
      <Nav />
      <main><Hero /><Statement /><Work /><Experience /><Skills /><Talk /></main>
      <Footer />
      <WhatsApp />
      <Cursor />
    </>
  )
}
