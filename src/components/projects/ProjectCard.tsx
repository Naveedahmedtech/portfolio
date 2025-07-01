import React, { useState } from "react";
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
  icon: Icon,
  image,
  tags,
  live,
  repo,
  reverse = false,
}) => {
  const [expanded, setExpanded] = useState(false);
  const toggleDescription = () => setExpanded(!expanded);

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
          className="w-full h-full object-cover aspect-video rounded-xl"
        />
      </motion.div>

      <div className="w-full lg:w-1/2 space-y-4">
        <div className="flex items-center gap-3">
          <Icon className="text-primary text-xl" />
          <h3 className="text-2xl font-bold text-primary">{title}</h3>
        </div>

        {/* Description with See More */}
        {/* Description with See More */}
        <div className="relative transition-all duration-500 ease-in-out">
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? "max-h-[1000px]" : "max-h-24"
              }`}
          >
            <p className="text-textSecondary text-base leading-relaxed">
              {description}
            </p>
          </div>
          <button
            onClick={toggleDescription}
            className="mt-2 text-sm text-accent font-medium hover:underline focus:outline-none"
          >
            {expanded ? "See Less" : "See More"}
          </button>
        </div>


        {/* Tags */}
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

        {/* Links */}
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
