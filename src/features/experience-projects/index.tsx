import React, { useRef, useState } from "react";
import { workExperience } from "../../data/experience";
import { projects, type Project } from "../../data/projects";
import useExperienceScroll from "./hooks/useExperienceScroll";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

// Premium Luminous Cyber-Glass Card Component
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}> = ({ project, index, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations for high-end feel
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 });
  const shiftX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 150, damping: 20 });
  const shiftY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 150, damping: 20 });

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
      className="group relative h-[58vh] min-h-[420px] w-[85vw] flex-shrink-0 sm:w-[52rem]"
      style={{
        perspective: 2000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-[3.5rem] border border-white/20 bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-3xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out group-hover:border-accent/50 group-hover:shadow-[0_60px_150px_-30px_rgba(0,0,0,1)]"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated Accent Glows (Visible) */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-[100px] transition-opacity duration-1000 group-hover:bg-accent/30" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-primary/15 blur-[120px] transition-opacity duration-1000 group-hover:bg-primary/25" />

        {/* Visual Layer: Image with Vibrant Contrast */}
        <div className="absolute inset-x-0 top-0 h-full w-full overflow-hidden">
          <motion.div
            className="absolute inset-0 h-full w-full scale-110 pointer-events-none"
            style={{ x: shiftX, y: shiftY, z: -50 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover opacity-80 mix-blend-lighten transition-all duration-1000 group-hover:opacity-100 group-hover:scale-105"
            />
          </motion.div>
          {/* Luminous Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0908] via-[#0a0908]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/20 to-transparent" />
        </div>

        {/* Floating Metadata */}
        <div className="absolute left-10 top-10 z-20 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl lg:left-14 lg:top-14">
          <span className="font-display text-2xl font-light tracking-tighter text-white/50 group-hover:text-accent transition-colors">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col p-12 lg:p-20">
          <div className="flex items-start justify-between">
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl border border-white/20 shadow-2xl lg:h-24 lg:w-24"
              whileHover={{ scale: 1.1, rotate: -5 }}
              style={{ transform: "translateZ(100px)" }}
            >
              <project.icon className="text-4xl text-primary lg:text-5xl" />
            </motion.div>

            <div className="flex gap-4" style={{ transform: "translateZ(80px)" }}>
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-3xl transition-all hover:bg-accent/20 hover:border-accent/40"
                  whileHover={{ y: -5, scale: 1.1 }}
                >
                  <FaExternalLinkAlt className="text-lg text-white/70" />
                </motion.a>
              )}
              <motion.a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-3xl transition-all hover:bg-accent/20 hover:border-accent/40"
                whileHover={{ y: -5, scale: 1.1 }}
              >
                <FaGithub className="text-2xl text-white/70" />
              </motion.a>
            </div>
          </div>

          <div className="mt-auto max-w-2xl" style={{ transform: "translateZ(120px)" }}>
            <h4 className="font-display text-5xl font-light leading-none tracking-tighter text-white lg:text-7xl">
              {project.title}
            </h4>
            <div className="mt-6 h-[2px] w-24 bg-gradient-to-r from-accent to-transparent transition-all duration-1000 group-hover:w-full" />

            <p className="mt-8 text-lg font-light leading-relaxed text-white/60 lg:mt-12 lg:text-2xl">
              {project.description}
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-xl border border-white/10 bg-white/[0.05] px-5 py-2 text-[0.75rem] font-bold uppercase tracking-[0.25em] text-white/40 backdrop-blur-3xl"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="flex items-center px-4 py-2 text-[0.75rem] font-bold text-white/10">
                  + MORE
                </span>
              )}
            </div>

            <motion.button
              onClick={() => onSelect(project)}
              className="group/cta mt-16 flex items-center gap-8 text-[0.8rem] font-bold uppercase tracking-[0.5em] text-accent lg:mt-24"
              whileHover={{ x: 15 }}
            >
              <span className="relative">
                EXPLORE BUILD
                <span className="absolute -bottom-3 left-0 h-px w-0 bg-accent transition-all duration-700 group-hover/cta:w-full" />
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/20 bg-accent/5 backdrop-blur-3xl transition-all group-hover/cta:bg-accent/20 group-hover/cta:border-accent/50">
                <FaChevronRight className="text-sm transition-transform group-hover/cta:translate-x-1" />
              </div>
            </motion.button>
          </div>
        </div>
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
    <section id="experience-projects" ref={sectionRef} className="relative z-10 overflow-visible">
      {/* Pinned Experience & Project Container */}
      <div ref={triggerRef} className="relative h-[800vh] w-full">
        <div ref={containerRef} className="sticky top-0 h-screen w-full overflow-hidden bg-transparent">
          {/* Atmospheric Vibe */}
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute right-[-15%] top-[-5%] h-[80rem] w-[80rem] rounded-full bg-primary/10 blur-[250px]" />
            <div className="absolute left-[-10%] bottom-[-10%] h-[70rem] w-[70rem] rounded-full bg-accent/10 blur-[200px]" />
          </div>

          <div className="relative z-10 h-full w-full">
            {/* Phase 1: Professional Narrative (Vertical) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 lg:px-20">
              {workExperience.map((exp, idx) => (
                <div
                  key={exp.id}
                  data-exp-layer={idx + 1}
                  className="absolute inset-x-0 mx-auto flex max-w-6xl flex-col items-center justify-center pt-20 text-center opacity-0 lg:pt-28"
                >
                  <span className="text-[0.7rem] font-bold uppercase tracking-[1em] text-accent/30">
                    {exp.period} // {exp.location}
                  </span>
                  <h3 className="mt-10 font-display text-[clamp(2.5rem,8vw,7rem)] font-light leading-none tracking-tighter text-white">
                    {exp.role} <br />
                    <span className="opacity-20">at {exp.company}</span>
                  </h3>
                  <p className="mt-12 max-w-3xl text-xl font-light leading-relaxed text-white/50 lg:text-3xl lg:leading-relaxed">
                    "{exp.description}"
                  </p>

                  {/* High-Fidelity Outcome Grid */}
                  <div className="mt-16 grid gap-10 text-left sm:grid-cols-3 lg:mt-24">
                    {exp.outcomes.map((outcome, oIdx) => (
                      <div
                        key={oIdx}
                        className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-10 backdrop-blur-3xl transition-all hover:border-accent/40 hover:bg-white/[0.05]"
                      >
                        <div className="h-px w-12 bg-accent/40 mb-8 group-hover:w-full transition-all duration-1000" />
                        <p className="text-[0.9rem] font-light leading-relaxed text-white/40 group-hover:text-white/80 transition-colors">
                          {outcome}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Phase 2: Project Gallery (LUMINOUS Architecture) */}
            <div
              data-projects-layer
              className="absolute inset-0 flex translate-y-full flex-col justify-center opacity-0"
            >
              {/* Grand Header */}
              <div className="mb-12 px-6 lg:mb-20 lg:px-[15vw]">
                <motion.div
                  className="flex flex-col gap-6"
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: "circOut" }}
                >
                  <span className="text-[0.7rem] font-bold uppercase tracking-[1.2em] text-accent/40 ml-2">TECH STRIKE</span>
                  <h2 className="font-display text-[clamp(3rem,12vw,9rem)] font-light leading-[0.8] tracking-tighter text-white">
                    DIGITAL <br />
                    <span className="bg-gradient-to-r from-accent via-primary/50 to-accent bg-clip-text text-transparent italic font-serif">
                      CRAFT.
                    </span>
                  </h2>
                </motion.div>
              </div>

              {/* Stabilized Horizontal Gallery */}
              <div
                ref={horizontalRef}
                className="flex items-center gap-32 pl-[20vw] pr-[80vw]"
              >
                {projects.map((project, index) => (
                  <ProjectCard key={project.title} project={project} index={index} onSelect={setSelectedProject} />
                ))}
              </div>

              {/* Minimal Scroll Hint */}
              <div className="absolute bottom-20 left-[15vw] flex items-center gap-12 opacity-20">
                <div className="h-[2px] w-48 bg-gradient-to-r from-white to-transparent" />
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.8em] text-white">Nav System Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Overlay - Enhanced Luminous Design */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] flex items-center justify-center bg-[#0a0908]/98 p-6 backdrop-blur-[50px] lg:p-24"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 120, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 120, scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 28 }}
              className="relative h-full w-full max-w-[120rem] overflow-hidden rounded-[4rem] border border-white/10 bg-[#0a0908] shadow-[0_0_250px_rgba(0,0,0,1)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-12 top-12 z-[610] flex h-20 w-20 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl transition-all hover:bg-accent/20 hover:scale-110"
              >
                <FaTimes className="text-2xl text-white/40" />
              </button>

              <div className="flex h-full flex-col lg:flex-row">
                <div className="relative h-1/2 w-full overflow-hidden lg:h-full lg:w-[60%]">
                  <img src={selectedProject.image} alt={selectedProject.title} className="h-full w-full object-cover grayscale-[30%] opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0908] via-transparent to-transparent" />
                </div>

                <div className="flex flex-1 flex-col overflow-y-auto p-16 lg:p-32">
                  <span className="text-[0.75rem] font-bold uppercase tracking-[1.2em] text-accent/40">TECH SPECIFICATIONS</span>
                  <h3 className="mt-10 font-display text-6xl font-light tracking-tighter text-white lg:text-9xl">{selectedProject.title}</h3>
                  <div className="mt-16 flex flex-wrap gap-4">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="rounded-2xl border border-white/10 bg-white/[0.05] px-8 py-4 text-[0.9rem] font-bold uppercase tracking-widest text-white/30">{tag}</span>
                    ))}
                  </div>
                  <p className="mt-20 text-2xl font-light leading-relaxed text-white/50 lg:text-3xl lg:leading-relaxed">{selectedProject.description}</p>

                  <div className="mt-auto flex gap-12 pt-28">
                    {selectedProject.live && (
                      <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 text-[0.85rem] font-bold uppercase tracking-[0.6em] text-accent hover:text-white transition-all">
                        DEPLOYED SITE <FaExternalLinkAlt />
                      </a>
                    )}
                    <a href={selectedProject.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 text-[0.85rem] font-bold uppercase tracking-[0.6em] text-white/20 hover:text-white transition-all">
                      REPOSITORY <FaGithub />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperienceProjects;
