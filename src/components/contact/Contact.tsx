import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaCheckCircle,
  FaCopy,
  FaUser,
  FaCommentDots,
  FaArrowRight,
} from "react-icons/fa";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, UPWORK_URL } from "../../constants";
import { FaUpwork } from "react-icons/fa6";
import emailjs from "@emailjs/browser";

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);
    setSending(true);

    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_p3fbndq",
        "template_9ielceb",
        formRef.current,
        "QySej9W5hb2wWNBKd"
      )
      .then(() => {
        setSuccess(true);
        formRef.current?.reset();
        setTimeout(() => setSuccess(false), 5000); // Optional auto-hide
      })
      .catch((err) => {
        console.error(err);
        setSuccess(false);
      })
      .finally(() => {
        setSending(false);
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="bg-background py-32 px-6 text-textPrimary">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-sm uppercase font-semibold tracking-widest text-accent">
            Let's Connect
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
            Start a Project <br /> or Just Say Hello 👋
          </h2>
          <p className="text-textSecondary max-w-md">
            Open to full-time roles, freelance work, or remote opportunities.
            If you're hiring, building a team, or just want to connect — I'd love to hear from you.
          </p>

          <div className="flex items-center flex-wrap gap-4 mt-6">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-full hover:bg-surface/80 transition text-sm"
            >
              {copied ? <FaCheckCircle className="text-accent" /> : <FaCopy />}
              {copied ? "Email Copied!" : EMAIL}
            </button>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 text-accent hover:underline text-sm"
            >
              <FaEnvelope /> Send Email
            </a>
          </div>

          <div className="flex gap-4 mt-6 text-xl">
            <a href={UPWORK_URL} target="_blank" rel="noreferrer" className="hover:text-primary transition">
              <FaUpwork />
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-primary transition">
              <FaGithub />
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-primary transition">
              <FaLinkedin />
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE – Contact Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-surface border border-border rounded-2xl p-8 backdrop-blur-md shadow-xl space-y-6"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-textSecondary">
              Name
            </label>
            <div className="flex items-center bg-background border border-border rounded-lg overflow-hidden">
              <span className="px-3 text-textSecondary">
                <FaUser />
              </span>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your Name"
                className="w-full px-3 py-2 text-sm bg-transparent text-textPrimary outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-textSecondary">
              Email
            </label>
            <div className="flex items-center bg-background border border-border rounded-lg overflow-hidden">
              <span className="px-3 text-textSecondary">
                <FaEnvelope />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-3 py-2 text-sm bg-transparent text-textPrimary outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block mb-1 text-sm font-medium text-textSecondary">
              Message
            </label>
            <div className="flex items-start bg-background border border-border rounded-lg overflow-hidden">
              <span className="px-3 pt-3 text-textSecondary">
                <FaCommentDots />
              </span>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Tell me about your project..."
                className="w-full px-3 py-2 text-sm bg-transparent text-textPrimary outline-none focus:ring-2 focus:ring-primary resize-none"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-accent text-surface font-medium py-3 px-6 rounded-full hover:opacity-90 transition inline-flex items-center justify-center gap-2 leading-none"
            disabled={sending}
          >
            <span>Send Message</span>
            <FaArrowRight className="text-sm relative top-[1px]" />
          </button>

          {/* Feedback messages */}
          {sending && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-primary mt-4"
            >
              Sending your message...
            </motion.p>
          )}
          {hasSubmitted && success && !sending && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-accent mt-4"
            >
              ✅ Message sent successfully! I’ll be in touch soon.
            </motion.p>
          )}
          {hasSubmitted && !success && !sending && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-error mt-4"
            >
              ❌ Something went wrong. Please try again.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
