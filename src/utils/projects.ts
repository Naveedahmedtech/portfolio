import {
  FaFilm,
  FaPenFancy,
  FaInstagram,
  FaTools,
  FaStoreAlt,
  FaRobot,
} from "react-icons/fa";
import { IconType } from "react-icons"; 

import movieProject from "../assets/images/projects/project-movie.png";
import blogProject from "../assets/images/projects/project-blog.png";
import chilloutProject from "../assets/images/projects/project-chillout.png";
import issueManagementProject from "../assets/images/projects/issue-management.png";
import houseofpakistanProject from "../assets/images/projects/houseofpakistan.png";
import howmanyhoursProject from "../assets/images/projects/howmanyhours.png";
import metaIntegrationProject from "../assets/images/projects/metaIntegration.png";
import holidaysProject from "../assets/images/projects/holidays.png";

// ✅ Project type
export interface Project {
  title: string;
  description: string;
  icon: IconType;
  image: string;
  live: string;
  repo: string;
  tags: string[];
}

// ✅ Project list
const projects: Project[] = [
  {
    title: "Meta API Integration",
    description:
      "A full-featured advertising platform built with Next.js that integrates the Meta Marketing API to manage multiple ad accounts across various countries. The system supports creation and automation of ad accounts, ad sets, and ads — allowing businesses to run and optimize campaigns at scale. Users can connect their Facebook accounts, schedule ads, and monitor performance via a unified dashboard. An AI assistant (powered by OpenAI, Claude, or Google AI) analyzes data and recommends campaign strategies. All features are gated via subscription using Stripe or Lemon Squeezy.",
    icon: FaRobot,
    image: metaIntegrationProject,
    live: "https://welinkup.io/en",
    repo: "#",
    tags: [
      "Next.js",
      "MongoDB",
      "Meta API",
      "OpenAI",
      "Claude",
      "Google AI",
      "Stripe",
      "Ad Automation",
      "AI Assistant",
      "Tailwind CSS",
      "Shadcn UI",
    ],
  },
  {
    title: "Issue Management",
    description:
      "An advanced issue tracking and collaboration platform engineered with React, Angular, and NestJS. This system empowers users to review, annotate, and manage issues directly on PDF and CAD documents. It features real-time collaboration using WebSockets, dynamic markup tools, layered and context-sensitive sidebars, and modular user roles. The UI supports high-performance rendering for large files, a pluggable architecture for custom panels, state management with RxJS, and a tightly integrated login system with permission controls. Designed for enterprise workflows, it ensures both precision and usability in complex document environments.",
    icon: FaTools,
    image: issueManagementProject,
    live: "https://app.viewsoft.com/",
    repo: "#",
    tags: [
      "React",
      "Angular",
      "NestJS",
      "TypeScript",
      "RxJS",
      "WebSockets",
      "PDF.js",
      "Canvas",
      "SCSS",
    ],
  },
  {
    title: "House of Pakistan",
    description:
      "House of Pakistan is a dynamic cultural and business platform designed to celebrate Pakistan’s heritage while enabling local enterprises to thrive digitally. It blends storytelling, visual richness, and powerful business tools into one seamless experience. Key features include multilingual content, curated heritage galleries, service and product listings, custom order workflows, express store setup, user dashboards, and granular team role access. Businesses can showcase offerings, manage inventories, receive custom orders, and collaborate through role-based permissions all within a unified, interactive interface.",
    icon: FaStoreAlt,
    image: houseofpakistanProject,
    live: "https://houseofpakistan.com",
    repo: "#",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Contentful",
      "MongoDB",
      "Node.js",
      "Role-Based Access Control",
    ],
  },
  {
    title: "How many hours",
    description:
      "A high-performance Next.js 15 application built with TypeScript and Tailwind CSS for calculating driving and flight distances between any two points. It leverages reusable arrow-function React components client-side search inputs, dynamic MapView and FlightMapView rendering, real-time loading states, error handling, and customizable waypoint support. Its modular architecture ensures easy theming and extensibility, showcasing modern best practices in Next.js development.",
    icon: FaFilm,
    image: howmanyhoursProject,
    live: "https://howmanyhours.com",
    repo: "#",
    tags: ["Next.js", "TypeScript", "Maps", "Tailwind", "Flight API"],
  },
  {
    title: "France Holidays",
    description:
      "Dates-Vacances.education is a pure Node.js server-side rendered web application that lets French students, parents, and teachers instantly find upcoming school holidays by zone. Built on Express with EJS templates, it delivers zone-based filtering, interactive calendar views, and on-demand PDF schedule generation. Its modular architecture, smart caching, and mobile-first design ensure blazing performance and SEO-friendly pages, making holiday data updates and theming effortless.",
    icon: FaFilm,
    image: holidaysProject,
    live: "https://dates-vacances.education/",
    repo: "#",
    tags: ["Node.js", "Express", "EJS", "SSR", "SEO", "PDF"],
  },
  {
    title: "Movie App",
    description:
      "React + TMDB app with Redux and trailer support. Includes genre filters, animations, and responsive design.",
    icon: FaFilm,
    image: movieProject,
    live: "https://watchmovienow.netlify.app",
    repo: "#",
    tags: ["React", "Redux", "API", "Framer Motion"],
  },
  {
    title: "Blog Project",
    description:
      "Full-stack Markdown blog with admin dashboard, theming, and clean post management.",
    icon: FaPenFancy,
    image: blogProject,
    live: "https://naveed-blogs.netlify.app/",
    repo: "#",
    tags: ["Next.js", "MongoDB", "CMS", "Auth"],
  },
  {
    title: "Chillout Social",
    description:
      "Minimalist Instagram clone with real-time chat, image feed, and custom theming.",
    icon: FaInstagram,
    image: chilloutProject,
    live: "#",
    repo: "#",
    tags: ["MERN", "Socket.io", "Cloudinary"],
  },
];

export default projects;
