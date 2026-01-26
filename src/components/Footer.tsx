import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from "react-icons/fa";
import { GITHUB_URL, LINKEDIN_URL } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
    const footerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useLayoutEffect(() => {
        const footer = footerRef.current;
        const content = contentRef.current;
        if (!footer || !content) return;

        const ctx = gsap.context(() => {
            const items = content.children;

            gsap.fromTo(items,
                { y: 40, opacity: 0, scale: 0.98 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: footer,
                        start: "top 95%",
                        toggleActions: "play none none none",
                    }
                }
            );

            // Atmospheric Pulse
            gsap.to(".footer-glow", {
                opacity: 0.3,
                scale: 1.2,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, footer);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative z-10 bg-black py-24 px-6 lg:px-16 border-t border-white/5 overflow-hidden"
        >
            {/* Premium Atmospheric Depth */}
            <div className="footer-glow absolute -bottom-20 left-1/2 -translate-x-1/2 h-[30rem] w-[30rem] rounded-full bg-accent/5 blur-[120px] opacity-0" />

            <div ref={contentRef} className="mx-auto max-w-7xl relative z-10">
                <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">

                    {/* Logo / Brand */}
                    <div className="flex flex-col items-center lg:items-start">
                        <h2 className="font-display text-4xl tracking-tighter text-textPrimary">
                            Naveed <span className="text-secondary">Ahmed.</span>
                        </h2>
                        <p className="mt-4 text-[0.7rem] font-bold uppercase tracking-[0.6em] text-textSecondary/20">
                            Architecting Orchestrated Excellence
                        </p>
                    </div>

                    {/* Social Narrative Slots */}
                    <div className="flex items-center gap-12">
                        {[
                            { icon: FaGithub, href: GITHUB_URL, label: "Neural Network" },
                            { icon: FaLinkedin, href: LINKEDIN_URL, label: "Strategy" },
                            { icon: FaTwitter, href: "https://twitter.com", label: "Broadcast" }
                        ].map((social) => (
                            <a
                                key={social.href}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex flex-col items-center gap-3 transition-all"
                            >
                                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] transition-all group-hover:bg-accent group-hover:text-black hover:-translate-y-2">
                                    <social.icon className="text-2xl" />
                                </div>
                                <span className="text-[0.55rem] font-bold uppercase tracking-[0.3em] text-textSecondary/0 transition-all group-hover:text-textSecondary/40 group-hover:translate-y-1">
                                    {social.label}
                                </span>
                            </a>
                        ))}
                    </div>

                    {/* Status / Location */}
                    <div className="flex flex-col items-center lg:items-end">
                        <div className="flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.03] px-5 py-2 backdrop-blur-md">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
                            <span className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-textSecondary/80">
                                Orbital: Pakistan
                            </span>
                        </div>
                        <p className="mt-4 text-[0.65rem] text-textSecondary/20 italic tracking-wider">
                            Ready for Global Architecture Alignment
                        </p>
                    </div>

                </div>

                <div className="mt-20 flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 lg:flex-row">
                    <p className="text-[0.6rem] uppercase tracking-[0.3em] text-textSecondary/20 font-medium">
                        &copy; {new Date().getFullYear()} — Engineered with discipline. High-Fidelity Execution.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-4 text-[0.7rem] font-bold uppercase tracking-[0.5em] text-accent/40 transition-all hover:text-accent hover:scale-105"
                    >
                        System Return <FaArrowUp className="transition-transform group-hover:-translate-y-2" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
