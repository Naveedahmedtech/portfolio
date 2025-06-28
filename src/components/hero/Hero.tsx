import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
    return (
        <section id="home" className="relative w-full h-screen bg-background text-textPrimary overflow-hidden">

            {/* === RIGHT SIDE FULL IMAGE WITH THEME BACKGROUND === */}
            {/* RIGHT IMAGE BLOCK */}
            <div className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-background z-0 flex items-center justify-center">
                <img
                    src="/images/naveed.png"
                    alt="Naveed"
                    className="w-full h-full object-cover object-top z-10"
                />
            </div>


            {/* === LEFT CONTENT === */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center">
                <div className="w-full md:w-1/2 space-y-8">

                    {/* HEADLINE */}
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-textPrimary">
                        I build <span className="text-primary">modern</span>,<br />
                        scalable web applications.
                    </h1>

                    {/* SUBTEXT */}
                    <p className="text-base md:text-lg text-textSecondary max-w-lg leading-relaxed">
                        I’m <span className="font-semibold text-primary">Naveed</span>, a MERN stack developer blending performance, design, and maintainability to craft top-tier user experiences.
                    </p>

                    {/* CTA */}
                    <Link
                        to="/contact"
                        className="inline-block px-6 py-3 rounded-xl bg-primary text-background font-semibold shadow-md hover:bg-primary/90 transition"
                    >
                        Let’s Connect →
                    </Link>
                </div>
            </div>

        </section>
    );
};

export default Hero;
