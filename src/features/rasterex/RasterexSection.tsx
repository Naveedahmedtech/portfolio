"use client";

import { useEffect, useRef, useState } from "react";

const stages = [
  {
    label: "Integration",
    title: "One viewer. Different customer applications.",
    copy: "Customers need to embed Rasterex inside applications built with different frameworks and architectures. The integration layer therefore cannot depend on React, Angular, or any specific frontend framework.",
    nodes: ["React / Angular / Vanilla", "Framework-independent SDK", "Rasterex"],
  },
  {
    label: "SDK + Communication",
    title: "A clear SDK contract across the browser boundary.",
    copy: "I work on the @rasterex/viewer JavaScript/TypeScript npm SDK and its iframe/PostMessage communication contract, giving developers a clearer surface for viewer lifecycle, document operations, commands, events, and errors.",
    nodes: ["Customer Application", "@rasterex/viewer + PostMessage", "Rasterex Viewer"],
  },
  {
    label: "Developer Experience + Production",
    title: "An SDK has to be understandable in production.",
    copy: "I work on documentation, GitHub examples, installation guidance, and customer integrations, reproducing issues across application code, browser behavior, configuration, deployment, and the viewer boundary — then turning those findings into fixes or clearer contracts.",
    nodes: ["SDK", "Types · Examples · Docs", "Customer Integration"],
  },
  {
    label: "Delivery",
    title: "Integration continues beyond the npm package.",
    copy: "My work also touches package and installer delivery for customer-managed environments, where deployment assumptions, configuration, updates, and integration constraints matter as much as the SDK itself.",
    nodes: ["Package", "Customer Environment", "Updated Product"],
  },
] as const;

function Architecture({ stage }: { stage: (typeof stages)[number] }) {
  return (
    <div className="rasterex-architecture" key={stage.label}>
      {stage.nodes.map((node, index) => (
        <div className="rasterex-node-step" key={node}>
          <div className={`rasterex-node${index === 1 ? " is-accent" : ""}`}>{node}</div>
          {index < stage.nodes.length - 1 && (
            <div className="rasterex-connector">
              <span className={index === 0 ? "rasterex-signal" : ""} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function RasterexSection() {
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
      const nextIndex = Math.min(stages.length - 1, Math.floor(progress * stages.length));
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

  const activeStage = stages[activeIndex] ?? stages[0];

  return (
    <section className="rasterex-section section section-border" id="work" data-section="work" aria-labelledby="rasterex-title">
      <div className="rasterex-heading" data-reveal>
        <p className="eyebrow">Production Engineering</p>
        <p className="rasterex-company">Rasterex Software AS · Oslo, Norway</p>
        <p className="metadata">Backend Software Engineer · Aridian Technologies LLC</p>
        <h2 id="rasterex-title">Building the SDK and integration layer between customer applications and Rasterex.</h2>
      </div>
      <p className="section-intro rasterex-intro" data-reveal data-reveal-delay="1">
        Rasterex builds embedded viewing technology for CAD, BIM, PDF, and other technical documents. My work focuses on the developer-facing integration layer — helping applications embed, control, communicate with, and deploy the viewer through a clearer SDK and integration contract.
      </p>

      <div className="rasterex-stage" ref={stageRef}>
        <div className="rasterex-scene" aria-hidden="true">
          <div className="rasterex-story">
            <div className="rasterex-stage-index">
              {stages.map((stage, index) => (
                <span className={activeIndex === index ? "is-active" : ""} key={stage.label}>0{index + 1}</span>
              ))}
            </div>
            <div className="rasterex-active-copy" key={activeStage.label}>
              <p className="eyebrow">0{activeIndex + 1} / {activeStage.label}</p>
              <h3>{activeStage.title}</h3>
              <p>{activeStage.copy}</p>
            </div>
            <p className="rasterex-scroll-hint">Scroll to inspect the integration <span aria-hidden="true">↓</span></p>
          </div>
          <div className="rasterex-visual" aria-label={`${activeStage.label} Rasterex architecture visual`}>
            <div className="sketch-label">RASTEREX / ARCHITECTURE</div>
            <Architecture stage={activeStage} />
            <div className="sketch-meta">sanitized production boundary · conceptual system</div>
          </div>
        </div>
      </div>

      <div className="rasterex-mobile-stages">
        {stages.map((stage, index) => (
          <article className="rasterex-mobile-stage" key={stage.label}>
            <p className="eyebrow">0{index + 1} / {stage.label}</p>
            <h3>{stage.title}</h3>
            <p>{stage.copy}</p>
            <Architecture stage={stage} />
          </article>
        ))}
      </div>

      <div className="rasterex-metadata" aria-label="Rasterex engineering concepts">
        <span>TypeScript</span><span>JavaScript</span><span>npm</span><span>SDK Design</span><span>PostMessage</span><span>iframe APIs</span><span>Integration Contracts</span><span>Developer Experience</span>
      </div>
    </section>
  );
}
