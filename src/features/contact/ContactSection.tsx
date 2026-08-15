export function ContactSection() {
  return (
    <section className="contact-section section section-border" id="contact" data-section="contact" aria-labelledby="contact-title">
      <div className="contact-heading" data-reveal>
        <p className="eyebrow">Let’s talk</p>
        <h2 id="contact-title">Looking for a backend engineer who can own more than just endpoints?</h2>
      </div>

      <div className="contact-content" data-reveal data-reveal-delay="1">
        <p className="section-intro">
          I’m open to backend, product engineering, developer-platform, integration, and selected AI-backend opportunities. If you’re building a serious product and think my experience could be useful, I’d be glad to talk.
        </p>
        <a className="contact-cta" href="mailto:technaveedahmed@gmail.com">
          Email me <span aria-hidden="true">→</span>
        </a>
        <a className="contact-email" href="mailto:technaveedahmed@gmail.com">technaveedahmed@gmail.com</a>
        <a className="contact-resume text-link" href="/resume.pdf" download type="application/pdf">
          Download résumé <span aria-hidden="true">↓</span>
        </a>
        <div className="contact-meta">
          <span className="availability"><i aria-hidden="true" /> Open to remote, international opportunities, and relocation</span>
          <span>Backend Engineering · Product Engineering · Developer Platforms · SDK / Integrations · AI Backend</span>
        </div>
      </div>
    </section>
  );
}
