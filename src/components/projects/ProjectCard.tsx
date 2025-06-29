import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

export interface Project {
  title: string;
  image: string;
  link: string;
  active?: boolean;
}

const ProjectCard: React.FC<Project> = ({ title, image, link, active = false }) => {
  // Use theme classes for background
  const cardBg = active ? "bg-primary" : "bg-surface";
  // Title color: white on primary; secondary text on surface
  const titleColor = active ? "text-surface" : "text-textSecondary";
  // CTA: solid surface on active, semi-transparent surface on inactive
  const ctaBg = active ? "bg-surface text-primary" : "bg-surface/50 text-textPrimary";

  return (
    <div
      className={`${cardBg} relative rounded-[30px] p-6 pt-8 pb-24 overflow-hidden transition-transform duration-300 ${
        active ? "scale-[1.04]" : ""
      }`}
    >
      {/* Title + divider */}
      <h3
        className={`text-xl font-semibold mb-6 ${titleColor} border-b border-surface/20 pb-4`}
      >
        {title}
      </h3>

      {/* 3-layer ghost stack + foreground */}
      <div className="relative w-full h-44">
        {/* deepest layer */}
        <div
          className="absolute inset-0 rounded-2xl bg-surface/10 transform scale-[0.88] translate-y-8 z-10"
        />
        {/* middle layer */}
        <div
          className="absolute inset-0 rounded-2xl bg-surface/10 transform scale-[0.92] translate-y-4 z-20"
        />
        {/* top ghost layer */}
        <div
          className="absolute inset-0 rounded-2xl bg-surface/10 transform scale-[0.96] translate-y-2 z-30"
        />
        {/* foreground image */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden border border-surface/20 shadow-md z-40">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* CTA circle */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute bottom-4 right-4 w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 ${ctaBg} border border-surface/30`}
      >
        <FaExternalLinkAlt size={18} />
      </a>
    </div>
  );
};

export default ProjectCard;
