import React from "react";
import { FaFilm, FaPenFancy, FaInstagram, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import movieProject from "../../assets/images/projects/project-movie.png";
import blogProject from "../../assets/images/projects/project-blog.png";
import chilloutProject from "../../assets/images/projects/project-chillout.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "Movie App",
    description: "React + TMDB app with Redux and trailer support. Includes genre filters, animations, and responsive design.",
    icon: <FaFilm className="text-primary text-xl" />, 
    image: movieProject,
    live: "#",
    repo: "#",
    tags: ["React", "Redux", "API", "Framer Motion"],
  },
  {
    title: "Blog Project",
    description: "Full-stack Markdown blog with admin dashboard, theming, and clean post management.",
    icon: <FaPenFancy className="text-primary text-xl" />,
    image: blogProject,
    live: "#",
    repo: "#",
    tags: ["Next.js", "MongoDB", "CMS", "Auth"],
  },
  {
    title: "Chillout Social",
    description: "Minimalist Instagram clone with real-time chat, image feed, and custom theming.",
    icon: <FaInstagram className="text-primary text-xl" />,
    image: chilloutProject,
    live: "#",
    repo: "#",
    tags: ["MERN", "Socket.io", "Cloudinary"],
  },
];

const ProjectsCarousel3D: React.FC = () => {
  return (
    <section id="projects" className="bg-background py-32 px-6 text-textPrimary">
      <div className="max-w-6xl mx-auto space-y-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm uppercase font-semibold tracking-widest text-accent">
            Creative Showcase
          </p>
          <h2 className="text-5xl font-extrabold text-primary leading-tight">
            Real Products. Thoughtful Design.
          </h2>
          <p className="text-textSecondary mt-4 max-w-2xl mx-auto">
            Real-world solutions crafted through precision, motion, and modern web tech — built to engage, scale, and last.
          </p>
        </motion.div>

        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`flex flex-col lg:flex-row ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""} items-center gap-10`}
          >
            <motion.div
              className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            >
              <img src={project.image} alt={project.title} className="object-cover w-full h-64 sm:h-96" />
            </motion.div>
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="flex items-center gap-3">
                {project.icon}
                <h3 className="text-2xl font-bold text-primary">{project.title}</h3>
              </div>
              <p className="text-textSecondary text-base leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium bg-surface border border-border rounded-full text-textPrimary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-6">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                >
                  <FaGithub /> GitHub
                </a>
              </div>
            </div>
          </motion.div>
        ))}

        {/* CTA at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center pt-10"
        >
          <Link
            to="/projects"
            className="inline-block px-6 py-3 rounded-full bg-primary text-surface font-medium hover:opacity-90 transition"
          >
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsCarousel3D;
