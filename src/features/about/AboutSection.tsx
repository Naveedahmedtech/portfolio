const principles = [
  {
    number: "01",
    title: "Understand the boundary",
    copy: "Most difficult production problems happen between systems — APIs, browsers, databases, external services, customer environments, or model providers.",
    concepts: "contracts · ownership · failure boundaries · communication",
  },
  {
    number: "02",
    title: "Prefer evidence",
    copy: "When performance, reliability, or architecture is uncertain, I prefer experiments, logs, query plans, measurements, and reproducible failures over assumptions.",
    concepts: "measure · observe · debug · verify",
  },
  {
    number: "03",
    title: "Keep architecture proportional",
    copy: "I like clean architecture and clear boundaries, but I do not believe every product needs microservices, queues, caches, or complex infrastructure.",
    concepts: "simple first · add complexity when justified",
  },
  {
    number: "04",
    title: "Own the outcome",
    copy: "Engineering work is not finished when code compiles. Documentation, integration experience, failure handling, deployment, and communication are part of the product.",
    concepts: "production · developer experience · delivery · communication",
  },
] as const;

export function AboutSection() {
  return (
    <section className="about-section section section-border" id="about" data-section="about" aria-labelledby="about-title">
      <div className="about-heading" data-reveal>
        <p className="eyebrow">About</p>
        <h2 id="about-title">I care more about understanding systems than collecting technologies.</h2>
      </div>

      <div className="about-main" data-reveal data-reveal-delay="1">
        <div className="about-story">
          <p className="section-intro">I’m Naveed Ahmed, a Backend / Product Engineer based in Islamabad. I started by building web products and gradually moved deeper into backend systems, integrations, SDKs, databases, and production engineering.</p>
          <p className="section-intro">Today, I work on developer-facing integrations at Rasterex and build PlayLight with my co-founder, where I own much of the backend and technical architecture.</p>
          <p className="section-intro">Alongside application engineering, I work with Docker, Linux, AWS/Azure, CI/CD, and observability to help production systems ship and remain understandable.</p>
          <p className="section-intro">My long-term direction is toward production, platform, systems, and performance engineering — while keeping strong product instincts and the ability to ship useful software.</p>
          <p className="metadata">Education · Higher Secondary School Certificate (Pre-Engineering), Model Science College · 2019 — 2021</p>
        </div>

        <div className="about-method" aria-label="Engineering method">
          <span className="metadata">Working loop</span>
          <ol>
            {['Build', 'Understand', 'Measure', 'Explain', 'Improve'].map((step, index) => (
              <li key={step} className={index === 4 ? 'is-final' : undefined}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <b>{step}</b>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="about-principles">
        {principles.map((principle) => (
          <article className="about-principle" data-reveal key={principle.number}>
            <span className="about-principle-number">{principle.number}</span>
            <div>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
              <span className="metadata">{principle.concepts}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="about-direction" data-reveal>
        <div>
          <p className="eyebrow">Where I’m going</p>
          <ol className="about-direction-path" aria-label="Backend to systems engineering direction">
            <li className="about-direction-step">
              <span className="about-direction-marker">01</span>
              <span>Backend</span>
            </li>
            <li className="about-direction-step">
              <span className="about-direction-marker">02</span>
              <span>Production / Platform</span>
            </li>
            <li className="about-direction-step is-current">
              <span className="about-direction-marker">03</span>
              <span>Systems / Performance</span>
            </li>
          </ol>
        </div>
        <div className="about-direction-copy">
          <p>I’m deliberately deepening my understanding of Node.js runtime behavior, PostgreSQL, networking, reliability, distributed-system fundamentals, and lower-level systems concepts while continuing to build production backend products.</p>
          <p><span className="metadata">Systems depth</span>I also study C and lower-level systems concepts to strengthen my understanding of memory, processes, files, sockets, and the abstractions underneath the backend runtimes I use every day.</p>
        </div>
      </div>

      <div className="about-ai" data-reveal>
        <span className="metadata">AI positioning</span>
        <p>I’m interested in AI as a backend engineering problem: retrieval, data ownership, context construction, evaluation, security, cost, and reliability — not as a replacement for strong software engineering.</p>
      </div>
    </section>
  );
}
