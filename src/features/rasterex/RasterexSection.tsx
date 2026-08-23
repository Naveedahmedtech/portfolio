"use client";

import { useEffect, useRef, useState } from "react";

const stages = [
  {
    label: "The problem",
    title: "Customer customization was coupled to the delivered Rasterex Canvas.",
    copy:
      "Rasterex originally delivered a complete Canvas application together with three MSI components. Customers could customize code inside that delivered application. When Rasterex shipped a new feature or bug fix, updating the delivered Canvas could conflict with or overwrite those customer customizations, making upgrades harder to manage.",
    nodes: [
      "Rasterex Canvas + UI",
      "Customer customization inside Canvas",
      "Upgrade conflicts",
    ],
  },
  {
    label: "Architecture change",
    title: "We separated the Rasterex viewer from the customer application.",
    copy:
      "We changed the integration model so Rasterex owned the compiled Canvas/viewer while customers owned their own UI, workflows, and business logic. I built the browser postMessage bridge and integration layer that lets the customer application control Rasterex functionality without modifying the Canvas source code.",
    nodes: [
      "Customer Application",
      "postMessage / integration boundary",
      "Rasterex Canvas viewer",
    ],
  },
  {
    label: "Deployment",
    title: "I simplified the on-premise installation into one primary setup flow.",
    copy:
      "The underlying Rasterex installation still required three MSI components, so I built an EXE installer that orchestrates their installation and configures IIS for the Canvas. Customers still deploy Rasterex on their own Windows Server, but they no longer need to install and wire the individual components manually.",
    nodes: [
      "Single EXE installer",
      "3 MSI components + IIS",
      "Customer Windows Server",
    ],
  },
  {
    label: "Evaluation",
    title: "Developers could evaluate Rasterex without setting up Windows Server first.",
    copy:
      "The production deployment was easier, but evaluation still required the full on-premise environment. To remove that barrier, we introduced a sandbox Canvas and I built the npm integration package so developers could prototype against Rasterex, test the integration API, and decide whether it fit their product before installing the production stack.",
    nodes: ["npm package", "Sandbox Canvas", "Developer prototype"],
  },
] as const;

const workItems = [
  {
    number: "01",
    title: "postMessage integration boundary",
    copy:
      "I built the iframe postMessage bridge that exposes Rasterex viewer functionality to the customer application. Customers can build and maintain their own UI while controlling the viewer through a defined interface instead of changing Canvas source code.",
  },
  {
    number: "02",
    title: "Unified on-premise installer",
    copy:
      "I built an EXE installer that coordinates the three required MSI packages and configures IIS for the Rasterex Canvas, reducing the amount of manual setup required on customer Windows Server environments.",
  },
  {
    number: "03",
    title: "npm package + sandbox evaluation",
    copy:
      "I built the npm integration package used with a sandbox Canvas so developers can test Rasterex from their own application without first installing the complete on-premise environment.",
  },
  {
    number: "04",
    title: "Customer deployment and feedback",
    copy:
      "I joined customer installation and technical meetings, helped deploy the new setup on customer servers, debugged integration issues, and contributed documentation and examples. Customers responded positively to the simpler setup and the ability to keep their UI separate from Rasterex Canvas.",
  },
] as const;

const impactItems = [
  "Customer UI, workflows, and business logic stay inside the customer's own application.",
  "Rasterex owns the compiled viewer implementation instead of customers modifying Canvas source code.",
  "The separation reduces conflicts between Rasterex updates and customer-written customizations.",
  "The three underlying MSI components are installed through one EXE-led setup flow with IIS configuration.",
  "Developers can evaluate the integration through npm and a sandbox Canvas before setting up the full Windows Server deployment.",
] as const;

function Architecture({
  stage,
}: {
  stage: (typeof stages)[number];
}) {
  return (
    <div className="rasterex-architecture" key={stage.label}>
      {stage.nodes.map((node, index) => (
        <div className="rasterex-node-step" key={node}>
          <div
            className={`rasterex-node${index === 1 ? " is-accent" : ""}`}
          >
            {node}
          </div>

          {index < stage.nodes.length - 1 && (
            <div className="rasterex-connector">
              <span
                className={index === 0 ? "rasterex-signal" : ""}
              />
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
      const scrollDistance = Math.max(
        stage.offsetHeight - window.innerHeight,
        1,
      );

      const progress = Math.min(
        Math.max(-bounds.top / scrollDistance, 0),
        1,
      );

      const nextIndex = Math.min(
        stages.length - 1,
        Math.floor(progress * stages.length),
      );

      setActiveIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex,
      );
    };

    const handleScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateScene);
      }
    };

    updateScene();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  const activeStage = stages[activeIndex] ?? stages[0];

  return (
    <section
      className="rasterex-section section section-border"
      id="work"
      data-section="work"
      aria-labelledby="rasterex-title"
    >
      <div className="rasterex-heading" data-reveal>
        <p className="eyebrow">Production Engineering</p>

        <p className="rasterex-company">
          Rasterex Software AS · Oslo, Norway
        </p>

        <p className="metadata">
          Backend Software Engineer · Aridian Technologies LLC · SDK ·
          Integrations · On-premise delivery
        </p>

        <h2 id="rasterex-title">
          Decoupling an on-premise technical viewer from the customer
          applications that embed it.
        </h2>
      </div>

      <p
        className="section-intro rasterex-intro"
        data-reveal
        data-reveal-delay="1"
      >
        Rasterex provides an on-premise technical drawing and document
        viewer. I worked on changing how customers integrate with and
        deploy the product: separating customer-owned UI from the
        Rasterex Canvas, simplifying the Windows Server installation
        flow, and later making evaluation possible through an npm
        package and sandbox environment.
      </p>

      <div className="rasterex-stage" ref={stageRef}>
        <div className="rasterex-scene">
          <div className="rasterex-story">
            <div className="rasterex-stage-index">
              {stages.map((stage, index) => (
                <span
                  className={
                    activeIndex === index ? "is-active" : ""
                  }
                  key={stage.label}
                >
                  0{index + 1}
                </span>
              ))}
            </div>

            <div
              className="rasterex-active-copy"
              key={activeStage.label}
            >
              <p className="eyebrow">
                0{activeIndex + 1} / {activeStage.label}
              </p>

              <h3>{activeStage.title}</h3>
              <p>{activeStage.copy}</p>
            </div>

            <p className="rasterex-scroll-hint">
              Scroll to inspect the integration{" "}
              <span aria-hidden="true">↓</span>
            </p>
          </div>

          <div
            className="rasterex-visual"
            aria-label={`${activeStage.label} Rasterex architecture visual`}
          >
            <div className="sketch-label">
              RASTEREX / ARCHITECTURE
            </div>

            <Architecture stage={activeStage} />

            <div className="sketch-meta">
              sanitized architecture · conceptual system view
            </div>
          </div>
        </div>
      </div>

      <div className="rasterex-mobile-stages">
        {stages.map((stage, index) => (
          <article
            className="rasterex-mobile-stage"
            key={stage.label}
          >
            <p className="eyebrow">
              0{index + 1} / {stage.label}
            </p>

            <h3>{stage.title}</h3>
            <p>{stage.copy}</p>

            <Architecture stage={stage} />
          </article>
        ))}
      </div>

      <div
        className="rasterex-work"
        aria-labelledby="rasterex-work-title"
      >
        <div className="rasterex-subheading">
          <p className="eyebrow">What I built and worked on</p>

          <h3 id="rasterex-work-title">
            From integration architecture to customer deployment.
          </h3>
        </div>

        <div className="rasterex-work-grid">
          {workItems.map((item) => (
            <article
              className="rasterex-work-item"
              key={item.number}
            >
              <span className="rasterex-work-number">
                {item.number}
              </span>

              <h4>{item.title}</h4>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>

      <div
        className="rasterex-impact"
        aria-labelledby="rasterex-impact-title"
      >
        <div className="rasterex-subheading">
          <p className="eyebrow">Engineering impact</p>

          <h3 id="rasterex-impact-title">
            Separating Rasterex releases from customer application
            code.
          </h3>
        </div>

        <ul className="rasterex-impact-list">
          {impactItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}