import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { FaPlus, FaTimes } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience-projects" },
  { label: "Contact", href: "#contact" },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const handleNavClick = useCallback(
    (href: string, closeMenuAfter = false) =>
      (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (!href.startsWith("#")) return;
        event.preventDefault();
        const target = document.querySelector(href);
        if (!target) return;

        if (closeMenuAfter) {
          setMenuOpen(false);
        }

        // Calibrated Offset for perfectly centered content
        const offset = 120;

        gsap.to(window, {
          duration: 1.5,
          ease: "power4.inOut",
          scrollTo: { y: target, offsetY: offset, autoKill: true },
        });
      },
    []
  );

  // HEADER MORPHING ON SCROLL
  useLayoutEffect(() => {
    const header = headerRef.current;
    const inner = innerRef.current;
    if (!header || !inner) return;

    // Reset initial border to ensure no white artifact
    gsap.set(inner, { border: "1px solid rgba(184, 106, 74, 0)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        id: "header-morph",
        trigger: "body",
        start: "top -50",
        end: "top -200",
        scrub: true,
      },
    });

    tl.to(inner, {
      padding: "0.85rem 3.5rem", // Increased horizontal padding
      backgroundColor: "rgba(13, 11, 9, 0.9)", // Darker, more solid glass
      backdropFilter: "blur(24px)",
      borderRadius: "100px",
      border: "1px solid rgba(184, 106, 74, 0.2)", // Primary accent border
      width: "max(500px, 75%)", // Ensure logo and nav stay separated
      marginTop: "1.25rem",
      boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 20px rgba(184, 106, 74, 0.1)",
      duration: 1,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getById("header-morph")?.kill();
    };
  }, []);

  // MOBILE MENU ANIMATION
  useEffect(() => {
    const overlay = overlayRef.current;
    const items = navContainerRef.current?.querySelectorAll("a");
    if (!overlay || !items) return;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();

      tl.set(overlay, { display: "flex", opacity: 0 })
        .to(overlay, { opacity: 1, backdropFilter: "blur(40px)", duration: 0.6, ease: "power2.out" })
        .fromTo(items,
          { y: 60, opacity: 0, scale: 0.9, rotateX: -20 },
          { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" },
          "-=0.3"
        );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
        }
      });
    }
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-[110] flex justify-center transition-all duration-500"
      >
        <div
          ref={innerRef}
          className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 transition-all duration-500 lg:px-16"
        >
          <a
            href="#hero"
            onClick={handleNavClick("#hero")}
            className="group relative flex items-center gap-3 font-display text-sm uppercase tracking-[0.5em] text-textPrimary"
          >
            <span className="relative z-10 transition-all group-hover:text-accent group-hover:tracking-[0.6em]">Naveed</span>
            <div className="absolute -inset-x-4 -inset-y-2 scale-0 bg-primary/5 blur-xl transition-transform group-hover:scale-100" />
          </a>

          {/* Desktop Nav */}
          <nav ref={navRef} className="hidden items-center gap-12 text-[0.6rem] font-bold uppercase tracking-[0.4em] text-textSecondary/60 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative transition-all hover:text-textPrimary hover:tracking-[0.5em]"
                onClick={handleNavClick(item.href)}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md transition-all hover:border-accent/60 hover:bg-primary/10"
          >
            <div className="relative h-4 w-4">
              <FaPlus className={`absolute inset-0 transition-all duration-500 ${menuOpen ? "rotate-45 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
              <FaTimes className={`absolute inset-0 transition-all duration-500 ${menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-45 scale-0 opacity-0"}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Premium Mobile Menu Overlay */}
      {typeof document !== "undefined" && createPortal(
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[100] hidden flex-col items-center justify-center bg-black/95 p-10 lg:p-20"
          style={{ perspective: "1000px" }}
        >
          <div className="mb-14 text-center">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.6em] text-accent/40">
              System Navigation
            </span>
          </div>

          <nav ref={navContainerRef} className="flex flex-col items-center gap-8 text-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick(item.href, true)}
                className="group font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-none tracking-tighter text-textPrimary transition-all hover:text-accent hover:scale-105"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-20 border-t border-primary/10 pt-10 text-center">
            <p className="max-w-xs text-xs leading-relaxed text-textSecondary/30">
              Engineering visionary systems with a clean balance of performance and discipline.
            </p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Header;
