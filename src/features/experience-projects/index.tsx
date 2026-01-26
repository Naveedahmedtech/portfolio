import React, { useRef, useState } from "react";
import { workExperience } from "../../data/experience";
import { projects, type Project } from "../../data/projects";
import useExperienceScroll from "./hooks/useExperienceScroll";
import { FaArrowRight, FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
          className="sticky top-0 h-screen w-full overflow-hidden bg-background"
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
                  className="absolute inset-x-0 mx-auto flex max-w-5xl flex-col items-center justify-center text-center opacity-0"
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
                      <div key={oIdx} className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-accent/20">
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

            {/* Phase 2: Project Architecture (Horizontal) */}
            <div
              data-projects-layer
              className="absolute inset-0 flex translate-y-full flex-col justify-center opacity-0"
            >
              <div className="px-6 lg:px-20 mb-8">
                <h2 className="font-display text-[clamp(4rem,9vw,6.5rem)] leading-none tracking-tighter text-textPrimary">
                  Executed <br /> <span className="text-primary italic">Systems.</span>
                </h2>
              </div>

              <div
                ref={horizontalRef}
                className="flex items-center gap-12 pl-6 lg:pl-20 pr-[50vw]"
              >
                {projects.map((project) => (
                  <article
                    key={project.title}
                    className="group relative h-[75vh] w-[85vw] flex-shrink-0 sm:w-[52rem]"
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[3rem] border border-white/10 bg-[#0d0b09] shadow-2xl transition-all duration-700 hover:border-accent/40">

                      {/* Interactive Visual Overlay */}
                      <div className="absolute inset-0 z-0 opacity-40 transition-all duration-700 group-hover:opacity-70 group-hover:scale-105">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b09] via-[#0d0b09]/80 to-transparent" />
                      </div>

                      <div className="relative z-10 flex h-full flex-col p-10 lg:p-14">
                        {/* Project Meta */}
                        <div className="flex items-start justify-between">
                          <div className="flex flex-col gap-5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md">
                              <project.icon className="text-2xl text-primary/80" />
                            </div>
                            <h4 className="font-display text-4xl tracking-tight text-white transition-colors group-hover:text-accent lg:text-5xl">
                              {project.title}
                            </h4>
                          </div>
                          <div className="flex gap-4">
                            {project.live && (
                              <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-all hover:bg-accent/20 hover:scale-110">
                                <FaExternalLinkAlt className="text-sm" />
                              </a>
                            )}
                            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-all hover:bg-accent/20 hover:scale-110">
                              <FaGithub className="text-sm" />
                            </a>
                          </div>
                        </div>

                        {/* Description & Tags */}
                        <div className="mt-auto max-w-xl">
                          <p className="line-clamp-3 text-base leading-relaxed text-textSecondary/90 lg:text-lg">
                            {project.description}
                          </p>

                          <div className="mt-8 flex flex-wrap gap-2.5">
                            {project.tags.slice(0, 7).map(tag => (
                              <span key={tag} className="rounded-full border border-white/5 bg-white/[0.03] px-5 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-textSecondary/60 backdrop-blur-md">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={() => setSelectedProject(project)}
                            className="mt-12 flex items-center gap-4 text-[0.75rem] font-bold uppercase tracking-[0.4em] text-accent/80 transition-all hover:text-accent hover:translate-x-2"
                          >
                            Project Deep-Dive <FaArrowRight />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Project Detail Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6 backdrop-blur-2xl lg:p-24"
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              className="relative h-full w-full max-w-7xl overflow-hidden rounded-[3.5rem] border border-white/10 bg-[#0d0b09] shadow-[0_0_100px_rgba(0,0,0,1)]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-10 top-10 z-[110] flex h-14 w-14 items-center justify-center rounded-full bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 hover:rotate-90 hover:scale-110"
              >
                <FaTimes className="text-xl" />
              </button>

              <div className="flex h-full flex-col lg:flex-row">
                {/* Visual Area */}
                <div className="relative h-[40%] w-full overflow-hidden lg:h-full lg:w-[55%]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0d0b09]" />
                </div>

                {/* Content Area */}
                <div className="flex flex-1 flex-col overflow-y-auto p-12 lg:p-20">
                  <div className="mb-10 flex items-center gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 shadow-inner">
                      <selectedProject.icon className="text-3xl text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.65rem] font-bold uppercase tracking-[0.6em] text-accent/60">
                        Technical Architecture
                      </span>
                      <span className="text-xs text-textSecondary/40">System Preview</span>
                    </div>
                  </div>

                  <h3 className="font-display text-5xl leading-[0.9] tracking-tighter text-textPrimary lg:text-8xl">
                    {selectedProject.title}
                  </h3>

                  <div className="mt-10 flex flex-wrap gap-3">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-textSecondary/70">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-12 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

                  <p className="mt-12 text-xl leading-relaxed text-textSecondary/80 lg:text-2xl">
                    {selectedProject.description}
                  </p>

                  <div className="mt-auto flex flex-col gap-6 pt-16 sm:flex-row sm:items-center sm:gap-12">
                    {selectedProject.live && (
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 text-[0.8rem] font-bold uppercase tracking-[0.5em] text-accent transition-all hover:text-white"
                      >
                        Live Integration <FaExternalLinkAlt className="transition-transform group-hover:scale-125 group-hover:rotate-12" />
                      </a>
                    )}
                    <a
                      href={selectedProject.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 text-[0.8rem] font-bold uppercase tracking-[0.5em] text-textSecondary transition-all hover:text-white"
                    >
                      Archived Source <FaGithub className="transition-transform group-hover:scale-125 hover:text-white" />
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
