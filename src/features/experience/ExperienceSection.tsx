"use client";

import { useEffect, useRef, useState } from "react";

type Role = {
  period: string;
  year: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  focus: string;
  link?: string;
  emphasis?: boolean;
};

const roles: Role[] = [
  {
    period: "SEP 2021 — SEP 2023",
    year: "2021",
    role: "Software Developer",
    company: "Media Techtics",
    location: "Rawalpindi, Pakistan",
    summary: "Built e-commerce applications and backend APIs using Node.js and Next.js, covering products, carts, checkout, orders, authentication, and payment flows.",
    focus: "Node.js · Next.js · REST APIs · Authentication · Payments · E-commerce",
  },
  {
    period: "OCT 2023 — JUL 2024",
    year: "2023",
    role: "Backend Software Engineer",
    company: "M TECHUB LLC",
    location: "Rawalpindi, Pakistan",
    summary: "Built backend services for mobile products using Node.js, Express.js, and PostgreSQL, including scheduling, payments, marketplace workflows, and geospatial features.",
    focus: "Node.js · PostgreSQL · Stripe · Stripe Connect · PostGIS · External APIs",
  },
  {
    period: "NOV 2024 — PRESENT",
    year: "2024",
    role: "Backend Software Engineer",
    company: "Aridian Technologies / Rasterex",
    location: "Rasterex Software AS · Oslo, Norway",
    summary: "Work on Rasterex’s developer-facing integration platform, including the @rasterex/viewer SDK, framework-independent integrations, iframe/PostMessage communication, documentation, customer debugging, and delivery workflows.",
    focus: "SDK Engineering · Integration Contracts · PostMessage · Developer Experience · Customer Integrations",
    link: "#work",
    emphasis: true,
  },
  {
    period: "JAN 2026 — PRESENT",
    year: "2026",
    role: "Technical Co-Founder / Backend Engineer",
    company: "PlayLight",
    location: "Part-time",
    summary: "Co-founded PlayLight and own much of the hands-on backend and technical architecture for a personalized AI product built around NestJS, PostgreSQL, pgvector, embeddings, retrieval, and persistent user context.",
    focus: "NestJS · PostgreSQL · pgvector · Retrieval · LLM Integration · User Isolation",
    link: "#playlight",
    emphasis: true,
  },
] as const;

export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    let frame = 0;
    const updateTimeline = () => {
      frame = 0;
      const bounds = timeline.getBoundingClientRect();
      const distance = Math.max(timeline.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-bounds.top / distance, 0), 1);
      const nextIndex = Math.min(roles.length - 1, Math.floor(progress * roles.length));
      timeline.style.setProperty("--experience-progress", progress.toString());
      setActiveIndex((currentIndex) => currentIndex === nextIndex ? currentIndex : nextIndex);
    };
    const handleScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateTimeline);
    };

    updateTimeline();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  const activeRole = roles[activeIndex] ?? roles[0];

  return (
    <section className="experience-section section section-border" id="experience" data-section="experience" aria-labelledby="experience-title">
      <div className="experience-heading" data-reveal>
        <p className="eyebrow">Experience</p>
        <h2 id="experience-title">Building deeper backend ownership across products, integrations, and systems.</h2>
      </div>
      <p className="section-intro experience-intro" data-reveal data-reveal-delay="1">
        My experience has moved progressively toward backend systems, integrations, developer platforms, and product ownership — from building e-commerce applications and APIs to payment and scheduling systems, production SDK work, and zero-to-one AI backend architecture.
      </p>

      <div className="experience-timeline" ref={timelineRef}>
        <div className="experience-scene">
          <div className="timeline-rail" aria-label="Career timeline">
            <div className="timeline-line" />
            <div className="timeline-line-progress" />
            {roles.map((role, index) => (
              <div className={`timeline-marker${activeIndex === index ? " is-active" : ""}`} key={role.year}>
                <span>{role.year}</span>
                <i aria-hidden="true" />
              </div>
            ))}
          </div>
          <article className={`experience-active-role${activeRole.emphasis ? " is-emphasis" : ""}`} key={activeRole.company}>
            <p className="eyebrow">{activeRole.period}</p>
            <h3>{activeRole.role}</h3>
            <p className="experience-company">{activeRole.company}</p>
            <p className="metadata">{activeRole.location}</p>
            <p className="experience-summary">{activeRole.summary}</p>
            <div className="experience-focus">
              <span className="metadata">Focus</span>
              <p>{activeRole.focus}</p>
            </div>
            {activeRole.link && <a className="text-link" href={activeRole.link}>View {activeRole.company.split(" /")[0]} {activeRole.company.includes("PlayLight") ? "architecture" : "case study"} <span aria-hidden="true">↗</span></a>}
          </article>
        </div>
      </div>

      <div className="experience-mobile-list">
        {[...roles].reverse().map((role) => (
          <article className={`experience-mobile-role${role.emphasis ? " is-emphasis" : ""}`} key={role.company}>
            <span className="experience-mobile-year">{role.year}</span>
            <div>
              <p className="eyebrow">{role.period}</p>
              <h3>{role.role}</h3>
              <p className="experience-company">{role.company}</p>
              <p className="metadata">{role.location}</p>
              <p className="experience-summary">{role.summary}</p>
              <div className="experience-focus"><span className="metadata">Focus</span><p>{role.focus}</p></div>
              {role.link && <a className="text-link" href={role.link}>View case study <span aria-hidden="true">↗</span></a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
