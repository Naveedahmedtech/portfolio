import React from "react";
import { motion } from "framer-motion";
import { FaCodeBranch, FaUserCheck, FaInfinity, FaTerminal } from "react-icons/fa";

const pillars = [
  {
    icon: <FaTerminal className="text-primary text-2xl" />,
    title: "End-to-End Ownership",
    description:
      "I deliver across the stack, from database schemas to pixel-perfect UIs, ensuring quality, alignment, and a deep sense of product accountability.",
  },
  {
    icon: <FaUserCheck className="text-primary text-2xl" />,
    title: "Human-Centered Logic",
    description:
      "Every decision I make, whether frontend or backend, puts users first. I translate business goals into seamless, intuitive experiences.",
  },
  {
    icon: <FaCodeBranch className="text-primary text-2xl" />,
    title: "Scalable Systems Thinking",
    description:
      "I design modular architectures, reusable components, and clean git flows that grow with the product and the team.",
  },
  {
    icon: <FaInfinity className="text-primary text-2xl" />,
    title: "Iterate to Excellence",
    description:
      "I believe in constant refinement. Every deploy is a chance to learn, optimize, and push the craft forward both technically and experientially.",
  },
];



const About: React.FC = () => {
  return (
    <section 
    id="about" className="bg-background text-textPrimary py-24 px-6"
    >
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Intro */}
        <motion.div
          className="max-w-6xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-widest font-semibold text-accent">
            Behind the Code
          </p>
          <h2 className="text-5xl font-extrabold text-primary leading-tight mt-2">
            Engineer. System Thinker. Builder.
          </h2>
          <p className="text-lg text-textSecondary leading-relaxed mt-6">
            I’m <span className="text-primary font-semibold">Naveed Ahmed</span>, a full-stack product engineer who merges design thinking with technical precision. With deep experience in the <span className="font-medium text-accent">MERN stack</span>, I specialize in turning abstract ideas into performant, scalable digital products. I don’t just write code—I architect solutions: from intuitive interfaces to resilient backend systems.
          </p>
          <p className="text-lg text-textSecondary leading-relaxed mt-4">
            My work balances <span className="text-accent font-medium">UX empathy</span>, <span className="text-accent font-medium">clean architecture</span>, and <span className="text-accent font-medium">system-level thinking</span>. Whether it’s crafting pixel-perfect React components, optimizing APIs, or designing scalable folder structures, I build with clarity, care, and a focus on real-world impact. I thrive in collaborative teams, iterate fast, and ship with intention.
          </p>
          <p className="text-lg text-textSecondary leading-relaxed mt-4">
            On <span className="text-accent font-medium">Upwork</span>, I’ve earned over <span className="font-semibold text-primary">$800+</span> through successful client projects and proudly hold the <span className="text-accent font-medium">Rising Talent</span> badge. It reflects not only technical skill, but also strong communication, reliability, and client satisfaction.
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
