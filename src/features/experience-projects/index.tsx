import React, { useRef, useState } from "react";
import { workExperience } from "../../data/experience";
import { projects, type Project } from "../../data/projects";
import useExperienceScroll from "./hooks/useExperienceScroll";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

// Premium 3D Tilt Card Component
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}> = ({ project, index, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      className="group relative h-[48vh] w-[88vw] flex-shrink-0 sm:w-[46rem]"
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-primary/10 bg-gradient-to-br from-[#0f0d0a] via-[#0d0b09] to-[#0a0908] shadow-[0_0_60px_rgba(0,0,0,0.8)] transition-all duration-500"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated Glow Border Effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(226,161,119,0.15) 0%, transparent 50%)`,
          }}
        />

        {/* Project Number Badge */}
        <div className="absolute left-8 top-8 z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 backdrop-blur-md border border-accent/20 shadow-lg">
          <span className="font-display text-xl text-accent/90">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Interactive Visual Layer */}
        <div className="absolute inset-0 z-0">
          {/* Parallax Image Container */}
          <motion.div
            className="absolute inset-0 scale-110 transition-all duration-1000 group-hover:scale-100"
            style={{ translateZ: -50 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover opacity-30 grayscale transition-all duration-1000 group-hover:opacity-50 group-hover:grayscale-[50%]"
            />
          </motion.div>

          {/* Multi-layer Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b09] via-[#0d0b09]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d0b09] to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col p-10 lg:p-12">

          {/* Top Row: Icon + Links */}
          <div className="flex items-start justify-between">
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-lg border border-primary/15 shadow-xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <project.icon className="text-3xl text-primary" />
            </motion.div>

            <div className="flex gap-3">
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-primary/10 backdrop-blur-md transition-colors hover:bg-accent/20 hover:border-accent/40"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt className="text-sm text-textSecondary/80" />
                </motion.a>
              )}
              <motion.a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-primary/10 backdrop-blur-md transition-colors hover:bg-accent/20 hover:border-accent/40"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="text-sm text-textSecondary/80" />
              </motion.a>
            </div>
          </div>

          {/* Title with Animated Underline */}
          <div className="mt-auto">
            <h4 className="relative inline-block font-display text-4xl tracking-tight text-white lg:text-5xl">
              {project.title}
              <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-gradient-to-r from-accent to-primary transition-all duration-500 group-hover:w-full" />
            </h4>

            <p className="mt-6 line-clamp-2 max-w-lg text-base leading-relaxed text-textSecondary/70 lg:text-lg">
              {project.description}
            </p>

            {/* Tech Stack Pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.slice(0, 5).map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-full border border-primary/10 bg-white/[0.02] px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-textSecondary/50 backdrop-blur-sm transition-all hover:border-accent/30 hover:text-textSecondary"
                >
                  {tag}
                </motion.span>
              ))}
              {project.tags.length > 5 && (
                <span className="rounded-full border border-primary/5 bg-white/[0.01] px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-textSecondary/30">
                  +{project.tags.length - 5} more
                </span>
              )}
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={() => onSelect(project)}
              className="group/btn mt-10 flex items-center gap-3 rounded-full bg-gradient-to-r from-accent/20 to-primary/10 px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-accent/90 backdrop-blur-sm border border-accent/20 transition-all hover:from-accent/30 hover:to-primary/20 hover:border-accent/40"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Explore Project</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <FaChevronRight className="text-xs" />
              </motion.span>
            </motion.button>
          </div>
        </div>

        {/* Floating Accent Lines */}
        <div className="pointer-events-none absolute right-0 top-1/4 h-40 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute bottom-1/4 right-20 h-20 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </motion.div>
    </motion.article>
  );
};

const ExperienceProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useExperienceScroll({ sectionRef, triggerRef, containerRef, horizontalRef });

  return (
    <section
      id="experience-projects"
      ref={sectionRef}
      className="relative z-10 overflow-visible"
    >
      {/* Pinned Experience & Project Container */}
      <div ref={triggerRef} className="relative h-[600vh] w-full">
        <div
          ref={containerRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-transparent"
        >
          {/* Atmospheric Layer */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute right-[10%] top-[10%] h-[60rem] w-[60rem] rounded-full bg-primary/10 blur-[180px]" />
            <div className="absolute left-[5%] bottom-[5%] h-[50rem] w-[50rem] rounded-full bg-accent/5 blur-[150px]" />
          </div>

          <div className="relative z-10 h-full w-full">

            {/* Phase 1: Professional Narrative (Vertical) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 lg:px-16">
              {workExperience.map((exp, idx) => (
                <div
                  key={exp.id}
                  data-exp-layer={idx + 1}
                  className="absolute inset-x-0 mx-auto flex max-w-5xl flex-col items-center justify-center pt-20 text-center opacity-0 lg:pt-24"
                >
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.6em] text-accent/60">
                    {exp.period} — {exp.location}
                  </span>
                  <h3 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-tight text-textPrimary">
                    {exp.role} <br />
                    <span className="text-secondary/30">at {exp.company}</span>
                  </h3>
                  <p className="mt-8 max-w-2xl text-lg text-textSecondary/80">
                    {exp.description}
                  </p>

                  {/* Google XYZ Outcomes */}
                  <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
                    {exp.outcomes.map((outcome, oIdx) => (
                      <div key={oIdx} className="group relative rounded-2xl border border-primary/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-accent/30">
                        <div className="h-px w-8 bg-accent/40 mb-4" />
                        <p className="text-xs leading-relaxed text-textSecondary/60 group-hover:text-textSecondary transition-colors">
                          {outcome}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Phase 2: Project Architecture (Horizontal) - ENHANCED */}
            <div
              data-projects-layer
              className="absolute inset-0 flex translate-y-full flex-col justify-start pt-[14vh] opacity-0 lg:pt-[16vh]"
            >
              {/* Section Header */}
              <div className="mb-6 px-6 lg:mb-10 lg:px-20">
                <motion.div
                  className="flex items-end gap-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-tighter text-textPrimary">
                    Featured <br />
                    <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent italic">
                      Systems.
                    </span>
                  </h2>
                  <div className="hidden pb-4 lg:block">
                    <p className="text-sm text-textSecondary/50 max-w-xs">
                      Architected solutions spanning enterprise platforms, AI integrations, and creative tools.
                    </p>
                  </div>
                </motion.div>

                {/* Progress Indicator */}
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-accent/50">
                    Scroll to explore
                  </span>
                  <motion.div
                    className="flex gap-1"
                    animate={{ x: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    <FaChevronRight className="text-xs text-accent/40" />
                    <FaChevronRight className="text-xs text-accent/30" />
                    <FaChevronRight className="text-xs text-accent/20" />
                  </motion.div>
                </div>
              </div>

              {/* Horizontal Project Scroll */}
              <div
                ref={horizontalRef}
                className="flex items-center gap-10 px-6 lg:px-20 pr-[70vw]"
              >
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                    onSelect={setSelectedProject}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Project Detail Overlay - Enhanced */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 p-4 backdrop-blur-3xl lg:p-16"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 80, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 80, scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative h-full w-full max-w-7xl overflow-hidden rounded-[2.5rem] border border-primary/15 bg-gradient-to-br from-[#0f0d0a] via-[#0d0b09] to-[#0a0908] shadow-[0_0_150px_rgba(0,0,0,1)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated Close Button */}
              <motion.button
                onClick={() => setSelectedProject(null)}
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 400, damping: 20 }}
                className="absolute right-6 top-6 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-primary/15 backdrop-blur-xl transition-all hover:bg-accent/20 hover:border-accent/40 hover:rotate-90 hover:scale-110 lg:right-10 lg:top-10 lg:h-14 lg:w-14"
              >
                <FaTimes className="text-lg" />
              </motion.button>

              <div className="flex h-full flex-col lg:flex-row">
                {/* Visual Area with Parallax Effect */}
                <motion.div
                  className="relative h-[35%] w-full overflow-hidden lg:h-full lg:w-[50%]"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <motion.img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                  {/* Premium Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-[#0d0b09]/30 to-transparent lg:bg-gradient-to-r" />
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />

                  {/* Floating Project Number */}
                  <motion.div
                    className="absolute bottom-6 left-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-black/50 backdrop-blur-xl border border-accent/20 lg:bottom-10 lg:left-10 lg:h-20 lg:w-20"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="font-display text-2xl text-accent lg:text-3xl">
                      {String(projects.findIndex(p => p.title === selectedProject.title) + 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                </motion.div>

                {/* Content Area with Staggered Animations */}
                <motion.div
                  className="flex flex-1 flex-col overflow-y-auto p-8 lg:p-16"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {/* Header */}
                  <motion.div
                    className="mb-8 flex items-center gap-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/15 shadow-lg">
                      <selectedProject.icon className="text-2xl text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.6rem] font-bold uppercase tracking-[0.5em] text-accent/60">
                        System Architecture
                      </span>
                      <span className="text-[0.65rem] text-textSecondary/30">Technical Deep-Dive</span>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="font-display text-4xl leading-[0.95] tracking-tighter text-textPrimary lg:text-7xl"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    {selectedProject.title}
                  </motion.h3>

                  {/* Tags with Stagger */}
                  <motion.div
                    className="mt-8 flex flex-wrap gap-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {selectedProject.tags.map((tag, i) => (
                      <motion.span
                        key={tag}
                        className="rounded-xl border border-primary/10 bg-white/[0.02] px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-textSecondary/60 backdrop-blur-sm transition-all hover:border-accent/30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.03 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Divider */}
                  <motion.div
                    className="mt-10 h-px w-full bg-gradient-to-r from-accent/20 via-primary/10 to-transparent"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />

                  {/* Description */}
                  <motion.p
                    className="mt-10 text-base leading-relaxed text-textSecondary/70 lg:text-xl lg:leading-relaxed"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {selectedProject.description}
                  </motion.p>

                  {/* Action Buttons */}
                  <motion.div
                    className="mt-auto flex flex-col gap-4 pt-12 sm:flex-row sm:items-center sm:gap-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {selectedProject.live && (
                      <motion.a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-accent/20 to-primary/10 px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.4em] text-accent/90 backdrop-blur-sm border border-accent/20 transition-all hover:from-accent/30 hover:to-primary/20"
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Live
                        <FaExternalLinkAlt className="text-xs transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </motion.a>
                    )}
                    <motion.a
                      href={selectedProject.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.4em] text-textSecondary/60 transition-all hover:text-textSecondary"
                      whileHover={{ x: 5 }}
                    >
                      Source Code
                      <FaGithub className="text-sm transition-transform group-hover:scale-110" />
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ExperienceProjects;
