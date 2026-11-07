import { useEffect, useRef, useState } from 'react'
import { subscribe, clamp } from '../engine'

const items = [['home', 'Home'], ['about', 'About'], ['work', 'Work'], ['contact', 'Contact']]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const bar = useRef()
  useEffect(() => {
    const click = e => { if (!e.target.closest('.nav') || e.target.closest('[data-go]')) setOpen(false) }
    const key = e => e.key === 'Escape' && setOpen(false)
    document.addEventListener('click', click)
    addEventListener('keydown', key)
    return () => { document.removeEventListener('click', click); removeEventListener('keydown', key) }
  }, [])
  // Scroll progress bar + highlight the section currently on screen.
  useEffect(() => subscribe(({ y, vh }) => {
    const max = document.documentElement.scrollHeight - vh
    bar.current.style.transform = `scaleX(${clamp(y / max)})`
    const sc = document.getElementById('scene'), w = document.getElementById('work'), t = document.getElementById('talk')
    if (!sc || !w || !t) return
    const mid = y + vh / 2
    const k = mid >= t.offsetTop ? 'contact' : mid >= w.offsetTop ? 'work' : y > sc.offsetTop + .45 * (sc.offsetHeight - vh) ? 'about' : 'home'
    setActive(a => (a === k ? a : k))
  }), [])
  return (
    <>
      <div className="progress" ref={bar} aria-hidden="true" />
      <header className="nav">
        <div className="pill">
          <span className="brand">Hassan Akbar</span>
          <nav className="navlinks" aria-label="Sections">
            {items.map(([k, t]) => (
              <button key={k} data-go={k} className={active === k ? 'on' : ''} aria-current={active === k ? 'true' : undefined}>{t}</button>
            ))}
          </nav>
          <button className="dots" aria-label="Menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(o => !o)}><i /><i /><i /></button>
        </div>
        <nav className="menu" id="menu" hidden={!open}>
          {items.map(([k, t], n) => (
            <button key={k} data-go={k} style={{ '--n': n }}><span>{t}</span><small>0{n + 1}</small></button>
          ))}
        </nav>
      </header>
    </>
  )
}
