import React, { useEffect } from "react";
import { motion } from "framer-motion";
import projects from "../../utils/projects";
import ProjectCard from "../../components/projects/ProjectCard";

const Projects: React.FC = () => {
  // ✅ Scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="bg-background py-32 px-6 text-textPrimary min-h-screen">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-4"
        >
          <p className="text-sm uppercase font-semibold tracking-widest text-accent">
            Every Project Matters
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary">
            From Concepts to Products
          </h1>
          <p className="text-textSecondary max-w-2xl mx-auto text-base">
            Here’s a growing collection of solutions I’ve designed, built, and shipped with care — powered by modern web tech and creative intent.
          </p>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} reverse={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
