import React from "react";
import { motion } from "framer-motion";
import { FaCodeBranch, FaUserCheck, FaInfinity, FaTerminal } from "react-icons/fa";

const pillars = [
  {
    icon: <FaTerminal className="text-primary text-2xl" />, 
    title: "End-to-End Engineering",
    description: "From database design to React hooks, I build across the stack with a balance of logic, structure, and empathy."
  },
  {
    icon: <FaUserCheck className="text-primary text-2xl" />, 
    title: "People-First Thinking",
    description: "Every function, route, or component exists to serve people — and I build with that focus across all layers."
  },
  {
    icon: <FaCodeBranch className="text-primary text-2xl" />, 
    title: "Scale & Systems",
    description: "I believe in scalable systems — design systems, folder structures, git flows — that empower growth, not complexity."
  },
  {
    icon: <FaInfinity className="text-primary text-2xl" />, 
    title: "Always Iterating",
    description: "What I ship today is better than yesterday, and tomorrow will be better again. Growth is a habit, not a milestone."
  }
];

const About: React.FC = () => {
  return (
    <section id="about" className="bg-background text-textPrimary py-32 px-6">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Intro */}
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-widest font-semibold text-accent">
            Meet the Engineer
          </p>
          <h2 className="text-5xl font-extrabold text-primary leading-tight mt-2">
            Design. Code. Impact.
          </h2>
          <p className="text-lg text-textSecondary leading-relaxed mt-6">
            I'm <span className="text-primary font-semibold">Naveed</span>, a full-stack product engineer who codes with clarity, builds with care, and thinks in systems. Whether it's a micro animation or distributed backend, I craft thoughtful experiences that scale.
          </p>
        </motion.div>

        {/* Pillars Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pillars.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-surface rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 mb-4">
                {item.icon}
                <h4 className="text-lg font-semibold text-primary">{item.title}</h4>
              </div>
              <p className="text-sm text-textSecondary">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
