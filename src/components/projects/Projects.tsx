import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import projects from "../../utils/projects";



const Projects: React.FC = () => {
    return (
        <section
         id="projects" className="bg-background px-6 text-textPrimary"
         >
            <div className="max-w-6xl mx-auto space-y-24">
                {/* Heading + CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
                >
                    <div>
                        <p className="text-sm uppercase font-semibold tracking-widest text-accent">
                            Creative Showcase
                        </p>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight mt-2">
                            Real Products. Purposeful Design.
                        </h2>
                        <p className="text-textSecondary mt-4 max-w-xl">
                            Solutions crafted with precision, performance, and personality. Built using modern frameworks, rich interaction, and scalable systems to deliver real-world value.
                        </p>
                    </div>



                    <motion.div whileHover={{ scale: 1.03 }}>
                        <Link
                            to="/projects"
                            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-surface font-medium shadow hover:opacity-90 transition"
                        >
                            Explore Full Portfolio →
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Project Cards */}
                {projects.slice(0, 3).map((project, index) => (
                    <ProjectCard key={index} {...project} reverse={index % 2 !== 0} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
