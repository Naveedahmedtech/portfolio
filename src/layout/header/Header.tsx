import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import Footer from "../footer/Footer";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];



const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");

      // Delay scroll until page renders
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }

    setMenuOpen(false);
  };


  return (
    <>
      {/* HEADER */}
      <motion.header
        className="sticky top-0 z-50 w-full bg-background backdrop-blur-xl border-b border-border shadow-xl"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* LEFT: Logo */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="font-extrabold text-xl tracking-tight"
          >
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient-x"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.7 }}
              >
                Naveed
              </motion.div>
              <motion.div
                className="ml-1 w-2 h-2 rounded-full bg-accent shadow-lg animate-pulse"
                layoutId="logo-dot"
              />
            </Link>
          </motion.div>

          {/* CENTER: Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 relative">
            {navLinks.map((link, idx) => (
              <motion.button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="relative text-textSecondary hover:text-primary transition-all font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                {link.label}
              </motion.button>
            ))}

          </nav>

          {/* RIGHT: Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-surface/70 hover:bg-surface/90 border border-border backdrop-blur shadow-inner"
              whileTap={{ rotate: 180 }}
              whileHover={{ scale: 1.1 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <MdOutlineLightMode className="text-yellow-400" />
              ) : (
                <MdOutlineDarkMode className="text-blue-600" />
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="md:hidden p-2 rounded-full text-textSecondary hover:text-primary"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Open mobile menu"
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 w-full h-full bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 px-6"
          >
            {navLinks.map((link, idx) => (
              <motion.button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-2xl font-semibold text-textSecondary hover:text-primary transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {link.label}
              </motion.button>
            ))}

          </motion.div>
        )}
      </AnimatePresence>

      <Outlet />
      <Footer />
    </>
  );
};

export default Header;
