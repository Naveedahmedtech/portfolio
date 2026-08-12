"use client";

import { useEffect, useRef, useState } from "react";

const areas = [
  {
    title: "Backend Systems",
    description:
      "APIs and application services built around clear contracts, reliable data flows, authentication, persistence, asynchronous work, and production failure handling.",
    technologies: "Node.js · TypeScript · NestJS · PostgreSQL",
    nodes: ["Request", "API", "Service", "Database"],
  },
  {
    title: "Developer Platforms & SDKs",
    description:
      "Developer-facing APIs, npm packages, integration contracts, documentation, and tooling designed to make complex products easier to embed and operate.",
    technologies: "SDKs · npm packages · API contracts · Developer Experience",
    nodes: ["Application", "SDK", "Platform"],
  },
  {
    title: "Integrations",
    description:
      "Systems that connect products across browser boundaries, external APIs, payments, scheduling platforms, and customer environments.",
    technologies: "PostMessage · REST APIs · Stripe · External APIs",
    nodes: ["System A", "Integration Layer", "System B", "Product"],
  },
  {
    title: "AI-enabled Backend Systems",
    description:
      "Backend architecture for personalized AI products involving persistent context, embeddings, vector retrieval, context construction, model APIs, and the reliability boundaries around them.",
    technologies: "PostgreSQL · pgvector · Embeddings · LLM APIs",
    nodes: ["Request", "Retrieval", "Context", "Model", "Response"],
  },
] as const;

export function FocusSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let frame = 0;
    const updateScene = () => {
      frame = 0;
      const bounds = stage.getBoundingClientRect();
      const scrollDistance = Math.max(stage.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-bounds.top / scrollDistance, 0), 1);
      const nextIndex = Math.min(areas.length - 1, Math.floor(progress * areas.length));

      stage.style.setProperty("--focus-progress", progress.toString());
      setActiveIndex((currentIndex) => currentIndex === nextIndex ? currentIndex : nextIndex);
    };
    const handleScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateScene);
    };

    updateScene();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  const activeArea = areas[activeIndex] ?? areas[0];

  return (
    <section className="focus-section section section-border" data-section="focus" aria-labelledby="focus-title">
      <div className="focus-heading" data-reveal>
        <p className="eyebrow">What I build</p>
        <h2 id="focus-title">Backend engineering across product, platform, and production boundaries.</h2>
      </div>

      <div className="focus-intro" data-reveal data-reveal-delay="1">
        <p className="section-intro">
          My work is centered on building the systems behind products — APIs, SDKs, integrations,
          data flows, background processing, and AI-enabled backend features. I care about the
          boundaries between systems: how they communicate, fail, scale, and remain understandable
          to the developers using them.
        </p>
      </div>

      <div className="focus-stage" ref={stageRef}>
        <div className="focus-scene">
          <div className="focus-scene-copy">
            <div className="focus-scene-index" aria-label={`Capability ${activeIndex + 1} of ${areas.length}`}>
              {areas.map((area, index) => (
                <span className={activeIndex === index ? "is-active" : ""} key={area.title}>
                  0{index + 1}
                </span>
              ))}
            </div>
            <div className="focus-active-copy" key={activeArea.title}>
              <p className="eyebrow">Engineering area / 0{activeIndex + 1}</p>
              <h3>{activeArea.title}</h3>
              <p>{activeArea.description}</p>
              <span className="metadata">{activeArea.technologies}</span>
            </div>
            <p className="focus-scroll-hint">Scroll to move through the system <span aria-hidden="true">↓</span></p>
          </div>

          <div className="focus-visual" aria-label={`${activeArea.title} system visual`}>
            <div className="sketch-label">SYSTEM / {activeArea.title.toUpperCase()}</div>
            <div className="focus-diagram" key={activeArea.title}>
              {activeArea.nodes.map((node, index) => (
                <div className="focus-diagram-step" key={node}>
                  <div className={`focus-diagram-node${index === 1 ? " is-accent" : ""}`}>{node}</div>
                  {index < activeArea.nodes.length - 1 && <div className="focus-diagram-line"><span /></div>}
                </div>
              ))}
            </div>
            <div className="sketch-meta">shared boundaries · evolving system</div>
          </div>
        </div>
      </div>

      <div className="focus-mobile-areas">
        {areas.map((area, index) => (
          <article className="focus-mobile-area" key={area.title}>
            <span className="focus-area-number">0{index + 1}</span>
            <div>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
              <span className="metadata">{area.technologies}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
