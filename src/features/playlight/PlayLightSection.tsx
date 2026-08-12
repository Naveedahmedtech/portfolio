"use client";

import { useEffect, useRef, useState } from "react";

const stages = [
  {
    label: "Context",
    title: "AI becomes more useful when it remembers the right things.",
    copy: "A useful personalized assistant needs more than the current message. It needs relevant historical context while avoiding unrelated, outdated, or cross-user information.",
    nodes: ["Current Request", "User History", "Personalized Response"],
  },
  {
    label: "Data",
    title: "Persistent context starts with a trustworthy source of truth.",
    copy: "PostgreSQL stores the product’s persistent application data and user-owned context. The data model has to preserve ownership boundaries, support updates and deletion, and remain queryable as the product evolves.",
    nodes: ["User", "NestJS API", "PostgreSQL"],
  },
  {
    label: "Embeddings",
    title: "Not every piece of history belongs in every prompt.",
    copy: "Relevant context can be represented with embeddings so the backend can search past information semantically rather than sending the entire user history to the model.",
    nodes: ["User Context", "Embedding", "Vector"],
  },
  {
    label: "Retrieval",
    title: "Retrieve the smallest useful context, not the largest possible context.",
    copy: "The retrieval layer searches for context relevant to the current request while preserving user isolation and considering metadata, relevance, recency, and future stale-memory handling.",
    nodes: ["Incoming Request", "User-scoped Search", "Relevant Context"],
  },
  {
    label: "Context Construction",
    title: "Retrieval is only useful if the model receives the right context.",
    copy: "Retrieved information still has to be filtered, ordered, shaped, and fitted into a context budget before it becomes part of the model request.",
    nodes: ["Instructions + Request", "Retrieved Context", "Context Assembly", "Model Request"],
  },
  {
    label: "LLM Integration",
    title: "The model is a dependency, not the architecture.",
    copy: "The LLM sits behind an application boundary. The backend owns what data is sent, how responses are handled, what happens on timeout or malformed output, and how the result is persisted.",
    nodes: ["Application", "Model Boundary", "LLM Provider", "Validated Response"],
  },
  {
    label: "Reliability",
    title: "AI dependencies fail like every other external system.",
    copy: "The architecture has to account for provider latency, timeouts, retries, duplicate work, partial failures, expensive requests, and graceful recovery.",
    nodes: ["API", "Retrieval", "LLM Provider", "Recovery"],
  },
  {
    label: "Security",
    title: "Personalization makes isolation a core architectural requirement.",
    copy: "User context must remain scoped to the correct user throughout persistence, retrieval, context construction, and model requests.",
    nodes: ["User A Request", "User A Data", "User A Context"],
  },
  {
    label: "Cost",
    title: "More context is not automatically better.",
    copy: "Personalized AI systems have a direct relationship between retrieved context, token usage, latency, and cost. The backend needs to control how much information reaches the model instead of continuously growing prompts.",
    nodes: ["100 Memories", "6 Relevant Items", "Context Budget", "LLM"],
  },
  {
    label: "Evaluation",
    title: "A response sounding good is not enough evidence that the system works.",
    copy: "Retrieval and personalization need repeatable evaluation: whether the right context was retrieved, whether unrelated context leaked in, how much the request cost, and whether changes improved or regressed the user experience.",
    nodes: ["Input", "Retrieved Context", "Response", "Evaluate"],
  },
] as const;

function PlayLightArchitecture({ stage }: { stage: (typeof stages)[number] }) {
  return (
    <div className="playlight-architecture" key={stage.label}>
      {stage.nodes.map((node, index) => (
        <div className="playlight-node-step" key={node}>
          <div className={`playlight-node${index === 1 ? " is-accent" : ""}`}>{node}</div>
          {index < stage.nodes.length - 1 && (
            <div className="playlight-connector"><span className={index === 0 ? "playlight-signal" : ""} /></div>
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
    <section className="playlight-section section section-border" data-section="work" aria-labelledby="playlight-title">
      <div className="playlight-heading" data-reveal>
        <p className="eyebrow">Zero-to-one Product Engineering</p>
        <p className="playlight-product">PlayLight · Personalized AI Product</p>
        <p className="metadata">Technical Co-Founder / Backend Engineer · Part-time · Jan 2026 — Present</p>
        <h2 id="playlight-title">Building a backend that gives AI persistent, user-specific context.</h2>
      </div>
      <div className="playlight-intro" data-reveal data-reveal-delay="1">
        <p className="section-intro">
          PlayLight is a personalized AI product I’m building with my co-founder. I own much of
          the backend and technical architecture, including how user data is stored, retrieved,
          transformed into model context, and kept isolated across users.
        </p>
        <p className="section-intro">
          The challenge is not simply calling an LLM. The backend has to decide what information
          matters, retrieve it safely, control context size and cost, handle stale or conflicting
          information, and remain reliable when model providers or dependencies fail.
        </p>
      </div>

      <div className="playlight-stage" ref={stageRef}>
        <div className="playlight-scene">
          <div className="playlight-story">
            <div className="playlight-stage-index">
              {stages.map((stage, index) => (
                <span className={activeIndex === index ? "is-active" : ""} key={stage.label}>0{index + 1}</span>
              ))}
            </div>
            <div className="playlight-active-copy" key={activeStage.label}>
              <p className="eyebrow">0{activeIndex + 1} / {activeStage.label}</p>
              <h3>{activeStage.title}</h3>
              <p>{activeStage.copy}</p>
            </div>
            <p className="playlight-scroll-hint">Scroll to build the system <span aria-hidden="true">↓</span></p>
          </div>
          <div className="playlight-visual" aria-label={`${activeStage.label} PlayLight architecture visual`}>
            <div className="sketch-label">PLAYLIGHT / DATA FLOW</div>
            <PlayLightArchitecture stage={activeStage} />
            <div className="sketch-meta">user-scoped context · evolving system</div>
          </div>
        </div>
      </div>

      <div className="playlight-mobile-stages">
        {stages.map((stage, index) => (
          <article className="playlight-mobile-stage" key={stage.label}>
            <p className="eyebrow">0{index + 1} / {stage.label}</p>
            <h3>{stage.title}</h3>
            <p>{stage.copy}</p>
            <PlayLightArchitecture stage={stage} />
          </article>
        ))}
      </div>

    </section>
  );
}
