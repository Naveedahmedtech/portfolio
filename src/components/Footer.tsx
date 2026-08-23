const navigation = [
  ["Work", "#work"],
  ["Experience", "#experience"],
  ["Engineering", "#engineering"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-identity">
          <a className="footer-name" href="#top">Naveed Ahmed</a>
          <p className="footer-role">Backend / Product Engineer</p>
          <p className="footer-description">Building backend systems, developer platforms, integrations, and AI-enabled products.</p>
        </div>

        <div className="footer-column">
          <span className="metadata">Navigation</span>
          <nav aria-label="Footer navigation">
            {navigation.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
          </nav>
        </div>

        <div className="footer-column">
          <span className="metadata">Elsewhere</span>
          <div className="footer-links">
            <a href="https://github.com/Naveedahmedtech" rel="noreferrer" target="_blank">GitHub <span aria-hidden="true">↗</span></a>
            <a href="https://www.linkedin.com/in/naveed-dev" rel="noreferrer" target="_blank">LinkedIn <span aria-hidden="true">↗</span></a>
            <a href="mailto:technaveedahmed@gmail.com">Email <span aria-hidden="true">↗</span></a>
            <a href="/resume.pdf" download type="application/pdf">Download résumé <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </div>

      <div className="footer-status">
        <span className="availability"><i aria-hidden="true" /> Open to remote, international opportunities, and relocation</span>
      </div>

      <div className="footer-bottom">
        <span>© {year} Naveed Ahmed</span>
        <span>Islamabad, Pakistan</span>
      </div>
    </footer>
  );
}
