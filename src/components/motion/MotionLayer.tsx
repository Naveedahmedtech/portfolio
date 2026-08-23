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
    const navigationLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".site-header nav a[href^='#']"));
    const mobileNavigation = document.querySelector<HTMLDetailsElement>(".mobile-navigation");

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

    const handleNavigationClick = (event: Event) => {
      const link = event.currentTarget as HTMLAnchorElement;
      updateActiveSection(link.hash.slice(1));
    };

    navigationLinks.forEach((link) => link.addEventListener("click", handleNavigationClick));

    const closeMobileNavigation = (event: Event) => {
      if ((event.target as HTMLElement).closest("a")) {
        mobileNavigation?.removeAttribute("open");
      }
    };
    mobileNavigation?.addEventListener("click", closeMobileNavigation);

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      root.style.setProperty("--scroll-progress", progress.toString());
      root.style.setProperty("--scroll-position", `${window.scrollY}px`);

      const headerHeight = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 76;
      const threshold = window.scrollY + headerHeight + 24;
      const activeSection = sections.reduce((active, section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        return sectionTop <= threshold
          ? section.getAttribute("data-section") ?? active
          : active;
      }, "");
      updateActiveSection(activeSection);
    };

    const handleScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      navigationLinks.forEach((link) => link.removeEventListener("click", handleNavigationClick));
      mobileNavigation?.removeEventListener("click", closeMobileNavigation);
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
