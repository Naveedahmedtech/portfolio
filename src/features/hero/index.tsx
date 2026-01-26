import React, { useRef } from "react";
import HeroCanvas from "./canvas/HeroCanvas";
import useHeroTextReveal from "./hooks/useHeroTextReveal";
import ErrorBoundary from "./components/ErrorBoundary";
import Button from "../../components/Button";

const strategicSignals = [
  { label: "Experience", value: "10+ Years" },
  { label: "Focus", value: "AI Orchestration" },
  { label: "Culture", value: "People-First" },
  { label: "Execution", value: "High-Fidelity" },
];

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useHeroTextReveal({ sectionRef, triggerRef, containerRef });

  return (
    <ErrorBoundary>
      <section
        ref={sectionRef}
        id="hero"
        className="relative z-10 overflow-visible"
      >
        {/* Pinned Cinematic Trigger */}
        <div ref={triggerRef} className="relative h-[350vh] w-full">
          <div
            ref={containerRef}
            className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background"
          >
            <div className="pointer-events-none absolute inset-0 z-0">
              <HeroCanvas />
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 text-center lg:px-16">

              {/* Phase 1: Identity & Role */}
              <div data-hero-layer="1" className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.6em] text-textSecondary/40" data-hero-reveal="intro-tag">
                  Engineering Leadership
                </span>
                <h1 className="mt-8 font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.85] tracking-tighter" data-hero-reveal="intro-title">
                  AI Orchestrator <br />
                  <span className="text-primary">& Software Engineer</span>
                </h1>
              </div>

              {/* Phase 2: Value & Philosophy */}
              <div data-hero-layer="2" className="absolute inset-0 flex hidden flex-col items-center justify-center">
                <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight text-textPrimary" data-hero-reveal="value-title">
                  Strategic Systems. <br />
                  <span className="text-secondary">People-First Leadership.</span>
                </h2>
                <p className="mt-8 max-w-2xl text-xl text-textSecondary/60" data-hero-reveal="value-sub">
                  Leading high-performance teams to bridge the gap between
                  complex logic and business ROI.
                </p>
              </div>

              {/* Phase 3: Final Call to Action */}
              <div data-hero-layer="3" className="absolute inset-0 flex hidden flex-col items-center justify-center">
                <h3 className="font-display text-[clamp(2rem,5vw,4.5rem)] text-textPrimary" data-hero-reveal="cta-title">
                  Ready to Orchestrate?
                </h3>
                <div className="mt-12 flex flex-col gap-6 sm:flex-row" data-hero-reveal="cta-btns">
                  <Button variant="primary" effect="magneticPull">
                    View Systems
                  </Button>
                  <Button
                    variant="ghost"
                    effect="magneticPull"
                    className="border-accent/70 bg-transparent text-accent"
                  >
                    Contact Me
                  </Button>
                </div>
              </div>

            </div>

            {/* Strategic Signals Footer */}
            <div className="absolute bottom-12 left-0 w-full px-6 lg:px-16" data-hero-reveal="signals">
              <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-8 border-t border-primary/10 pt-8">
                {strategicSignals.map((signal) => (
                  <div key={signal.label} className="flex flex-col items-start gap-1">
                    <span className="text-[0.6rem] uppercase tracking-[0.3em] text-textSecondary/40">
                      {signal.label}
                    </span>
                    <span className="font-display text-lg text-textPrimary/80">
                      {signal.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Hero;
