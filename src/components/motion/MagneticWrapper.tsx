import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MagneticWrapperProps {
    children: React.ReactNode;
    range?: number;
    sensitivity?: number;
    className?: string;
}

const MagneticWrapper: React.FC<MagneticWrapperProps> = ({
    children,
    range = 80,
    sensitivity = 0.4,
    className = "",
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const xTo = gsap.quickTo(container, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(container, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = container.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const distanceX = clientX - centerX;
            const distanceY = clientY - centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance < range) {
                // Boost z-index when within range to avoid clipping with neighbors
                container.style.zIndex = "100";
                xTo(distanceX * sensitivity);
                yTo(distanceY * sensitivity);
            } else {
                container.style.zIndex = "";
                xTo(0);
                yTo(0);
            }
        };

        const handleMouseLeave = () => {
            container.style.zIndex = "";
            xTo(0);
            yTo(0);
        };

        window.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [range, sensitivity]);

    return (
        <div ref={containerRef} className={`relative flex items-center justify-center ${className}`}>
            {children}
        </div>
    );
};

export default MagneticWrapper;
