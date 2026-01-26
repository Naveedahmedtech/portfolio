import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TextRevealParams = {
  sectionRef: RefObject<HTMLElement>;
  triggerRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
};

const useHeroTextReveal = ({
  sectionRef,
  triggerRef,
  containerRef,
}: TextRevealParams) => {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const container = containerRef.current;
    if (!section || !trigger || !container) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          pin: container,
          pinSpacing: false,
        },
      });

      // Layer Selectors
      const l1 = gsap.utils.selector(container)('[data-hero-layer="1"]');
      const l2 = gsap.utils.selector(container)('[data-hero-layer="2"]');
      const l3 = gsap.utils.selector(container)('[data-hero-layer="3"]');
      const signals = container.querySelector('[data-hero-reveal="signals"]');

      // Layer Elements
      const l1Tag = container.querySelector('[data-hero-reveal="intro-tag"]');
      const l1Title = container.querySelector('[data-hero-reveal="intro-title"]');

      const l2Title = container.querySelector('[data-hero-reveal="value-title"]');
      const l2Sub = container.querySelector('[data-hero-reveal="value-sub"]');

      const l3Title = container.querySelector('[data-hero-reveal="cta-title"]');
      const l3Btns = container.querySelector('[data-hero-reveal="cta-btns"]');

      // --- TIMELINE ORCHESTRATION ---

      // Initial State
      gsap.set([l2, l3], { autoAlpha: 0, display: "none" });
      gsap.set(signals, { opacity: 0, y: 20 });

      // SEQUENCE 1: Intro Reveal (already visible at top, so we animate its exit)
      tl.to(l1Tag, { opacity: 0, y: -20, duration: 1 }, 0)
        .to(l1Title, { y: -50, opacity: 0, scale: 0.95, duration: 2, ease: "power2.inOut" }, 0.5)
        .to(l1, { autoAlpha: 0, duration: 1 }, 1.5)

        // SEQUENCE 2: transition L1 -> L2
        .set(l2, { display: "flex" }, 2)
        .to(l2, { autoAlpha: 1, duration: 1.5 }, 2)
        .from(l2Title, { y: 60, opacity: 0, filter: "blur(10px)", duration: 2, ease: "power3.out" }, 2.2)
        .from(l2Sub, { y: 30, opacity: 0, duration: 1.5 }, 2.8)
        .to(signals, { opacity: 1, y: 0, duration: 1.5 }, 2.5)

        // SEQUENCE 3: Transition L2 -> L3
        .to(l2, { autoAlpha: 0, y: -40, scale: 1.05, duration: 2, ease: "power2.inOut" }, 5.5)
        .set(l3, { display: "flex" }, 6)
        .to(l3, { autoAlpha: 1, duration: 1.5 }, 6)
        .from(l3Title, { scale: 0.9, opacity: 0, duration: 2, ease: "back.out(1.7)" }, 6.5)
        .from(l3Btns, { y: 20, opacity: 0, duration: 1.5 }, 7);

      // Final Exit
      tl.to(container, { opacity: 0, filter: "blur(20px)", duration: 2 }, 10);

    }, section);

    return () => ctx.revert();
  }, [sectionRef, triggerRef, containerRef]);
};

export default useHeroTextReveal;
