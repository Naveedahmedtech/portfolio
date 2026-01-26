import React, { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";

type ButtonVariant = "primary" | "ghost";
type ButtonEffect = "magneticPull";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  effect?: ButtonEffect;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-textPrimary shadow-[0_18px_36px_rgba(0,0,0,0.35)]",
  ghost: "border border-white/20 bg-white/5 text-textPrimary backdrop-blur",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  effect = "magneticPull",
  className = "",
  children,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const liftRef = useRef(0);
  const xToRef = useRef<((value: number) => void) | null>(null);
  const yToRef = useRef<((value: number) => void) | null>(null);
  const scaleToRef = useRef<((value: number) => void) | null>(null);
  const baseShadowRef = useRef("");

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const baseShadow =
      variant === "primary"
        ? "0 18px 36px rgba(0,0,0,0.35)"
        : "0 0 0 rgba(0,0,0,0)";
    baseShadowRef.current = baseShadow;

    gsap.set(button, {
      x: 0,
      y: 0,
      scale: 1,
      filter: "brightness(1)",
      boxShadow: baseShadow,
    });
    xToRef.current = gsap.quickTo(button, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    yToRef.current = gsap.quickTo(button, "y", {
      duration: 0.35,
      ease: "power3.out",
    });
    scaleToRef.current = gsap.quickTo(button, "scale", {
      duration: 0.35,
      ease: "power3.out",
    });

    return () => {
      gsap.killTweensOf(button);
    };
  }, [variant]);

  const handleEnter = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      if (!button) return;
      boundsRef.current = button.getBoundingClientRect();
      liftRef.current = -4;
      gsap.to(button, {
        y: liftRef.current,
        scale: 1.02,
        filter: "brightness(1.06)",
        boxShadow: "0 20px 38px rgba(0,0,0,0.4)",
        duration: 0.35,
        ease: "power3.out",
      });

      if (effect !== "magneticPull") return;
      const bounds = boundsRef.current;
      if (!bounds) return;
      const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const relY = (event.clientY - bounds.top) / bounds.height - 0.5;
      xToRef.current?.(relX * 12);
      yToRef.current?.(liftRef.current + relY * 8);
    },
    [effect]
  );

  const handleLeave = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;
    boundsRef.current = null;
    liftRef.current = 0;
    xToRef.current?.(0);
    yToRef.current?.(0);
    scaleToRef.current?.(1);
    gsap.to(button, {
      y: 0,
      scale: 1,
      filter: "brightness(1)",
      boxShadow: baseShadowRef.current,
      duration: 0.35,
      ease: "power2.out",
    });
  }, []);

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (effect !== "magneticPull") return;
      const button = buttonRef.current;
      if (!button) return;
      const bounds = boundsRef.current ?? button.getBoundingClientRect();
      boundsRef.current = bounds;
      const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const relY = (event.clientY - bounds.top) / bounds.height - 0.5;
      xToRef.current?.(relX * 12);
      yToRef.current?.(liftRef.current + relY * 8);
    },
    [effect]
  );

  const handlePress = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;
    scaleToRef.current?.(0.97);
  }, []);

  const handleRelease = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;
    scaleToRef.current?.(1);
  }, []);

  return (
    <button
      ref={buttonRef}
      data-effect={effect}
      className={`button-premium rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-[0.25em] ${variantClasses[variant]} ${className}`}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onPointerMove={handleMove}
      onPointerDown={handlePress}
      onPointerUp={handleRelease}
      onPointerCancel={handleRelease}
      {...rest}
    >
      <span className="button-content">{children}</span>
    </button>
  );
};

export default Button;
