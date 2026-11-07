const jobs = [
  {
    date: 'Apr 2026 – Present',
    title: 'DevOps Engineer at Solutionave',
    description: 'CI/CD with Jenkins and GitHub Actions, Trivy scanning, and Argo CD GitOps on Amazon EKS.',
    scene: 'city',
  },
  {
    date: 'Aug 2025 – Apr 2026',
    title: 'SQA Automation at Okrasoft',
    description: 'Automated regression tests for web modules, with defects tracked in Jira and Zephyr Scale.',
    scene: 'train',
  },
]

export default function Experience() {
  return (
    <section className="xp" aria-labelledby="xp-title">
      <div className="xp-head" data-reveal>
        <h2 className="h2" id="xp-title">Experience</h2>
        <div className="xp-brand" aria-label="Hassan Akbar">
          <span>Hassan Akbar</span>
          <span className="xp-dots" aria-hidden="true">•••</span>
        </div>
      </div>
      <div className="xp-grid">
        {jobs.map((job, i) => (
          <article className={`xp-card xp-card-${job.scene}`} key={job.title} data-reveal style={{ '--d': i }}>
            <div className={`xp-scene xp-scene-${job.scene}`} aria-hidden="true" />
            <div className="xp-copy">
              <time>{job.date}</time>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
            </div>
          </article>
        ))}
        <article className="xp-invite" data-reveal style={{ '--d': 2 }}>
          <p>Pipelines, clusters and monitoring—see what I’ve shipped</p>
          <button className="xp-link" data-go="work">
            View Projects <i aria-hidden="true">↗</i>
          </button>
        </article>
      </div>
    </section>
  )
}
