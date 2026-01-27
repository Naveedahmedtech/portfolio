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

            // 3. Horizontal Project Scroll - LUMINOUS ARCHITECTURE
            // Architecture Fix: Calculate scroll width to strictly respect 20vw offset
            const calculateScroll = () => {
                const totalWidth = horizontal.scrollWidth;
                const viewportWidth = window.innerWidth;
                // scrollWidth includes pl-[20vw] and pr-[80vw]
                // We want to stop exactly when the last card is fully on screen
                return totalWidth - viewportWidth;
            };

            // DWELL PHASE: Let the user see the "Digital Craft" and 1st project static
            // horizontal scroll starts at projectStartTime + 6.5 (2.5 reveal + 4.0 dwell)
            tl.to(
                horizontal,
                {
                    x: () => -calculateScroll(),
                    duration: 20, // High-end cinematic pacing
                    ease: "none",
                },
                projectStartTime + 6.5
            );

            // Project Card Micro-animations (staggered scaling and blue-fade)
            projectArticles.forEach((article, i) => {
                tl.from(article, {
                    scale: 0.9,
                    opacity: 0,
                    filter: "blur(20px)",
                    duration: 3,
                    ease: "power2.out"
                }, projectStartTime + 7 + (i * (10 / projectArticles.length)));
            });

            // Final Fade Out of the whole section
            tl.to(container, { opacity: 0, duration: 2 }, "+=1");

        }, section);

        return () => ctx.revert();
    }, [sectionRef, triggerRef, containerRef, horizontalRef]);
};

export default useExperienceScroll;
