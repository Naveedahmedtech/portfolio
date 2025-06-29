import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import type { IconType } from "react-icons"; // ✅ For typing icon component

interface Props {
  title: string;
  description: string;
  icon: IconType; // ✅ Component type, not JSX.Element
  image: string;
  tags: string[];
  live: string;
  repo: string;
  reverse?: boolean;
}

const ProjectCard: React.FC<Props> = ({
  title,
  description,
  icon: Icon, // ✅ Rename for use as JSX
  image,
  tags,
  live,
  repo,
  reverse = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`flex flex-col lg:flex-row ${reverse ? "lg:flex-row-reverse" : ""} items-center gap-10`}
    >
      <motion.div
        className="w-full lg:w-1/2 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition"
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="object-cover w-full h-64 sm:h-96 rounded-xl"
        />
      </motion.div>

      <div className="w-full lg:w-1/2 space-y-4">
        <div className="flex items-center gap-3">
          <Icon className="text-primary text-xl" /> {/* ✅ Render icon here */}
          <h3 className="text-2xl font-bold text-primary">{title}</h3>
        </div>

        <p className="text-textSecondary text-base leading-relaxed">
          {description}
        </p>

        <motion.div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 text-xs font-medium bg-surface border border-border rounded-full text-textPrimary transition"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <div className="flex gap-4 mt-6">
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
          >
            <FaExternalLinkAlt /> Live Demo
          </a>
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
