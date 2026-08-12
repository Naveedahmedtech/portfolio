import { MotionLayer } from "@/components/motion/MotionLayer";
import { FocusSection } from "@/features/focus/FocusSection";
import { RasterexSection } from "@/features/rasterex/RasterexSection";
import { PlayLightSection } from "@/features/playlight/PlayLightSection";
import { ExperienceSection } from "@/features/experience/ExperienceSection";
import { EngineeringThinkingSection } from "@/features/thinking/EngineeringThinkingSection";
import { AboutSection } from "@/features/about/AboutSection";
import { ContactSection } from "@/features/contact/ContactSection";
import { Footer } from "@/components/Footer";

const navigation = [
  ["Work", "#work"],
  ["Experience", "#experience"],
  ["Engineering", "#engineering"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

export default function HomePage() {
  return (
    <main>
      <MotionLayer />
      <header className="site-header">
        <a className="identity" href="#top" aria-label="Naveed Ahmed home">
          <span>Naveed Ahmed</span>
          <small>Backend / Product Engineer</small>
        </a>
        <nav className="desktop-navigation" aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </nav>
        <details className="mobile-navigation">
          <summary aria-label="Open navigation menu"><span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" /></summary>
          <nav aria-label="Mobile primary navigation">
            {navigation.map(([label, href]) => (
              <a key={label} href={href}>{label}</a>
            ))}
          </nav>
        </details>
      </header>

      <section className="hero" id="top" data-section="top" aria-labelledby="hero-title">
        <div className="hero-copy-block">
          <p className="eyebrow" data-reveal>Backend / Product Engineer</p>
          <h1 id="hero-title" data-reveal data-reveal-delay="1">I build backend systems that connect products, developers, data, and AI.</h1>
          <p className="hero-copy" data-reveal data-reveal-delay="2">
            I’m Naveed Ahmed, a Backend / Product Engineer working with Node.js, TypeScript,
            NestJS, and PostgreSQL. I build APIs, SDKs, integrations, and production systems —
            from enterprise document-viewing integrations at Rasterex to personalized AI
            infrastructure at PlayLight.
          </p>
          <div className="hero-actions" data-reveal data-reveal-delay="3">
            <a className="button" href="#work">
              Explore my work <span aria-hidden="true">→</span>
            </a>
            <a className="text-link" href="mailto:technaveedahmed@gmail.com">
              Get in touch
            </a>
          </div>
          <div className="hero-metadata" data-reveal data-reveal-delay="3" aria-label="Core technologies">
            <span>Node.js</span>
            <span>TypeScript</span>
            <span>NestJS</span>
            <span>PostgreSQL</span>
            <span>SDKs</span>
            <span>AI Backend</span>
          </div>
        </div>
        <div className="system-sketch" data-reveal data-reveal-delay="2" aria-label="A simplified system flow from product client through an API boundary to data, service, and result" role="img">
          <div className="sketch-label">SYSTEM / REQUEST FLOW</div>
          <div className="hero-diagram">
            <div className="hero-diagram-node">Product / Client</div>
            <div className="hero-diagram-connector"><small>request</small><span className="data-signal" /></div>
            <div className="hero-diagram-node is-accent">API Boundary</div>
            <div className="hero-diagram-connector"><small>route</small><span className="data-signal data-signal-delay" /></div>
            <div className="hero-diagram-node">Service</div>
            <div className="hero-diagram-connector"><small>context</small><span className="data-signal data-signal-delay-two" /></div>
            <div className="hero-diagram-node">Data / Context</div>
            <div className="hero-diagram-connector"><small>result</small><span className="data-signal data-signal-delay-three" /></div>
            <div className="hero-diagram-node is-result">Useful Result</div>
          </div>
          <div className="sketch-meta">requests · boundaries · useful outcomes</div>
        </div>
      </section>

      <FocusSection />

      <RasterexSection />

      <PlayLightSection />

      <ExperienceSection />

      <EngineeringThinkingSection />

      <AboutSection />

      <ContactSection />

      <Footer />

    </main>
  );
}
