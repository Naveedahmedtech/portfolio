import { MotionLayer } from "@/components/motion/MotionLayer";
import { FocusSection } from "@/features/focus/FocusSection";
import { RasterexSection } from "@/features/rasterex/RasterexSection";
import { PlayLightSection } from "@/features/playlight/PlayLightSection";
import { ExperienceSection } from "@/features/experience/ExperienceSection";
import { EngineeringThinkingSection } from "@/features/thinking/EngineeringThinkingSection";
import { AboutSection } from "@/features/about/AboutSection";
import { ContactSection } from "@/features/contact/ContactSection";
import { Footer } from "@/components/Footer";

const navigation = ["Work", "Experience", "Engineering", "About", "Contact"] as const;

export default function HomePage() {
  return (
    <main>
      <MotionLayer />
      <header className="site-header">
        <a className="identity" href="#top" aria-label="Naveed Ahmed home">
          <span>Naveed Ahmed</span>
          <small>Backend / Product Engineer</small>
        </a>
        <nav aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
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
        <div className="system-sketch" data-reveal data-reveal-delay="2" aria-label="A simplified system flow from client to API, data, service, and output" role="img">
          <div className="sketch-label">SYSTEM / REQUEST FLOW</div>
          <div className="diagram diagram-desktop">
            <div className="diagram-node diagram-client">Client</div>
            <div className="diagram-connector connector-client-api"><span className="data-signal" /></div>
            <div className="diagram-node diagram-api">API</div>
            <div className="diagram-branch">
              <div className="diagram-connector connector-api-data"><span /></div>
              <div className="diagram-connector connector-api-service"><span className="data-signal data-signal-delay" /></div>
            </div>
            <div className="diagram-node diagram-data">Data</div>
            <div className="diagram-node diagram-service">Service</div>
            <div className="diagram-connector connector-service-output"><span /></div>
            <div className="diagram-node diagram-output">Output</div>
          </div>
          <div className="diagram-mobile">
            <div className="diagram-node diagram-client">Client</div>
            <div className="diagram-connector"><span className="data-signal" /></div>
            <div className="diagram-node diagram-api">API</div>
            <div className="diagram-connector"><span /></div>
            <div className="diagram-node diagram-output">Output</div>
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
