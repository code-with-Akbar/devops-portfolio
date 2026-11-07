const EMAIL = 'hb2339124@gmail.com'
const links = [['home', 'Home'], ['about', 'About me'], ['work', 'Work'], ['contact', 'Contact']]
const connect = [
  ['LinkedIn', 'https://www.linkedin.com/in/hassan-akbar-411562375/'],
  ['GitHub', 'https://github.com/code-with-Akbar'],
  ['WhatsApp', 'https://wa.me/923157539293'],
  ['Email', `mailto:${EMAIL}`],
]
const stack = ['AWS', 'Amazon EKS', 'Docker', 'Jenkins', 'Argo CD', 'Terraform', 'Helm', 'Prometheus', 'Grafana', 'Trivy', 'GitHub Actions', 'Linux']

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot-glow" aria-hidden="true" />

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map(n => stack.map(s => <span key={n + s}>{s}<i>✦</i></span>))}
        </div>
      </div>

      <div className="foot-main">
        <div className="foot-cta" data-reveal>
          <p className="kicker"><i />Open to opportunities</p>
          <h3>Pipelines built to ship.</h3>
          <a className="foot-mail" href={`mailto:${EMAIL}`}>
            <span>{EMAIL}</span><i aria-hidden="true">↗</i>
          </a>
        </div>

        <div className="foot-cols">
          <div data-reveal style={{ '--d': 1 }}>
            <h4>Quick links</h4>
            <ul>{links.map(([k, t]) => <li key={k}><button data-go={k}>{t}</button></li>)}</ul>
          </div>
          <div data-reveal style={{ '--d': 2 }}>
            <h4>Connect</h4>
            <ul>{connect.map(([t, href]) => (
              <li key={t}><a href={href} target="_blank" rel="noopener noreferrer">{t}<i aria-hidden="true">↗</i></a></li>
            ))}</ul>
          </div>
          <div data-reveal style={{ '--d': 3 }}>
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+923157539293">(+92) 315 7539293</a></li>
              <li><span>Islamabad, Pakistan</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mark" aria-hidden="true" data-reveal>Hassan Akbar</div>

      <div className="foot-bar">
        <span>© 2026 Hassan Akbar · DevOps Engineer</span>
        <button className="totop" data-go="home">Back to top <i aria-hidden="true">↑</i></button>
      </div>
    </footer>
  )
}
