import React, { useEffect, useMemo, useRef } from "react";
import { FaHandPointer } from "react-icons/fa";

const CustomCursor: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });

  const hoverRef = useRef(false);
  const activeRef = useRef(false);
  const scaleRef = useRef(1);
  const tiltRef = useRef(0);

  const isCoarsePointer = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  }, []);

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (isCoarsePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      activeRef.current = true;

      const hovering = Boolean((e.target as Element)?.closest("a, button, [role='button'], input, textarea, [data-cursor='hover']"));
      if (hoverRef.current !== hovering) {
        hoverRef.current = hovering;
      }
    };

    const handleMouseDown = () => { scaleRef.current = 0.85; };
    const handleMouseUp = () => { scaleRef.current = 1; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isCoarsePointer]);

  useEffect(() => {
    if (isCoarsePointer || reduceMotion) return;

    let frameId: number;
    const animate = () => {
      const mouse = mouseRef.current;
      const ring = ringRef.current;
      const follower = followerRef.current;
      const hand = handRef.current;
      const dot = dotRef.current;
      const root = rootRef.current;

      const lerpRing = 0.18;
      const lerpFollower = 0.1;

      ringPos.current.x += (mouse.x - ringPos.current.x) * lerpRing;
      ringPos.current.y += (mouse.y - ringPos.current.y) * lerpRing;

      followerPos.current.x += (mouse.x - followerPos.current.x) * lerpFollower;
      followerPos.current.y += (mouse.y - followerPos.current.y) * lerpFollower;

      const vx = mouse.x - lastPos.current.x;
      lastPos.current = { x: mouse.x, y: mouse.y };
      const targetTilt = vx * 0.08;
      tiltRef.current += (targetTilt - tiltRef.current) * 0.15;

      if (root) {
        root.style.opacity = activeRef.current ? "1" : "0";
      }

      if (dot) {
        dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(${scaleRef.current})`;
      }

      if (ring) {
        const hoverScale = hoverRef.current ? 2.5 : 1;
        const finalScale = scaleRef.current * hoverScale;
        ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${finalScale})`;
        // Smooth color transition via CSS if needed, but here via style for immediate react-less updates
        ring.style.color = hoverRef.current ? "var(--accent)" : "rgba(184, 106, 74, 0.4)";
      }

      if (follower) {
        const hoverScale = hoverRef.current ? 3.5 : 1;
        follower.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%) scale(${hoverScale})`;
        follower.style.opacity = hoverRef.current ? "0.3" : "0.08";
      }

      if (hand) {
        const hoverScale = hoverRef.current ? 1.4 : 0.5;
        const rotation = tiltRef.current;
        const offsetX = hoverRef.current ? 10 : 0;
        const offsetY = hoverRef.current ? 12 : 0;

        hand.style.transform = `translate3d(${mouse.x + offsetX}px, ${mouse.y + offsetY}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${hoverScale * scaleRef.current})`;
        hand.style.opacity = hoverRef.current ? "1" : "0";
      }

      frameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frameId);
  }, [isCoarsePointer, reduceMotion]);

  if (isCoarsePointer) return null;

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-[9999] opacity-0 transition-opacity duration-300">

      {/* 1. Atmospheric Follower (High Blur) */}
      <div
        ref={followerRef}
        className="absolute h-10 w-10 rounded-full bg-primary blur-[40px] will-change-transform"
      />

      {/* 2. VECTOR Architectural Ring (Vector-based to fix pixel issues) */}
      <svg
        ref={ringRef}
        className="absolute h-8 w-8 will-change-transform transition-colors duration-500"
        viewBox="0 0 32 32"
        fill="none"
      >
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* 3. Neural Hand (Precision Interaction) */}
      <div
        ref={handRef}
        className="absolute text-2xl text-accent opacity-0 will-change-transform drop-shadow-[0_0_12px_rgba(226,161,119,0.4)] transition-opacity duration-500"
      >
        <FaHandPointer />
      </div>

      {/* 4. Precision Hub Dot */}
      <div
        ref={dotRef}
        className="absolute h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)] will-change-transform"
      />
    </div>
  );
};

export default CustomCursor;
