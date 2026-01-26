import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ExperienceScrollParams = {
    sectionRef: RefObject<HTMLElement>;
    triggerRef: RefObject<HTMLDivElement>;
    containerRef: RefObject<HTMLDivElement>;
    horizontalRef: RefObject<HTMLDivElement>;
};

const useExperienceScroll = ({
    sectionRef,
    triggerRef,
    containerRef,
    horizontalRef,
}: ExperienceScrollParams) => {
    useLayoutEffect(() => {
        const section = sectionRef.current;
        const trigger = triggerRef.current;
        const container = containerRef.current;
        const horizontal = horizontalRef.current;

        if (!section || !trigger || !container || !horizontal) return undefined;

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

            // Selectors
            const expLayers = gsap.utils.toArray<HTMLElement>("[data-exp-layer]");
            const projectsLayer = container.querySelector("[data-projects-layer]");
            const projectArticles = horizontal.querySelectorAll("article");

            // --- TIMELINE ORCHESTRATION ---

            // 1. Experience Sequence (Vertical Phases)
            expLayers.forEach((layer, i) => {
                const isFirst = i === 0;

                // Entry
                if (isFirst) {
                    tl.to(layer, { opacity: 1, y: 0, duration: 2 }, 0);
                } else {
                    tl.fromTo(
                        layer,
                        { opacity: 0, y: 50, scale: 0.95 },
                        { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" },
                        i * 4
                    );
                }

                // Exit (unless it's transition to projects)
                tl.to(
                    layer,
                    {
                        opacity: 0,
                        y: -50,
                        scale: 1.05,
                        filter: "blur(10px)",
                        duration: 2,
                        ease: "power2.in",
                    },
                    (i + 1) * 4 - 1
                );
            });

            // 2. Transition to Projects (Phase switch)
            const projectStartTime = expLayers.length * 4;

            tl.to(
                projectsLayer,
                {
                    opacity: 1,
                    y: 0,
                    duration: 3,
                    display: "flex",
                    ease: "power3.inOut",
                },
                projectStartTime
            );

            // 3. Horizontal Project Scroll
            // We calculate the scroll width
            const scrollWidth = horizontal.scrollWidth - window.innerWidth;

            tl.to(
                horizontal,
                {
                    x: -scrollWidth,
                    duration: 10,
                    ease: "none",
                },
                projectStartTime + 2
            );

            // Project Card Micro-animations (staggered scaling as they pass by)
            projectArticles.forEach((article, i) => {
                tl.from(article, {
                    scale: 0.9,
                    opacity: 0.5,
                    duration: 1,
                    ease: "power2.out"
                }, projectStartTime + 2 + (i * (10 / projectArticles.length)));
            });

            // Final Fade Out of the whole section
            tl.to(container, { opacity: 0, duration: 2 }, "+=1");

        }, section);

        return () => ctx.revert();
    }, [sectionRef, triggerRef, containerRef, horizontalRef]);
};

export default useExperienceScroll;
