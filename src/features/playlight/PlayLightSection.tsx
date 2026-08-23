"use client";

import { useEffect, useRef, useState } from "react";

const stages = [
  {
    label: "Context & Data",
    title: "Persistent personalization starts with structured user-owned data.",
    copy:
      "PlayLight stores user-specific information in PostgreSQL and uses vector embeddings to make selected context searchable. The backend keeps this data scoped to the user so later requests can retrieve relevant history instead of relying only on the current message.",
    nodes: [
      "Current Request",
      "User-owned Data",
      "PostgreSQL + pgvector",
      "Searchable Context",
    ],
  },
  {
    label: "Retrieval",
    title: "Retrieve relevant context without crossing user boundaries.",
    copy:
      "For a new request, the backend performs user-scoped retrieval over stored context and selects information relevant to the current interaction. The current system focuses on relevance and user isolation; retrieval quality, recency, and stale-context handling are areas we are continuing to improve.",
    nodes: [
      "Incoming Request",
      "User-scoped Retrieval",
      "Relevant Context",
    ],
  },
  {
    label: "Context Assembly",
    title: "Retrieved data still has to become useful model context.",
    copy:
      "Retrieved information is combined with the current request and application instructions before being sent to the model. The backend controls what context is included so the model does not receive the user's entire stored history for every request.",
    nodes: [
      "Instructions + Request",
      "Retrieved Context",
      "Context Assembly",
      "Model Request",
    ],
  },
  {
    label: "Model Boundary",
    title: "The LLM is one dependency inside the backend, not the whole system.",
    copy:
      "The model provider sits behind an application boundary. The backend prepares the request, sends only the context required for that interaction, handles the provider response, and persists application state independently of the model itself.",
    nodes: [
      "Application",
      "Model Boundary",
      "LLM Provider",
      "Application Response",
    ],
  },
  {
    label: "Reliability & Cost",
    title: "AI features also create ordinary backend engineering problems.",
    copy:
      "Embedding jobs, provider requests, stored context, and retrieval all have operational costs and failure modes. We are designing the system around bounded context, asynchronous processing, user isolation, retries, and observability so these dependencies can be operated more reliably as usage grows.",
    nodes: [
      "User Isolation",
      "Async Processing",
      "Context Budget",
      "Operational Controls",
    ],
  },
] as const;

function PlayLightArchitecture({
  stage,
}: {
  stage: (typeof stages)[number];
}) {
  return (
    <div className="playlight-architecture" key={stage.label}>
      {stage.nodes.map((node, index) => (
        <div className="playlight-node-step" key={node}>
          <div
            className={`playlight-node${index === 1 ? " is-accent" : ""}`}
          >
            {node}
          </div>

          {index < stage.nodes.length - 1 && (
            <div className="playlight-connector">
              <span
                className={index === 0 ? "playlight-signal" : ""}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function PlayLightSection() {
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
      className="playlight-section section section-border"
      id="playlight"
      data-section="work"
      aria-labelledby="playlight-title"
    >
      <div className="playlight-heading" data-reveal>
        <p className="eyebrow">Zero-to-one Product Engineering</p>

        <p className="playlight-product">
          PlayLight · Personalized AI Product
        </p>

        <p className="metadata">
          Technical Co-Founder / Backend Engineer · Part-time · Jan
          2026 — Present
        </p>

        <h2 id="playlight-title">
          Building a backend that gives an AI product persistent,
          user-specific context.
        </h2>
      </div>

      <div
        className="playlight-intro"
        data-reveal
        data-reveal-delay="1"
      >
        <p className="section-intro">
          PlayLight is a personalized AI product I&apos;m building with
          my co-founder. I own much of the backend architecture,
          including how user context is stored in PostgreSQL, represented
          with embeddings, retrieved for individual requests, and
          assembled before reaching the model.
        </p>

        <p className="section-intro">
          The engineering problem is larger than calling an LLM API.
          The backend has to preserve user isolation, decide which stored
          context is useful for a request, keep model input bounded, run
          asynchronous embedding work reliably, and handle AI providers
          as external dependencies rather than as the application itself.
        </p>
      </div>

      <div className="playlight-stage" ref={stageRef}>
        <div className="playlight-scene">
          <div className="playlight-story">
            <div className="playlight-stage-index">
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
              className="playlight-active-copy"
              key={activeStage.label}
            >
              <p className="eyebrow">
                0{activeIndex + 1} / {activeStage.label}
              </p>

              <h3>{activeStage.title}</h3>
              <p>{activeStage.copy}</p>
            </div>

            <p className="playlight-scroll-hint">
              Scroll through the data flow{" "}
              <span aria-hidden="true">↓</span>
            </p>
          </div>

          <div
            className="playlight-visual"
            aria-label={`${activeStage.label} PlayLight architecture visual`}
          >
            <div className="sketch-label">
              PLAYLIGHT / DATA FLOW
            </div>

            <PlayLightArchitecture stage={activeStage} />

            <div className="sketch-meta">
              user-scoped context · evolving production system
            </div>
          </div>
        </div>
      </div>

      <div className="playlight-mobile-stages">
        {stages.map((stage, index) => (
          <article
            className="playlight-mobile-stage"
            key={stage.label}
          >
            <p className="eyebrow">
              0{index + 1} / {stage.label}
            </p>

            <h3>{stage.title}</h3>
            <p>{stage.copy}</p>

            <PlayLightArchitecture stage={stage} />
          </article>
        ))}
      </div>

      <aside
        className="playlight-evaluation"
        data-reveal
        aria-label="PlayLight engineering note"
      >
        <p className="eyebrow">Current engineering focus</p>

        <p>
          The system is still evolving. I&apos;m currently focusing on
          retrieval quality, background-job reliability, observability,
          load behavior, and making personalization measurable instead of
          assuming that a plausible model response means the system is
          working correctly.
        </p>
      </aside>
    </section>
  );
}