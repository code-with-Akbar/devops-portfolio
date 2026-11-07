import { useEffect, useRef, useState } from 'react'

const EMAIL = 'hb2339124@gmail.com'
const PHONE = '+923157539293'
const channels = [
  ['Email', EMAIL, `mailto:${EMAIL}`, [<rect key="a" x="3" y="5" width="18" height="14" rx="3" />, <path key="b" d="M3.5 7.5l8.5 6 8.5-6" />]],
  ['WhatsApp', '(+92) 315 7539293', `https://wa.me/${PHONE.slice(1)}`, <path key="a" d="M4 20l1.4-4.2A8 8 0 1 1 8.4 18.8L4 20zM9 9.5c.3 2.5 2.7 5 5.5 5.5l1.2-1.2-2-1-.8.7a4 4 0 0 1-2-2l.7-.8-1-2L9 9.5z" />],
  ['LinkedIn', 'hassan-akbar', 'https://www.linkedin.com/in/hassan-akbar-411562375/', <path key="a" d="M5 10v9M5 5.5v.01M10 19v-9M10 13a3.5 3.5 0 017 0v6" />],
  ['GitHub', 'code-with-Akbar', 'https://github.com/code-with-Akbar', <path key="a" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />],
]
// The "CI/CD pipeline" a message goes through before it opens in your email app.
const STEPS = [['Build', 'Packing your message'], ['Test', 'Checking the details'], ['Scan', 'Trivy: 0 vulnerabilities'], ['Deploy', 'Opening your email app']]

const still = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
const sleep = ms => new Promise(r => setTimeout(r, still ? 0 : ms))

export default function Talk() {
  const form = useRef(), alive = useRef(true)
  const [step, setStep] = useState(-1) // -1 idle · 0-3 running a stage · 4 finished
  useEffect(() => { alive.current = true; return () => { alive.current = false } }, [])

  const read = () => Object.fromEntries(new FormData(form.current))

  // No backend: after the little pipeline animation this opens the visitor's email app, message filled in.
  const submit = async e => {
    e.preventDefault()
    const { fn, fe, fp } = read()
    for (let i = 0; i < STEPS.length; i++) {
      if (!alive.current) return
      setStep(i)
      await sleep(i === 3 ? 800 : 720)
    }
    if (!alive.current) return
    setStep(4)
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Project enquiry from ' + fn)}&body=${encodeURIComponent(`${fp}\n\n— ${fn}\n${fe}`)}`
  }
  const whatsapp = () => {
    const { fn, fp } = read()
    const text = `Hi Hassan${fn ? ', I’m ' + fn : ''}. ${fp || 'I’d like to talk about a project.'}`
    window.open(`https://wa.me/${PHONE.slice(1)}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }
  const running = step >= 0 && step < 4

  return (
    <section className="talk" id="talk">
      <div className="tk-l" data-reveal>
        <h2 className="h2">Let’s talk.</h2>
        <p>Have a project or need DevOps help? Ship me a message and I’ll get back to you soon.</p>
        <ul className="tk-ch">
          {channels.map(([name, value, href, icon], i) => (
            <li key={name} style={{ '--k': i }}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <span className="tk-ic"><svg viewBox="0 0 24 24" aria-hidden="true">{icon}</svg></span>
                <span className="tk-tx"><b>{name}</b><small>{value}</small></span>
                <i aria-hidden="true">↗</i>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="tk-win" data-reveal style={{ '--d': 1 }}>
        <div className="tk-top">
          <span className="tk-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="tk-title">hassan@portfolio: ~/contact</span>
        </div>
        <form ref={form} onSubmit={submit}>
          <fieldset disabled={running}>
            <p className="tk-cmd"><em>$</em> cat welcome.txt</p>
            <p className="tk-out">Drop your details below, then run the deploy script.</p>
            <label className="tk-row"><span>name<b>:</b></span><input name="fn" required placeholder="your name" autoComplete="name" /></label>
            <label className="tk-row"><span>email<b>:</b></span><input name="fe" type="email" required placeholder="you@company.com" autoComplete="email" /></label>
            <label className="tk-row tk-area"><span>message<b>:</b></span><textarea name="fp" required rows="4" placeholder="tell me about your project…" /></label>
            <div className="tk-btns">
              <button type="submit" className="tk-run"><em>$</em> ./deploy.sh<span className="tk-caret" aria-hidden="true" /></button>
              <button type="button" className="tk-wa" onClick={whatsapp}>or WhatsApp <i aria-hidden="true">↗</i></button>
            </div>
          </fieldset>

          <ol className={`tk-pipe${step >= 0 ? ' show' : ''}`} aria-live="polite">
            {STEPS.map(([name, note], i) => (
              <li key={name} className={step > i ? 'done' : step === i ? 'now' : ''}>
                <span className="tk-node">{step > i ? '✓' : ''}</span>
                <b>{name}</b><small>{note}</small>
              </li>
            ))}
          </ol>
          {step === 4 && (
            <p className="tk-ok">
              <span>✓</span> Deployed to production. If your email app didn’t open, write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              <button type="button" onClick={() => { setStep(-1); form.current.reset() }}>Send another</button>
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
