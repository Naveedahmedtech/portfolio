import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaBriefcase, FaQuoteLeft } from "react-icons/fa";

const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="bg-background py-24 px-6 text-textPrimary relative"
    >
      <div className="max-w-4xl mx-auto text-center space-y-16">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-primary"
        >
          Trusted by Clients Who Care About Quality
        </motion.h2>

        {/* Testimonial Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="relative bg-surface border border-border rounded-2xl shadow-xl p-8 md:p-10 space-y-6 text-left overflow-hidden"
        >
          {/* Decorative Quote */}
          <FaQuoteLeft className="absolute top-4 left-4 text-primary opacity-10 text-6xl" />

          {/* Header: Job + Info */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 z-10 relative">
            <div>
              <h3 className="text-lg font-semibold text-green-500">
                Webapp Modification Specialist
              </h3>
              <div className="flex items-center gap-2 text-sm text-textSecondary mt-1">
                <FaStar className="text-yellow-400" />
                <span className="text-textPrimary font-medium">5.0</span>
                <span>• Jul 30, 2024 – Feb 21, 2025</span>
              </div>
            </div>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
              className="text-sm bg-gradient-to-r from-green-600 to-green-400 text-white px-3 py-1 rounded-full font-semibold shadow-md"
            >
              Earned $800+
            </motion.div>
          </div>

          {/* Main Quote */}
          <blockquote className="text-xl md:text-2xl leading-relaxed italic font-medium z-10 relative text-textPrimary">
            “Amazing freelancer — such a talented programmer and what a nice human being!
            You should definitely go for Naveed! Smart, nice and ULTRA REACTIVE!
            Thanks again for the amazing job.”
          </blockquote>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-sm text-textSecondary gap-3 z-10 relative border-t border-border pt-4">
            <a
              href="https://www.upwork.com" // Replace with real link
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-green-400 hover:underline transition"
            >
              <FaBriefcase className="text-green-500" />
              View on Upwork
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
