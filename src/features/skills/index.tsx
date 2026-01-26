import React, { useRef } from "react";
import useSkillsScrollReveal from "./hooks/useSkillsScrollReveal";

const managerSkills = [
  "SDLC Governance",
  "Mentorship",
  "Strategic Roadmap Planning",
  "Cross-functional Collaboration",
];

const developerSkills = [
  "Latency Optimization",
  "React 19 / Three.js",
  "Agentic Workflows (LangGraph)",
  "System Security",
];

const strategyKeywords = [
  "Scalability",
  "Orchestration",
  "Governance",
  "ROI",
  "High-Fidelity",
  "Resilience",
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useSkillsScrollReveal({ sectionRef, containerRef, triggerRef });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10 overflow-visible"
    >
      {/* Pinned Container */}
      <div
        ref={triggerRef}
        className="relative h-[400vh] w-full"
      >
        <div
          ref={containerRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-transparent"
        >
          {/* Atmospheric Background Elements */}
          <div className="absolute inset-0 z-0 opacity-20 transition-opacity duration-1000">
            <div className="absolute left-[10%] top-[20%] h-[40rem] w-[40rem] rounded-full bg-accent/5 blur-[120px]" />
            <div className="absolute right-[5%] bottom-[10%] h-[50rem] w-[50rem] rounded-full bg-primary/5 blur-[150px]" />
          </div>

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 lg:px-16">

            {/* Layer 1: Kinetic Introduction */}
            <div data-skill-layer="1" className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="mb-4 block text-[0.65rem] font-bold uppercase tracking-[0.6em] text-accent/60" data-skill-reveal="intro-sub">
                The Architect's Stack
              </span>
              <h2 className="max-w-4xl font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.85] tracking-tighter text-textPrimary" data-skill-reveal="intro-title">
                Governance <br /> <span className="text-secondary/20">& Engineering.</span>
              </h2>
            </div>

            {/* Layer 2: Management & Development Depth */}
            <div data-skill-layer="2" className="absolute inset-0 hidden grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <div className="flex flex-col items-start gap-8 px-6 lg:px-20">
                <h3 className="font-display text-5xl text-accent" data-skill-reveal="manager-title">Leadership</h3>
                <div className="flex flex-col gap-6" data-skill-stagger="manager-list">
                  {managerSkills.map((skill) => (
                    <div key={skill} className="flex items-center gap-4 text-xl tracking-tight text-textSecondary hover:text-textPrimary transition-colors">
                      <div className="h-1 w-8 bg-accent/30" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-8 px-6 lg:px-20 text-right">
                <h3 className="font-display text-5xl text-primary" data-skill-reveal="dev-title">Systems</h3>
                <div className="flex flex-col gap-6" data-skill-stagger="dev-list">
                  {developerSkills.map((skill) => (
                    <div key={skill} className="flex items-center justify-end gap-4 text-xl tracking-tight text-textSecondary hover:text-textPrimary transition-colors">
                      {skill}
                      <div className="h-1 w-8 bg-primary/30" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Layer 3: Strategic Impact */}
            <div data-skill-layer="3" className="absolute inset-0 hidden flex-col items-center justify-center space-y-12 text-center">
              <h3 className="font-display text-[clamp(2rem,6vw,5rem)] text-textPrimary" data-skill-reveal="impact-title">
                Driven by Results.
              </h3>
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl" data-skill-stagger="impact-keywords">
                {strategyKeywords.map((word) => (
                  <span key={word} className="rounded-full border border-accent/10 bg-white/[0.02] px-8 py-4 text-xs font-bold uppercase tracking-[0.4em] text-textSecondary/60 backdrop-blur-sm transition-all hover:border-primary/40 hover:text-textPrimary hover:scale-105">
                    {word}
                  </span>
                ))}
              </div>
              <p className="max-w-xl text-lg text-textSecondary/40 italic" data-skill-reveal="impact-text">
                "Technical decisions aligned with long-term business ROI."
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
