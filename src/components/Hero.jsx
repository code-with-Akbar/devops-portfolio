import { useEffect, useRef, useState } from 'react'
import { subscribe, clamp, lerp, ease } from '../engine'
import portrait from '../assets/portrait.jpg'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}#$%&*=+'
const still = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

// One letter: starts as flickering "terminal" glyphs, then locks onto the real letter.
// The real letter always sits in the DOM (invisible while scrambling) so the layout never jumps.
const Ch = ({ c, i }) => {
  const [fx, setFx] = useState(still ? null : GLYPHS[(i * 7) % GLYPHS.length])
  useEffect(() => {
    if (still) return
    let tick
    const start = setTimeout(() => {
      tick = setInterval(() => setFx(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]), 55)
    }, 250 + i * 60)
    const stop = setTimeout(() => { clearInterval(tick); setFx(null) }, 250 + i * 60 + 650)
    return () => { clearTimeout(start); clearTimeout(stop); clearInterval(tick) }
  }, [i])
  return (
    <span className="ch" style={{ '--i': i }}>
      <span className={fx === null ? 'real done' : 'real'}>{c}</span>
      {fx !== null && <span className="fx" aria-hidden="true">{fx}</span>}
    </span>
  )
}

// Splits a word into letters so each one can animate in with its own delay.
const Line = ({ text, start, last }) => (
  <span className={last ? 'ln last' : 'ln'} aria-hidden="true">
    {[...text].map((c, i) => <Ch c={c} i={start + i} key={i} />)}
  </span>
)

const Face = ({ cls }) => <div className={`face ${cls}`}><img src={portrait} alt="" draggable="false" /></div>

export default function Hero() {
  const scene = useRef(), hero = useRef(), card = useRef(), about = useRef(), hey = useRef()

  useEffect(() => {
    return subscribe(({ y, vh, vw }) => {
      const sc = scene.current
      const p = clamp((y - sc.offsetTop) / (sc.offsetHeight - vh))
      const mob = vw < 700, end = mob ? 2.3 : 2
      const y0 = .28 * vh, y1 = (mob ? -.03 : .03) * vh
      const rot = -180 * ease(clamp((p - .12) / .68))
      const ty = lerp(y0, y1, ease(clamp(p / .8)))
      const scale = lerp(1, end, ease(clamp((p - .25) / .6)))
      card.current.style.transform = `perspective(1400px) translate3d(0,${ty}px,0) scale(${scale}) rotateY(${rot}deg)`
      hero.current.style.transform = `translate3d(0,${-p * 1.3 * vh}px,0)`
      const a = ease(clamp((p - .5) / .45)), ab = about.current
      ab.style.opacity = a
      ab.style.transform = `translate3d(0,${(1 - a) * .45 * vh}px,0)`
      hey.current.style.transform = `translate3d(0,${(1 - a) * .25 * vh}px,0)`
      ab.classList.toggle('on', a > .6)
    })
  }, [])

  return (
    <section id="scene" ref={scene}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8b5cf6" /><stop offset=".55" stopColor="#d8d8e4" /><stop offset="1" stopColor="#7c7c8c" />
          </linearGradient>
          <symbol id="p" viewBox="0 0 200 228" preserveAspectRatio="xMidYMid slice">
            <path style={{ fill: 'var(--sil)' }} d="M10 228C16 172 56 148 100 148S184 172 190 228Z" />
            <circle style={{ fill: 'var(--sil)' }} cx="100" cy="92" r="44" />
            <g style={{ fill: 'none', stroke: 'var(--gl)', strokeWidth: 3 }}>
              <rect x="64" y="82" width="30" height="20" rx="6" /><rect x="106" y="82" width="30" height="20" rx="6" /><path d="M94 90h12" />
            </g>
          </symbol>
        </defs>
      </svg>
      <div className="stage">
        <div className="layer" ref={hero}>
          <h1 className="title" aria-label="DevOps Engineer"><Line text="DevOps" start={0} /><br /><Line text="Engineer" start={6} last /></h1>
          <div className="copy">©2026</div>
          <div className="hint" aria-hidden="true"><span>Scroll</span><i /></div>
          <div className="since">/Islamabad, Pakistan</div>
        </div>
        <div className="card" ref={card} role="img" aria-label="Portrait">
          <Face cls="front" /><Face cls="back" />
        </div>
        <div className="about" ref={about}>
          <div className="col-l">
            <h2 className="hey" ref={hey}>Hey!</h2>
            <p className="lead">I’m Hassan Akbar, a DevOps Engineer based in Islamabad, currently shipping CI/CD pipelines and Amazon EKS deployments at Solutionave.</p>
          </div>
          <div />
          <div className="col-r">
            <p>I build delivery pipelines, secure container images, and run GitOps workflows with Argo CD, with AWS infrastructure provisioned in Terraform.</p>
            <p>I deploy and operate workloads on Amazon EKS with Helm and keep them observable with Prometheus and Grafana.</p>
            <button className="go" data-go="contact">Get in touch <i>↗</i></button>
          </div>
        </div>
      </div>
    </section>
  )
}
