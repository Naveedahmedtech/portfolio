import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import gsap from "gsap";

type InteractiveTextParams = {
    containerRef: RefObject<HTMLDivElement>;
};

type CharData = {
    el: HTMLElement;
    x: number;
    y: number;
    setX: (v: number) => void;
    setY: (v: number) => void;
    setRX: (v: number) => void;
    setRY: (v: number) => void;
};

const useHeroInteractiveText = ({ containerRef }: InteractiveTextParams) => {
    const charsDataRef = useRef<CharData[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateCharsData = () => {
            const chars = Array.from(container.querySelectorAll(".char-inner")) as HTMLElement[];
            charsDataRef.current = chars.map((char) => {
                const rect = char.getBoundingClientRect();
                return {
                    el: char,
                    // Store center position relative to viewport
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                    setX: gsap.quickSetter(char, "x", "px") as (v: number) => void,
                    setY: gsap.quickSetter(char, "y", "px") as (v: number) => void,
                    setRX: gsap.quickSetter(char, "rotateX", "deg") as (v: number) => void,
                    setRY: gsap.quickSetter(char, "rotateY", "deg") as (v: number) => void,
                };
            });
        };

        const observer = new MutationObserver(() => {
            updateCharsData();
        });

        observer.observe(container, { childList: true, subtree: true });

        const resizeObserver = new ResizeObserver(() => {
            updateCharsData();
        });
        resizeObserver.observe(container);

        updateCharsData();

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const threshold = 180;

            charsDataRef.current.forEach((data) => {
                // Find the closest layer to check visibility
                const layer = data.el.closest('[data-hero-layer]') as HTMLElement | null;
                if (!layer) return;

                // Skip if layer is hidden or nearly invisible
                const style = window.getComputedStyle(layer);
                if (style.display === "none" || style.opacity === "0" || style.visibility === "hidden") return;

                const dx = clientX - data.x;
                const dy = clientY - data.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < threshold) {
                    const strength = 1 - distance / threshold;
                    const pullX = dx * strength * 0.35;
                    const pullY = dy * strength * 0.35;

                    data.setX(pullX);
                    data.setY(pullY);
                    data.setRX(-pullY * 0.4);
                    data.setRY(pullX * 0.4);
                } else {
                    // Reset smoothly if the element is currently offset
                    if (gsap.getProperty(data.el, "x") !== 0) {
                        gsap.to(data.el, {
                            x: 0,
                            y: 0,
                            rotateX: 0,
                            rotateY: 0,
                            duration: 0.8,
                            ease: "power3.out",
                            overwrite: "auto",
                        });
                    }
                }
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            observer.disconnect();
            resizeObserver.disconnect();
        };
    }, [containerRef]);
};

export default useHeroInteractiveText;
