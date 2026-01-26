import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SkillsScrollRevealParams = {
  sectionRef: RefObject<HTMLElement>;
  triggerRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
};

const useSkillsScrollReveal = ({
  sectionRef,
  triggerRef,
  containerRef,
}: SkillsScrollRevealParams) => {
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
          scrub: 1,
          pin: container,
          pinSpacing: false,
        },
      });

      // Layer Selectors
      const l1 = gsap.utils.selector(container)('[data-skill-layer="1"]');
      const l2 = gsap.utils.selector(container)('[data-skill-layer="2"]');
      const l3 = gsap.utils.selector(container)('[data-skill-layer="3"]');

      // Layer 1 Elements
      const l1Sub = container.querySelector('[data-skill-reveal="intro-sub"]');
      const l1Title = container.querySelector('[data-skill-reveal="intro-title"]');

      // Layer 2 Elements
      const l2ManagerTitle = container.querySelector('[data-skill-reveal="manager-title"]');
      const l2DevTitle = container.querySelector('[data-skill-reveal="dev-title"]');
      const l2ManagerList = container.querySelectorAll('[data-skill-stagger="manager-list"] > div');
      const l2DevList = container.querySelectorAll('[data-skill-stagger="dev-list"] > div');

      // Layer 3 Elements
      const l3Title = container.querySelector('[data-skill-reveal="impact-title"]');
      const l3Keywords = container.querySelectorAll('[data-skill-stagger="impact-keywords"] > span');
      const l3Text = container.querySelector('[data-skill-reveal="impact-text"]');

      // --- TIMELINE ORCHESTRATION ---

      // Initial State
      gsap.set([l2, l3], { autoAlpha: 0, display: "none" });
      gsap.set(l1Title, { y: 100, opacity: 0 });
      gsap.set(l1Sub, { opacity: 0 });

      // SEQUENCE 1: Intro Reveal (0 - 0.2)
      tl.to(l1Sub, { opacity: 1, duration: 0.5 }, 0)
        .to(l1Title, { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, 0.2);

      // SEQUENCE 2: transition L1 -> L2 (0.3 - 0.5)
      tl.to(l1, { autoAlpha: 0, y: -100, scale: 0.9, duration: 1, ease: "power2.inOut" }, 1.5)
        .set(l2, { display: "grid" }, 2)
        .to(l2, { autoAlpha: 1, duration: 1 }, 2)
        .from(l2ManagerTitle, { x: -100, opacity: 0, duration: 1, ease: "power3.out" }, 2.2)
        .from(l2DevTitle, { x: 100, opacity: 0, duration: 1, ease: "power3.out" }, 2.2)
        .from(l2ManagerList, { x: -30, opacity: 0, stagger: 0.1, duration: 0.8 }, 2.5)
        .from(l2DevList, { x: 30, opacity: 0, stagger: 0.1, duration: 0.8 }, 2.5);

      // SEQUENCE 3: Transition L2 -> L3 (0.6 - 0.8)
      tl.to(l2, { autoAlpha: 0, scale: 1.1, duration: 1, ease: "power2.inOut" }, 4.5)
        .set(l3, { display: "flex" }, 5)
        .to(l3, { autoAlpha: 1, duration: 1 }, 5)
        .from(l3Title, { y: 50, opacity: 0, duration: 1, ease: "back.out(1.7)" }, 5.2)
        .from(l3Keywords, {
          scale: 0.5,
          opacity: 0,
          stagger: { each: 0.1, from: "center" },
          duration: 0.8,
          ease: "power2.out"
        }, 5.5)
        .from(l3Text, { opacity: 0, y: 20, duration: 1 }, 6);

      // SEQUENCE 4: Exit L3 (0.9 - 1.0)
      tl.to(l3, { autoAlpha: 0, y: -50, duration: 1 }, 7.5);

    }, section);

    return () => ctx.revert();
  }, [sectionRef, containerRef, triggerRef]);
};

export default useSkillsScrollReveal;
