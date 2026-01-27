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

    // --- UTILS: SPLIT TEXT (Word-Aware) ---
    const splitText = (element: HTMLElement | null) => {
      if (!element || element.querySelector(".reveal-char")) return;

      const processNode = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || "";
          const fragment = document.createDocumentFragment();

          // Split by spaces to group words
          const words = text.split(" ");

          words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement("span");
            wordSpan.className = "reveal-word";
            wordSpan.style.display = "inline-block";
            wordSpan.style.whiteSpace = "nowrap"; // Keep chars together

            word.split("").forEach((char) => {
              const span = document.createElement("span");
              span.style.display = "inline-block";
              span.className = "reveal-char";

              const inner = document.createElement("span");
              inner.textContent = char;
              inner.style.display = "inline-block";
              inner.className = "char-inner";
              inner.style.pointerEvents = "none";

              span.appendChild(inner);
              wordSpan.appendChild(span);
            });

            fragment.appendChild(wordSpan);

            // Add non-breaking space after word (except last)
            if (wordIndex < words.length - 1) {
              const spaceSpan = document.createElement("span");
              spaceSpan.className = "reveal-char space";
              spaceSpan.style.display = "inline-block";

              const inner = document.createElement("span");
              inner.textContent = "\u00A0"; // nbsp
              inner.style.display = "inline-block";
              inner.className = "char-inner";

              spaceSpan.appendChild(inner);
              fragment.appendChild(spaceSpan);
            }
          });

          node.parentNode?.replaceChild(fragment, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const elementNode = node as HTMLElement;
          if (elementNode.tagName === "BR") return;
          Array.from(elementNode.childNodes).forEach(processNode);
        }
      };

      Array.from(element.childNodes).forEach(processNode);
    };

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
      const l1Title = container.querySelector<HTMLElement>('[data-hero-reveal="intro-title"]');

      const l2Title = container.querySelector<HTMLElement>('[data-hero-reveal="value-title"]');
      const l2Sub = container.querySelector('[data-hero-reveal="value-sub"]');

      const l3Title = container.querySelector<HTMLElement>('[data-hero-reveal="cta-title"]');
      const l3Btns = container.querySelector('[data-hero-reveal="cta-btns"]');

      // Apply Splitting
      splitText(l1Title);
      splitText(l2Title);
      splitText(l3Title);

      const l1Chars = l1Title?.querySelectorAll(".reveal-char");
      const l2Chars = l2Title?.querySelectorAll(".reveal-char");
      const l3Chars = l3Title?.querySelectorAll(".reveal-char");

      // --- TIMELINE ORCHESTRATION ---

      // Initial State
      gsap.set([l2, l3], { autoAlpha: 0, display: "none" });
      gsap.set(signals, { opacity: 0, y: 20 });

      // Initial state for chars
      if (l1Chars) {
        gsap.set(l1Chars, { y: 0, opacity: 1 });
      }

      // SEQUENCE 1: Intro Reveal Exit
      tl.to(l1Tag, { opacity: 0, y: -20, duration: 1 }, 0)
        .to(l1Chars || [], {
          y: -100,
          opacity: 0,
          rotateX: -45,
          stagger: { amount: 0.5, from: "start" },
          duration: 2,
          ease: "power4.inOut"
        }, 0.5)
        .to(l1, { autoAlpha: 0, duration: 1 }, 1.5)

        // SEQUENCE 2: transition L1 -> L2
        .set(l2, { display: "flex" }, 2)
        .to(l2, { autoAlpha: 1, duration: 0.5 }, 2)
        .fromTo(l2Chars || [],
          { y: 120, opacity: 0, rotateX: 90, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            filter: "blur(0px)",
            stagger: { amount: 0.8, from: "start" },
            duration: 2.5,
            ease: "expo.out"
          }, 2.2)
        .from(l2Sub, { y: 30, opacity: 0, duration: 1.5 }, 2.8)
        .to(signals, { opacity: 1, y: 0, duration: 1.5 }, 2.5)

        // SEQUENCE 3: Transition L2 -> L3
        .to(l2Chars || [], {
          y: -100,
          opacity: 0,
          rotateX: -90,
          stagger: { amount: 0.5, from: "center" },
          duration: 2,
          ease: "power2.inOut"
        }, 5.5)
        .to(l2Sub, { opacity: 0, y: -20, duration: 1 }, 5.5)
        .set(l3, { display: "flex" }, 6)
        .to(l3, { autoAlpha: 1, duration: 1.5 }, 6)
        .fromTo(l3Chars || [],
          { scale: 0.5, opacity: 0, filter: "blur(20px)", skewX: 20 },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            skewX: 0,
            stagger: { amount: 0.6, from: "random" },
            duration: 2,
            ease: "back.out(2)"
          }, 6.5)
        .from(l3Btns, { y: 20, opacity: 0, duration: 1.5 }, 7.5);

      // Final Exit
      tl.to(container, { opacity: 0, filter: "blur(20px)", duration: 2 }, 10);

    }, section);

    return () => ctx.revert();
  }, [sectionRef, triggerRef, containerRef]);
};

export default useHeroTextReveal;
