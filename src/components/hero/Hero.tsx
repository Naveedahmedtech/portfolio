import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

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

      {/* Right Image - Bottom Blend */}
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 z-0 flex items-end">
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

      {/* Left Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center">
<div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-0 md:hidden" />

        <motion.div
          className="w-full md:w-1/2 space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-textPrimary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              I help teams
            </motion.span>
            <motion.span
              className="text-primary block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 80 }}
            >
              ship better digital products
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              with clarity, code, and craft.
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-textPrimary md:text-textSecondary text-base md:text-lg max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ x: 2 }}
          >
            From high-converting UI to scalable backend logic — I combine modern frameworks, motion, and AI to solve meaningful problems.
          </motion.p>

          <motion.div
            className="flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.div whileHover="hover" initial="rest" animate="rest">
              <motion.div
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.08 },
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-background font-semibold shadow-md hover:shadow-xl group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300 blur-xl"
                  />
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

            <motion.div whileHover="hover" initial="rest" animate="rest">
              <motion.div
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.08 },
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary text-primary font-semibold hover:bg-primary hover:text-background group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition duration-300 blur-xl"
                  />
                  <span className="relative z-10">Let’s Build Something Smart</span>
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
