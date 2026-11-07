import { useCallback, useEffect, useRef, useState } from 'react'

const groups = [
  ['Cloud', ['AWS', 'EKS', 'EC2', 'VPC', 'IAM', 'RDS', 'ALB', 'S3', 'CloudWatch', 'Secrets Manager']],
  ['CI/CD & GitOps', ['Jenkins', 'GitHub Actions', 'Argo CD', 'Git', 'GitHub']],
  ['Containers', ['Docker', 'Amazon EKS', 'Helm']],
  ['Infrastructure as Code', ['Terraform']],
  ['Security', ['Trivy', 'IAM least privilege', 'SSL/TLS']],
  ['Monitoring', ['Prometheus', 'Grafana', 'Alertmanager', 'CloudWatch']],
  ['OS & Networking', ['Linux (Ubuntu)', 'Bash', 'Nginx', 'DNS']],
  ['Databases & Scripting', ['PostgreSQL', 'Amazon RDS', 'Python', 'Bash']],
]
const education = [
  ['BS Software Engineering', 'University of Mianwali', '2021 – 2025 · CGPA 3.44 / 4.00'],
  ['Intermediate in Computer Science', 'PGC Mianwali', '2019 – 2021 · 90%'],
]
const options = [...groups.map(([name]) => name), 'Education']

const still = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
const sleep = ms => new Promise(r => setTimeout(r, still ? 0 : ms))
const SPEED = 24 // ms per typed character

// Types its text out letter by letter.
function Typed({ text, onTick }) {
  const [n, setN] = useState(still ? text.length : 0)
  useEffect(() => {
    if (still) return
    let i = 0
    const id = setInterval(() => { i++; setN(i); onTick?.(); if (i >= text.length) clearInterval(id) }, SPEED)
    return () => clearInterval(id)
  }, [text])
  return <>{text.slice(0, n)}{n < text.length && <span className="caret" />}</>
}

function Robot({ mood }) {
  return (
    <svg className={`rb rb-${mood}`} viewBox="0 0 240 290" role="img" aria-label="Friendly robot">
      <defs>
        <linearGradient id="rbBody" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f6f6fb" /><stop offset="1" stopColor="#b9b9cc" /></linearGradient>
        <linearGradient id="rbDark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d1d26" /><stop offset="1" stopColor="#0d0d12" /></linearGradient>
      </defs>
      <ellipse className="rb-shadow" cx="120" cy="272" rx="58" ry="9" />
      <g className="rb-float">
        <g className="rb-body">
          <rect x="72" y="152" width="96" height="92" rx="28" fill="url(#rbBody)" />
          <rect x="94" y="244" width="22" height="16" rx="6" fill="#8a8a9c" /><rect x="124" y="244" width="22" height="16" rx="6" fill="#8a8a9c" />
          <circle cx="120" cy="196" r="17" fill="url(#rbDark)" />
          <circle className="rb-core" cx="120" cy="196" r="7" />
          <rect x="105" y="143" width="30" height="12" rx="5" fill="#8a8a9c" />
          <g className="rb-arm-l"><rect x="46" y="162" width="22" height="64" rx="11" fill="url(#rbBody)" /><circle cx="57" cy="228" r="11" fill="#8a8a9c" /></g>
          <g className="rb-arm-r"><rect x="172" y="162" width="22" height="64" rx="11" fill="url(#rbBody)" /><circle cx="183" cy="228" r="11" fill="#8a8a9c" /></g>
        </g>
        <g className="rb-head">
          <line x1="120" y1="40" x2="120" y2="18" stroke="#8a8a9c" strokeWidth="4" strokeLinecap="round" />
          <circle className="rb-ant" cx="120" cy="13" r="8" />
          <rect x="44" y="76" width="14" height="32" rx="7" fill="#8a8a9c" /><rect x="182" y="76" width="14" height="32" rx="7" fill="#8a8a9c" />
          <rect x="56" y="40" width="128" height="104" rx="36" fill="url(#rbBody)" />
          <rect x="70" y="58" width="100" height="68" rx="26" fill="url(#rbDark)" />
          <g className="rb-eyes">
            <ellipse className="rb-eye" cx="100" cy="86" rx="9" ry="12" /><ellipse className="rb-eye" cx="140" cy="86" rx="9" ry="12" />
          </g>
          <rect className="rb-mouth" x="107" y="108" width="26" height="5" rx="2.5" />
          <circle cx="82" cy="104" r="5" className="rb-blush" /><circle cx="158" cy="104" r="5" className="rb-blush" />
        </g>
      </g>
    </svg>
  )
}

export default function Skills() {
  const root = useRef(), log = useRef(), alive = useRef(true), busy = useRef(false)
  const [started, setStarted] = useState(false)
  const [msgs, setMsgs] = useState([])
  const [typing, setTyping] = useState(false)
  const [mood, setMood] = useState('idle')
  const [asked, setAsked] = useState([])
  const [ready, setReady] = useState(false)

  useEffect(() => { alive.current = true; return () => { alive.current = false } }, [])
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect() } }, { threshold: .35 })
    io.observe(root.current)
    return () => io.disconnect()
  }, [])

  const down = useCallback(() => log.current?.scrollTo({ top: log.current.scrollHeight, behavior: still ? 'auto' : 'smooth' }), [])
  useEffect(() => { down() }, [msgs, typing, down])

  // The robot "thinks", then types a message. Resolves once the message has finished typing.
  const say = async (m, think = 650) => {
    if (!alive.current) return
    setTyping(true); setMood('talk')
    await sleep(think)
    if (!alive.current) return
    setTyping(false)
    setMsgs(a => [...a, { from: 'bot', ...m }])
    await sleep((m.text.length * SPEED) + (m.items ? m.items.length * 70 + 300 : 250))
    if (alive.current) setMood('idle')
  }

  useEffect(() => {
    if (!started) return
    ;(async () => {
      busy.current = true
      setMood('wave')
      await sleep(500)
      await say({ text: 'Hello! 👋 I’m SkillBot.' }, 500)
      await say({ text: 'Pick a topic below and I’ll tell you what Hassan works with.' }, 600)
      if (!alive.current) return
      busy.current = false; setReady(true)
    })()
  }, [started])

  const ask = async name => {
    if (busy.current) return
    busy.current = true
    setAsked(a => (a.includes(name) ? a : [...a, name]))
    setMsgs(a => [...a, { from: 'user', text: name }])
    if (name === 'Education') {
      await say({ text: 'Here’s Hassan’s education:', edu: education })
    } else {
      const items = groups.find(g => g[0] === name)[1]
      await say({ text: `Here’s what Hassan uses for ${name}:`, items })
    }
    busy.current = false
  }

  const restart = async () => {
    if (busy.current) return
    busy.current = true
    setMsgs([]); setAsked([])
    await say({ text: 'Fresh start! What would you like to know?' }, 500)
    busy.current = false
  }

  return (
    <section className="skills" aria-labelledby="skills-title" ref={root}>
      <h2 className="h2" id="skills-title" data-reveal>Skills &amp;<br />Education</h2>
      <div className={`bot${started ? ' on' : ''}`}>
        <div className="bot-stage">
          <span className="bot-hello">Hello!</span>
          <div className="bot-glow" />
          <Robot mood={mood} />
        </div>
        <div className="bot-chat">
          <header className="bot-bar">
            <span className="bot-av" aria-hidden="true"><i /><i /></span>
            <div><b>SkillBot</b><small><i />online</small></div>
            <button className="bot-reset" onClick={restart} aria-label="Restart chat">↺</button>
          </header>
          <div className="bot-log" ref={log} role="log" aria-live="polite">
            {msgs.map((m, i) => (
              <div className={`msg msg-${m.from}`} key={i}>
                <div className="bub">
                  {m.from === 'bot' ? <Typed text={m.text} onTick={down} /> : m.text}
                  {m.items && (
                    <ul className="chips" style={{ '--base': `${m.text.length * SPEED}ms` }}>
                      {m.items.map((it, k) => <li key={it + k} style={{ '--k': k }}>{it}</li>)}
                    </ul>
                  )}
                  {m.edu && (
                    <div className="edu" style={{ '--base': `${m.text.length * SPEED}ms` }}>
                      {m.edu.map(([deg, school, meta], k) => (
                        <div className="edu-c" key={deg} style={{ '--k': k }}><b>{deg}</b><span>{school}</span><em>{meta}</em></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && <div className="msg msg-bot"><div className="bub dots-t" aria-label="SkillBot is typing"><i /><i /><i /></div></div>}
          </div>
          <div className={`bot-opts${ready ? ' ready' : ''}`}>
            <p>{ready ? 'Ask me about…' : '…'}</p>
            <div>
              {options.map((o, i) => (
                <button key={o} className={asked.includes(o) ? 'asked' : ''} style={{ '--i': i }}
                  onClick={() => ask(o)}>{asked.includes(o) && '✓ '}{o}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
