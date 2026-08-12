"use client";

import { useEffect } from "react";

const revealSelector = "[data-reveal]";
const sectionSelector = "[data-section]";

export function MotionLayer() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");

    const revealElements = Array.from(document.querySelectorAll(revealSelector));
    const sections = Array.from(document.querySelectorAll<HTMLElement>(sectionSelector));
    const navigationLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("nav a[href^='#']"));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    const updateActiveSection = (activeSection: string) => {
      navigationLinks.forEach((link) => {
        const isActive = link.hash === `#${activeSection}`;
        link.toggleAttribute("data-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          updateActiveSection(visibleSection.target.getAttribute("data-section") ?? "");
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => sectionObserver.observe(section));

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      root.style.setProperty("--scroll-progress", progress.toString());
      root.style.setProperty("--scroll-position", `${window.scrollY}px`);
    };

    const handleScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      root.classList.remove("motion-ready");
      root.style.removeProperty("--scroll-progress");
      root.style.removeProperty("--scroll-position");
    };
  }, []);

  return (
    <>
      <div className="motion-backdrop" aria-hidden="true">
        <div className="motion-grid" />
        <div className="motion-thread motion-thread-one">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="motion-thread motion-thread-two">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="scroll-progress" aria-hidden="true" />
    </>
  );
}
