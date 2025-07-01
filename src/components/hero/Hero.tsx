import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative w-full h-screen bg-background text-textPrimary overflow-hidden"
    >
      {/* Dynamic Background Animation */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute top-10 left-10 w-60 h-60 bg-primary rounded-full mix-blend-lighten blur-3xl opacity-70 animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full mix-blend-lighten blur-2xl opacity-60 animate-ping" />
      </motion.div>

      {/* Image (mobile full background, desktop right side) */}
      {/* Mobile: background image with stronger vertical overlay */}
      <div className="absolute inset-0 md:hidden z-0">
        <img
          src="/images/naveed.png"
          alt="Naveed"
          className="w-full h-full object-cover object-top"
        />
        {/* Light mode: white overlay; Dark mode: black overlay */}
        <div className="absolute inset-0 z-10 bg-white/80 dark:bg-black/30" />
      </div>




      {/* Desktop: right-side image with bottom blur */}
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 z-0 hidden md:flex items-end">
        <div className="relative w-full h-full">
          <img
            src="/images/naveed.png"
            alt="Naveed"
            loading="lazy"
            className="w-full h-full object-cover object-top z-10"
          />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-20" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-12 flex mt-32">
        <motion.div
          className="w-full md:w-1/2 space-y-5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Designing future-forward<br />
            <span className="text-primary">web & AI products</span><br />
            that scale with purpose and precision.
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-lg max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            I craft performant interfaces, smart systems, and scalable infrastructure using modern frameworks, motion, and AI. Every solution is engineered for clarity, speed, and real-world impact.
          </motion.p>

          <motion.div
            className="flex items-center gap-2 text-sm font-medium text-textPrimary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <FaUpwork className="text-xl text-textPrimary" />
            <span>
              Earning over <span className="font-semibold text-green-500">$800+</span> on Upwork with a <span className="underline underline-offset-4">Rising Talent</span> badge
            </span>
          </motion.div>
          <motion.div
            className="flex flex-col md:flex-row gap-4 pt-2 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {/* Projects CTA */}
            <motion.div whileHover="hover" initial="rest" animate="rest" className="w-full md:w-auto">
              <motion.div
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.08 },
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-background font-semibold shadow-md hover:shadow-xl group relative overflow-hidden w-full md:w-auto whitespace-nowrap"
                >
                  <motion.div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300 blur-xl" />
                  <span className="relative z-10">See What I’ve Built</span>
                  <motion.span
                    className="relative z-10 inline-block"
                    variants={{ rest: { x: 0 }, hover: { x: 6 } }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaArrowRight className="text-background text-sm" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div whileHover="hover" initial="rest" animate="rest" className="w-full md:w-auto">
              <motion.div
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.08 },
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-primary text-primary font-semibold hover:bg-primary hover:text-background group relative overflow-hidden w-full md:w-auto whitespace-nowrap"
                >
                  <motion.div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition duration-300 blur-xl" />
                  <span className="relative z-10">Let’s Build Together</span>
                  <motion.span
                    className="relative z-10 inline-block"
                    variants={{ rest: { x: 0 }, hover: { x: 6 } }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaArrowRight className="text-inherit text-sm" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
