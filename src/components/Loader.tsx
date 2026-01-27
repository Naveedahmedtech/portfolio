import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
    onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        const progressBar = progressRef.current;
        const text = textRef.current;
        const counter = counterRef.current;

        if (!container || !progressBar || !text || !counter) return;

        const tl = gsap.timeline({
            onComplete: () => {
                // Exit animation
                gsap.to(container, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: 'power4.inOut',
                    onComplete: onComplete,
                });
            },
        });

        // Initial state
        gsap.set([text, counter], { opacity: 0, y: 20 });
        gsap.set(progressBar, { scaleX: 0, transformOrigin: 'left center' });

        // Entrance animation
        tl.to(text, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
        })
            .to(
                counter,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'power3.out',
                },
                '-=0.3'
            )
            .to(progressBar, {
                scaleX: 1,
                duration: 1.8,
                ease: 'power2.inOut',
                onUpdate: function () {
                    const prog = Math.round(this.progress() * 100);
                    setProgress(prog);
                },
            })
            .to(
                {},
                {
                    duration: 0.3,
                }
            );

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
            {/* Ambient Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
                <div className="absolute right-1/4 top-1/4 h-[40vh] w-[40vh] rounded-full bg-accent/5 blur-[80px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Logo / Name */}
                <span
                    ref={textRef}
                    className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-[0.3em] text-textPrimary uppercase"
                >
                    Naveed Ahmed
                </span>

                {/* Progress Bar Container */}
                <div className="relative h-[2px] w-48 overflow-hidden bg-primary/10">
                    <div
                        ref={progressRef}
                        className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent"
                    />
                </div>

                {/* Counter */}
                <span
                    ref={counterRef}
                    className="font-mono text-xs tracking-[0.5em] text-textSecondary/50"
                >
                    {progress}%
                </span>
            </div>

            {/* Decorative Lines */}
            <div className="absolute bottom-20 left-1/2 flex -translate-x-1/2 gap-2">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="h-8 w-px bg-gradient-to-b from-primary/20 to-transparent"
                        style={{ animationDelay: `${i * 0.2}s` }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Loader;
