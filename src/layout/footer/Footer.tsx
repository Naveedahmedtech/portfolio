import React from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, UPWORK_URL } from "../../constants";
import { FaUpwork } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-border text-textSecondary py-12 px-6 backdrop-blur-md">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Logo + Tagline */}
        <div className="space-y-3">
          <Link to="/" className="inline-block text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Naveed
          </Link>
          <p className="text-sm">
            Building pixel-perfect, performance-driven web experiences.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-textPrimary">Explore</h4>
          <a href="#about" className="hover:text-primary transition text-sm">About</a>
          <a href="#projects" className="hover:text-primary transition text-sm">Projects</a>
          <a href="#contact" className="hover:text-primary transition text-sm">Contact</a>
          <a href="/resume.pdf" target="_blank" className="hover:text-primary transition text-sm">Resume</a>
        </div>

        {/* Social Links */}
        <div className="space-y-3">
          <h4 className="font-semibold text-textPrimary">Connect</h4>
          <div className="flex gap-4 text-xl">
            <a href={UPWORK_URL} target="_blank" rel="noreferrer" className="hover:text-primary transition">
              <FaUpwork />
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-primary transition">
              <FaGithub />
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-primary transition">
              <FaLinkedin />
            </a>
            <a href={`mailto:${EMAIL}`} className="hover:text-primary transition">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 pt-6 border-t border-border text-xs text-center">
        <p>
          © {new Date().getFullYear()} Naveed. Crafted with passion & precision.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
