// src/layout/header/Header.tsx

import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import { useTheme } from "../../context/ThemeContext";
import { FiMenu, FiX } from "react-icons/fi";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    return (
        <>
            <header className="
      sticky top-0 z-50 w-full 
      bg-background backdrop-blur-md shadow-md
      transition-colors duration-300
    ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-extrabold tracking-tight text-primary">
                        <span className="text-primary">My</span><span className="text-secondary">Portfolio</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavItem
                                key={link.href}
                                label={link.label}
                                href={link.href}
                                isActive={location.pathname === link.href}
                            />
                        ))}
                    </nav>

                    {/* Right Controls */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="text-xl text-textSecondary hover:text-primary transition-colors duration-200"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <MdOutlineLightMode size={22} /> : <MdOutlineDarkMode size={22} />}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden text-2xl text-textSecondary hover:text-primary transition-colors duration-200"
                            onClick={() => setMobileOpen(!isMobileOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>  
                </div>

                {/* Mobile Dropdown */}
                {isMobileOpen && (
                    <div className="md:hidden px-4 pb-4 pt-2 border-t border-border bg-surface shadow-inner animate-slide-down">
                        <nav className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <NavItem
                                    key={link.href}
                                    label={link.label}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    isActive={location.pathname === link.href}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </header>
            <Outlet />
        </>
    );
};

export default Header;
