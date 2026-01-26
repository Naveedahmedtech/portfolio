import React, { useEffect, useMemo, useRef } from "react";
import { FaHandPointer } from "react-icons/fa";
import {
  getCursorAnchors,
  subscribeCursorAnchors,
  type CursorAnchor,
} from "../state/cursorAnchors";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const isInteractiveTarget = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      "a, button, [role='button'], input, textarea, select, [data-cursor='hover']"
    )
  );
};

const CustomCursor: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const tetherRef = useRef<HTMLCanvasElement>(null);

  const targetRef = useRef({ x: 0, y: 0 });
  const coreRefPos = useRef({ x: 0, y: 0 });
  const ringRefPos = useRef({ x: 0, y: 0 });
  const haloRefPos = useRef({ x: 0, y: 0 });
  const lastRefPos = useRef({ x: 0, y: 0 });
  const hoverRef = useRef(false);
  const hoverBlendRef = useRef(0);
  const activeRef = useRef(false);
  const anchorsRef = useRef<CursorAnchor[]>(getCursorAnchors());
  const clickStrengthRef = useRef(0);
  const rippleStartRef = useRef<number | null>(null);
  const hoverPulseRef = useRef<number | null>(null);
  const tetherSizeRef = useRef({ width: 0, height: 0 });

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const isCoarsePointer = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  }, []);

  useEffect(() => {
    if (isCoarsePointer) return;
    document.body.classList.add("cursor-hidden");
    return () => document.body.classList.remove("cursor-hidden");
  }, [isCoarsePointer]);

  useEffect(() => {
    const updateAnchors = () => {
      anchorsRef.current = getCursorAnchors();
    };
    updateAnchors();
    return subscribeCursorAnchors(updateAnchors);
  }, []);

  useEffect(() => {
    if (isCoarsePointer) return;
    const handleMove = (event: PointerEvent) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
      activeRef.current = true;

      const isHovering = isInteractiveTarget(event.target);
      if (hoverRef.current !== isHovering) {
        hoverRef.current = isHovering;
        rootRef.current?.classList.toggle("cursor-hover", isHovering);
        if (isHovering) {
          hoverPulseRef.current = performance.now();
          rippleStartRef.current = performance.now();
        }
      }
    };

    const handleLeave = () => {
      activeRef.current = false;
    };

    const handleDown = () => {
      clickStrengthRef.current = 1;
      rippleStartRef.current = performance.now();
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("blur", handleLeave);
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("blur", handleLeave);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [isCoarsePointer]);

  useEffect(() => {
    if (isCoarsePointer) return;
    const canvas = tetherRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      tetherSizeRef.current = { width, height };
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [isCoarsePointer]);

  useEffect(() => {
    if (isCoarsePointer) return;
    const root = rootRef.current;
    const core = coreRef.current;
    const halo = haloRef.current;
    const ring = ringRef.current;
    const hand = handRef.current;
    const pulse = pulseRef.current;
    const ripple = rippleRef.current;
    const canvas = tetherRef.current;
    const ctx = canvas?.getContext("2d");

    if (!root || !core || !halo || !ring || !hand || !pulse || !ripple) return;

    const setTransform = (
      el: HTMLElement,
      x: number,
      y: number,
      scaleX = 1,
      scaleY = 1,
      rotation = 0
    ) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rotation}rad) scale(${scaleX}, ${scaleY})`;
    };

    let frameId = 0;
    const animate = (time: number) => {
      const target = targetRef.current;
      const corePos = coreRefPos.current;
      const ringPos = ringRefPos.current;
      const haloPos = haloRefPos.current;
      const lastPos = lastRefPos.current;

      corePos.x += (target.x - corePos.x) * 0.25;
      corePos.y += (target.y - corePos.y) * 0.25;
      ringPos.x += (target.x - ringPos.x) * 0.18;
      ringPos.y += (target.y - ringPos.y) * 0.18;
      haloPos.x += (target.x - haloPos.x) * 0.12;
      haloPos.y += (target.y - haloPos.y) * 0.12;

      const vx = corePos.x - lastPos.x;
      const vy = corePos.y - lastPos.y;
      lastPos.x = corePos.x;
      lastPos.y = corePos.y;

      const speed = clamp(Math.hypot(vx, vy), 0, 30);
      const stretch = reduceMotion ? 1 : clamp(1 + speed * 0.018, 1, 1.35);
      const squash = reduceMotion ? 1 : clamp(1 - speed * 0.01, 0.75, 1);
      const rotation = reduceMotion || speed < 0.5 ? 0 : Math.atan2(vy, vx);

      const hoverTarget = hoverRef.current ? 1 : 0;
      hoverBlendRef.current += (hoverTarget - hoverBlendRef.current) * 0.12;
      const hoverBlend = hoverBlendRef.current;
      const hoverScale = 1 + hoverBlend * 0.6;
      const ringScale = 1 + hoverBlend * 0.25;
      const ringRotation = rotation + hoverBlend * 0.6;
      const handScale = 0.9 + hoverBlend * 0.4;
      const clickScale = 1 - clickStrengthRef.current * 0.2;

      if (clickStrengthRef.current > 0) {
        clickStrengthRef.current = Math.max(
          0,
          clickStrengthRef.current - 0.08
        );
      }

      if (activeRef.current) {
        root.style.opacity = "1";
      } else {
        root.style.opacity = "0";
      }

      setTransform(core, corePos.x, corePos.y, clickScale, clickScale);
      setTransform(
        halo,
        haloPos.x,
        haloPos.y,
        stretch * hoverScale,
        squash * hoverScale,
        rotation
      );
      setTransform(
        ring,
        ringPos.x,
        ringPos.y,
        stretch * ringScale,
        squash * ringScale,
        ringRotation
      );
      const handOffsetX = hoverBlend * 4;
      const handOffsetY = hoverBlend * 6;
      setTransform(
        hand,
        ringPos.x + handOffsetX,
        ringPos.y + handOffsetY,
        handScale,
        handScale,
        0
      );

      halo.style.opacity = `${0.48 + hoverBlend * 0.32}`;
      ring.style.opacity = `${Math.max(
        0.05,
        (0.62 + hoverBlend * 0.18) * (1 - hoverBlend * 1.15)
      )}`;
      hand.style.opacity = `${hoverBlend}`;
      core.style.opacity = `${0.85 - hoverBlend * 0.75}`;

      if (!reduceMotion && hoverPulseRef.current) {
        const t = clamp((time - hoverPulseRef.current) / 420, 0, 1);
        const pulseScale = 1 + t * 1.1;
        const pulseOpacity = (1 - t) * 0.35;
        setTransform(pulse, corePos.x, corePos.y, pulseScale, pulseScale, 0);
        pulse.style.opacity = `${pulseOpacity}`;
        if (t >= 1) {
          hoverPulseRef.current = null;
          pulse.style.opacity = "0";
        }
      } else if (reduceMotion) {
        pulse.style.opacity = "0";
      } else {
        pulse.style.opacity = "0";
      }

      if (!reduceMotion && rippleStartRef.current) {
        const t = clamp((time - rippleStartRef.current) / 360, 0, 1);
        const rippleScale = 1 + t * 2.2;
        const rippleOpacity = (1 - t) * 0.35;
        setTransform(ripple, corePos.x, corePos.y, rippleScale, rippleScale, 0);
        ripple.style.opacity = `${rippleOpacity}`;
        if (t >= 1) {
          rippleStartRef.current = null;
          ripple.style.opacity = "0";
        }
      } else if (reduceMotion) {
        ripple.style.opacity = "0";
      } else {
        ripple.style.opacity = "0";
      }

      if (ctx) {
        const { width, height } = tetherSizeRef.current;
        ctx.clearRect(0, 0, width, height);
        if (activeRef.current) {
          const anchors = anchorsRef.current;
          if (anchors.length) {
            let nearest: CursorAnchor | null = null;
            let closest = Infinity;
            for (const anchor of anchors) {
              const dx = anchor.x - corePos.x;
              const dy = anchor.y - corePos.y;
              const dist = Math.hypot(dx, dy);
              if (dist < closest) {
                closest = dist;
                nearest = anchor;
              }
            }

            if (nearest && closest < 140) {
              const gradient = ctx.createLinearGradient(
                corePos.x,
                corePos.y,
                nearest.x,
                nearest.y
              );
              gradient.addColorStop(0, "rgba(210, 236, 255, 0.32)");
              gradient.addColorStop(0.5, "rgba(210, 236, 255, 0.68)");
              gradient.addColorStop(1, "rgba(210, 236, 255, 0.28)");

              ctx.strokeStyle = gradient;
              ctx.lineWidth = 1.4;
              ctx.beginPath();
              ctx.moveTo(corePos.x, corePos.y);
              ctx.lineTo(nearest.x, nearest.y);
              ctx.stroke();

              const pulseT = (time * 0.0012) % 1;
              const px = corePos.x + (nearest.x - corePos.x) * pulseT;
              const py = corePos.y + (nearest.y - corePos.y) * pulseT;
              ctx.fillStyle = "rgba(230, 248, 255, 0.9)";
              ctx.beginPath();
              ctx.arc(px, py, 2.6, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    targetRef.current = { x: startX, y: startY };
    coreRefPos.current = { x: startX, y: startY };
    ringRefPos.current = { x: startX, y: startY };
    haloRefPos.current = { x: startX, y: startY };
    lastRefPos.current = { x: startX, y: startY };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isCoarsePointer, reduceMotion]);

  if (isCoarsePointer) return null;

  return (
    <>
      <canvas className="cursor-tether" ref={tetherRef} />
      <div className="custom-cursor" ref={rootRef}>
        <div className="cursor-halo" ref={haloRef} />
        <div className="cursor-ring" ref={ringRef} />
        <div className="cursor-hand" ref={handRef}>
          <FaHandPointer className="cursor-hand-icon" aria-hidden />
        </div>
        <div className="cursor-pulse" ref={pulseRef} />
        <div className="cursor-ripple" ref={rippleRef} />
        <div className="cursor-core" ref={coreRef} />
      </div>
    </>
  );
};

export default CustomCursor;
