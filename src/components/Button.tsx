import React, { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import MagneticWrapper from "./motion/MagneticWrapper";

type ButtonVariant = "primary" | "ghost";
type ButtonEffect = "magneticPull";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  effect?: ButtonEffect;
  magneticRange?: number;
  magneticSensitivity?: number;
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  effect = "magneticPull",
  magneticRange = 120,
  magneticSensitivity = 0.45,
  className = "",
  children,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(wipeRef.current, { x: "-110%", skewX: -25 });
    gsap.set(text2Ref.current, { y: "110%" }); // Start slightly lower than 100% for safety
    gsap.set(glowRef.current, { opacity: 0, scale: 0 });

    return () => {
      gsap.killTweensOf([
        wipeRef.current,
        glowRef.current,
        text1Ref.current,
        text2Ref.current,
        textContainerRef.current,
        buttonRef.current
      ]);
    };
  }, []);

  const handleEnter = useCallback(() => {
    // 1. Sharp Skewed Wipe
    gsap.fromTo(wipeRef.current,
      { x: "-110%" },
      { x: "110%", duration: 0.8, ease: "expo.out" }
    );

    // 2. Rolling Text Transition (Marquee)
    gsap.to(text1Ref.current, { y: "-110%", duration: 0.6, ease: "power4.inOut" });
    gsap.to(text2Ref.current, { y: "0%", duration: 0.6, ease: "power4.inOut" });

    // 3. Glow Reveal
    gsap.to(glowRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });

    // 4. Subtle Scale Lift
    gsap.to(buttonRef.current, { scale: 1.05, duration: 0.4, ease: "power2.out" });
  }, []);

  const handleLeave = useCallback(() => {
    // 1. Reset Text (Roll Back)
    gsap.to(text1Ref.current, { y: "0%", duration: 0.5, ease: "power4.inOut" });
    gsap.to(text2Ref.current, { y: "110%", duration: 0.5, ease: "power4.inOut" });

    // 2. Glow Hide
    gsap.to(glowRef.current, { opacity: 0, scale: 0, duration: 0.4, ease: "power2.in" });

    // 3. Reset Scale and Position
    gsap.to(buttonRef.current, { scale: 1, duration: 0.4, ease: "power2.inOut" });

    // Reset text container parallax
    gsap.to(textContainerRef.current, { x: 0, y: 0, duration: 0.6, ease: "power2.inOut" });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // A. Move inner glow relative to mouse
    gsap.to(glowRef.current, {
      x,
      y,
      duration: 0.4,
      ease: "power2.out",
    });

    // B. Micro-Parallax "Shifter" for the Text Container
    // This makes the text move slightly towards the cursor inside the button
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) * 0.25; // Increased sensitivity for "realism"
    const deltaY = (y - centerY) * 0.25;

    gsap.to(textContainerRef.current, {
      x: deltaX,
      y: deltaY,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  const buttonContent = (
    <button
      ref={buttonRef}
      className={`group relative overflow-hidden rounded-full border px-8 py-4 text-[0.65rem] font-bold uppercase tracking-[0.3em] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(184,106,74,0.25)] ${variant === "primary"
          ? "bg-primary border-primary/20 text-white"
          : "bg-surface/40 border-primary/30 text-textPrimary backdrop-blur-md"
        } ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMouseMove}
      {...rest}
    >
      {/* 1. Sharp Skewed Wipe Layer */}
      <div ref={wipeRef} className="absolute inset-y-0 left-0 w-full bg-white/20 pointer-events-none z-0" />

      {/* 2. Interactive Spotlight Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-white/20 blur-[50px] z-0"
      />

      {/* 3. Rolling Text Container - Compact height (h-5 = 1.25rem / 20px) */}
      <div ref={textContainerRef} className="relative z-10 h-5 overflow-hidden pointer-events-none flex flex-col items-center justify-center">
        <span ref={text1Ref} className="flex items-center justify-center gap-3 will-change-transform">
          {children}
        </span>
        <span ref={text2Ref} className="absolute flex items-center justify-center gap-3 will-change-transform">
          {children}
        </span>
      </div>
    </button>
  );

  if (effect === "magneticPull") {
    return (
      <MagneticWrapper range={magneticRange} sensitivity={magneticSensitivity}>
        {buttonContent}
      </MagneticWrapper>
    );
  }

  return buttonContent;
};

export default Button;
