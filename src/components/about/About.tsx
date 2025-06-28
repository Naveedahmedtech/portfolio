import React from "react";
import {
    FaReact,
    FaNodeJs,
    FaGitAlt,
    FaMobileAlt,
} from "react-icons/fa";
import {
    SiMongodb,
    SiGraphql,
    SiVercel,
    SiTailwindcss,
} from "react-icons/si";

const skills = [
    { label: "React & TypeScript", icon: <FaReact /> },
    { label: "Node.js & Express", icon: <FaNodeJs /> },
    { label: "MongoDB & Mongoose", icon: <SiMongodb /> },
    { label: "Tailwind & UI Systems", icon: <SiTailwindcss /> },
    { label: "Responsive Design", icon: <FaMobileAlt /> },
    { label: "REST / GraphQL", icon: <SiGraphql /> },
    { label: "CI/CD & Git", icon: <FaGitAlt /> },
    { label: "Vercel & Netlify", icon: <SiVercel /> },
];

const About: React.FC = () => {
    return (
        <section
            id="about"
            className="w-full bg-background text-textPrimary py-28 px-6"
        >
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12">

                {/* TEXT */}
                <div className="space-y-4">
                    <p className="text-sm uppercase tracking-widest font-semibold text-accent">
                        Who I Am
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-primary">
                        Passionate Dev. <br /> System Thinker.
                    </h2>
                    <p className="text-base sm:text-lg text-textSecondary">
                        I'm <span className="text-primary font-semibold">Naveed</span>, a MERN full-stack engineer obsessed with scale, clean UX, and long-living code. I thrive at the intersection of engineering and experience.
                    </p>
                </div>

                {/* SKILLS */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    {skills.map((skill) => (
                        <div
                            key={skill.label}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                        >
                            <div className="text-xl text-primary">{skill.icon}</div>
                            <span>{skill.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
