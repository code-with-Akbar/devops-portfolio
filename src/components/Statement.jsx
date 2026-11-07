import { useEffect, useRef } from 'react'
import { subscribe, clamp } from '../engine'

const TEXT = 'From commit to cluster. Automated pipelines, secure containers and GitOps deployments on Amazon EKS, built to ship fast, stay observable, and hold up in production.'
const words = TEXT.split(' ')

export default function Statement() {
  const sec = useRef(), ws = useRef([])
  useEffect(() => subscribe(({ y, vh }) => {
    const p = clamp((y - sec.current.offsetTop) / (sec.current.offsetHeight - vh)), n = words.length
    ws.current.forEach((el, i) => { el.style.opacity = (.16 + .84 * clamp(p * 1.2 * n - i)).toFixed(3) })
  }), [])
  return (
    <section id="statement" ref={sec}>
      <div className="in">
        <p className="st">{words.map((w, i) => <span key={i} className="w" ref={el => (ws.current[i] = el)}>{w}{' '}</span>)}</p>
      </div>
    </section>
  )
}
