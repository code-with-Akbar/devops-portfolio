import { useEffect, useRef } from 'react'
import { subscribe } from '../engine'

// Edit your projects here.
const projects = [
  {
    title: 'AIOBISOFT ProjectFlow',
    tag: 'Docker · Jenkins · Argo CD · EKS',
    desc: 'Project tracking and financial management tool for agencies, studios and freelancers. I containerized it, built a Jenkins CI pipeline with Trivy scanning, deployed to Amazon EKS with Argo CD GitOps, and set up Prometheus and Grafana monitoring.',
    bg: 'linear-gradient(135deg,#e8590c,#2b6cff)', wbg: '#f3f1ec', wc: '#0f3d2e',
  },
  {
    title: 'Knodify LMS',
    tag: 'Docker · Jenkins · Argo CD · EKS',
    desc: 'Learning management platform with courses, virtual classrooms and attendance tracking. I automated build, scan and push in Jenkins, delivered releases to EKS through Argo CD, and built Prometheus and Grafana dashboards and alert rules.',
    bg: 'linear-gradient(135deg,#1f8a70,#0b3d2e)', wbg: '#171717', wc: '#f1eee8',
  },
]

export default function Work() {
  const thumbs = useRef([])
  useEffect(() => subscribe(({ vh }) => {
    thumbs.current.forEach(t => {
      const r = t.parentNode.getBoundingClientRect()
      t.style.transform = `translate3d(0,${(r.top + r.height / 2 - vh / 2) * -.07}px,0) scale(1.06)`
    })
  }), [])
  return (
    <section className="sec" id="work">
      <div className="head" data-reveal>
        <h2 className="h2">Featured<br />Projects</h2>
        <button className="all" data-go="contact">Get in touch <i>↗</i></button>
      </div>
      <div className="grid">
        {projects.map((p, i) => (
          <div className="pwrap" key={p.title} data-reveal style={{ '--d': i }}>
            <article className="proj" data-hover>
              <div className="thumb" ref={el => (thumbs.current[i] = el)} style={{ background: p.bg }}>
                <div className="win" style={{ background: p.wbg, color: p.wc }}><b>{p.title}</b><span /><span /></div>
              </div>
              <div className="cap">{p.tag}</div>
            </article>
            <p className="pdesc">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
