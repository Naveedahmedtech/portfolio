export interface ExperienceItem {
    id: string;
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
    outcomes: string[];
    keywords: string[];
}

export const workExperience: ExperienceItem[] = [
    {
        id: "upwork-senior",
        company: "Upwork (Global Freelance)",
        role: "Senior Full-Stack Engineer & Consultant",
        period: "2024 - Present",
        location: "Remote",
        description: "Orchestrating complex web ecosystems for international clients, focusing on architectural scalability and AI-driven workflow optimization.",
        outcomes: [
            "Accomplished a 40% reduction in API latency for a Meta-scale advertising platform by implementing advanced caching and edge computing strategies.",
            "Delivered high-fidelity engineering solutions for enterprise document management, serving 500+ daily active professional users.",
            "Optimized business ROI by integrating custom AI agents that automated 60% of manual campaign management tasks."
        ],
        keywords: ["Scalability", "ROI", "Orchestration", "High-Fidelity"]
    },
    {
        id: "indie-architect",
        company: "Personal Tech Stack / R&D",
        role: "Systems Architect & Creative Technologist",
        period: "2020 - 2024",
        location: "Global",
        description: "Designing modular application architectures that bridge the gap between creative frontend design and robust backend governance.",
        outcomes: [
            "Built and deployed a suite of 10+ high-performance applications reaching thousands of users using Next.js, TypeScript, and Three.js.",
            "Architected a multi-tenant CMS structure that reduced client onboarding time by 75% through automated workspace orchestration.",
            "Established a performance-first engineering culture in shared repositories, maintainting 95+ Lighthouse scores across all builds."
        ],
        keywords: ["Governance", "Resilience", "Mentorship", "System Security"]
    }
];

export default workExperience;
