import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaHandPointer } from "react-icons/fa";
import gsap from "gsap";

const CustomCursor: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<SVGSVGElement>(null);
  const trailRefs = useRef<(SVGSVGElement | null)[]>([]);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const speed = useRef(0);
  const isHovering = useRef(false);
  const isMouseDown = useRef(false);

  // Trail history
  const history = useRef<{ x: number, y: number }[]>([]);
  const TRAIL_COUNT = 5;

  const hoverProgress = useRef(0);

  const isCoarsePointer = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  }, []);

  useEffect(() => {
    if (isCoarsePointer) return;

    // --- QUICK SETTERS ---
    const setRingPos = gsap.quickSetter(ringRef.current, "css");
    const setFollowerPos = gsap.quickSetter(followerRef.current, "css");
    const setHandPos = gsap.quickSetter(handRef.current, "css");
    const setPointerPos = gsap.quickSetter(pointerRef.current, "css");

    const setTrailPos = trailRefs.current.map(ref =>
      ref ? gsap.quickSetter(ref, "css") : null
    );

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      const hovering = !!target.closest("a, button, [role='button'], input, textarea, [data-cursor='hover']");

      if (hovering !== isHovering.current) {
        isHovering.current = hovering;

        // Tween the progress for the ticker to use
        gsap.to(hoverProgress, {
          current: hovering ? 1 : 0,
          duration: 0.4,
          ease: "power2.inOut"
        });

        gsap.to(ringRef.current, {
          scale: hovering ? 2.5 : 1,
          color: hovering ? "var(--accent)" : "rgba(184, 106, 74, 0.4)",
          opacity: hovering ? 0.6 : 0.4,
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(followerRef.current, {
          scale: hovering ? 3.5 : 1,
          opacity: hovering ? 0.3 : 0.08,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(handRef.current, {
          scale: hovering ? 1.4 : 0,
          opacity: hovering ? 1 : 0,
          duration: 0.4,
          ease: "back.out(1.7)",
        });
        gsap.to(pointerRef.current, {
          opacity: hovering ? 0.5 : 1,
          duration: 0.4,
        });

        // Stagger trail opacity on hover
        trailRefs.current.forEach((ref, i) => {
          gsap.to(ref, {
            opacity: hovering ? 0.15 : (1 - i / TRAIL_COUNT) * 0.4,
            duration: 0.4,
            delay: hovering ? 0 : i * 0.05
          });
        });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown.current = true;
      const id = Date.now();
      setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1000);

      gsap.to(pointerRef.current, {
        scale: 0.8,
        duration: 0.1,
      });
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
      gsap.to(pointerRef.current, {
        scale: isHovering.current ? 0.6 : 1,
        duration: 0.3,
        ease: "back.out(2)",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // --- ANIMATION REEL ---
    const ticker = () => {
      // Calculate speed/velocity for stretching
      const dx = mouse.current.x - lastMouse.current.x;
      const dy = mouse.current.y - lastMouse.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Velocity smoothing
      speed.current += (distance - speed.current) * 0.15;
      const velocity = Math.min(speed.current / 8, 1.5);
      // const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Not used for ring anymore

      lastMouse.current = { ...mouse.current };

      // LERPing positions
      const lerp = 0.15;
      delayedMouse.current.x += (mouse.current.x - delayedMouse.current.x) * lerp;
      delayedMouse.current.y += (mouse.current.y - delayedMouse.current.y) * lerp;

      // Update History for Trails
      history.current.unshift({ ...mouse.current });
      if (history.current.length > TRAIL_COUNT * 4) {
        history.current.pop();
      }

      // Apply Pointer (Surgical Accuracy - Z must be 0 for click precision)
      const hp = hoverProgress.current || 0;
      const baseScale = 1 - hp * 0.2;

      const tiltX = Math.max(Math.min(dy * 1.5, 45), -45);
      const tiltY = Math.max(Math.min(-dx * 1.5, 45), -45);

      setPointerPos({
        // Use z=0 to avoid parallax misalignment with DOM elements
        transform: `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${baseScale + velocity * 0.1 * (1 - hp)})`,
      });

      // Apply Trails (Echoes stay slightly behind in Z for depth)
      setTrailPos.forEach((setter, i) => {
        if (!setter) return;
        const pos = history.current[(i + 1) * 3] || mouse.current;
        setter({
          // Faint trail echoes can have a tiny Z offset
          transform: `translate3d(${pos.x}px, ${pos.y}px, -2px) rotateX(${tiltX * 0.5}deg) rotateY(${tiltY * 0.5}deg) scale(${(0.9 - i * 0.1) * baseScale})`,
        });
      });

      // Apply Ring
      // const stretch = 1 + velocity * 0.5; // Removed stretching
      // const squash = 1 / stretch; // Removed squashing
      setRingPos({
        transform: `translate3d(${delayedMouse.current.x}px, ${delayedMouse.current.y}px, 0) translate(-50%, -50%) scale(${isHovering.current ? 1.5 : 1})`,
      });

      // Apply Follower
      setFollowerPos({
        transform: `translate3d(${delayedMouse.current.x}px, ${delayedMouse.current.y}px, -10px) translate(-50%, -50%)`,
      });

      // Apply Hand (Perfect Finger Alignment)
      if (isHovering.current) {
        setHandPos({
          // Align the index finger tip roughly at the mouse point
          // FaHandPointer tip is center-top.
          transform: `translate3d(${mouse.current.x}px, ${mouse.current.y + 4}px, 0px) translate(-50%, -10%)`,
        });
      }

      if (rootRef.current) {
        rootRef.current.style.opacity = "1";
      }
    };

    gsap.ticker.add(ticker);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      gsap.ticker.remove(ticker);
    };
  }, [isCoarsePointer]);

  if (isCoarsePointer) return null;

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[9999] opacity-0 transition-opacity duration-300"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >

      {/* Click Ripples */}
      {ripples.map(ripple => (
        <Ripple key={ripple.id} x={ripple.x} y={ripple.y} />
      ))}

      {/* 1. Atmospheric Follower */}
      <div
        ref={followerRef}
        className="absolute h-12 w-12 rounded-full bg-primary blur-[50px] will-change-transform opacity-[0.08]"
      />

      {/* 2. Architectural Ring */}
      <svg
        ref={ringRef}
        className="absolute h-12 w-12 will-change-transform text-primary/30"
        viewBox="0 0 32 32"
        fill="none"
      >
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="currentColor"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* 4. Motion Trails (Echoes) */}
      {[...Array(TRAIL_COUNT)].map((_, i) => (
        <svg
          key={i}
          ref={el => trailRefs.current[i] = el}
          className="absolute h-6 w-6 will-change-transform text-accent/20 mix-blend-screen"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{
            transformOrigin: "0% 0%",
            opacity: (1 - i / TRAIL_COUNT) * 0.4
          }}
        >
          <path
            d="M0 0V19L4.8 14.2L8.5 21L11.5 19.5L8 13L14.5 13L0 0Z"
            stroke="white"
            strokeWidth="0.2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ))}

      {/* 3. Neural Hand */}
      <div
        ref={handRef}
        className="absolute text-2xl text-accent opacity-0 will-change-transform drop-shadow-[0_0_15px_rgba(226,161,119,0.5)]"
      >
        <FaHandPointer />
      </div>

      {/* 4. Neural Vector Pointer (Main) */}
      <svg
        ref={pointerRef}
        className="absolute h-6 w-6 will-change-transform text-accent drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ transformOrigin: "0% 0%" }}
      >
        <defs>
          <linearGradient id="cursorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" />
            <stop offset="100%" stopColor="white" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path
          d="M0 0V19L4.8 14.2L8.5 21L11.5 19.5L8 13L14.5 13L0 0Z"
          fill="url(#cursorGradient)"
          stroke="white"
          strokeWidth="0.5"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

const Ripple: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(ref.current,
      { scale: 0, opacity: 0.5 },
      { scale: 4, opacity: 0, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={ref}
      className="absolute h-4 w-4 rounded-full border border-accent/50"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    />
  );
};

export default CustomCursor;
