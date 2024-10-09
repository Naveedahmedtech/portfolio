import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

interface NavLink {
    label: string;
    to: string;
}

export default function NavLinks({ isMobile = false, onLinkClick }: { isMobile?: boolean, onLinkClick?: () => void }) {
    const links: NavLink[] = useMemo(() => [
        { label: 'Home', to: '#home' },
        { label: 'About', to: '#about' },
        { label: 'Projects', to: '#projects' },
        { label: 'Contact', to: '#contact' },
    ], []);

    const [activeSection, setActiveSection] = useState<string>('#home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = links.map(link => document.querySelector(link.to));
            let currentSection = '#home';
            sections.forEach((section, index) => {
                if (section && section.getBoundingClientRect().top <= window.innerHeight / 2) {
                    currentSection = links[index].to;
                }
            });
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [links]);

    return (
        <nav className={`${isMobile ? 'flex flex-col space-y-8 items-center' : 'flex space-x-8'}`}>
            {links.map((link, index) => {
                const isActive = activeSection === link.to;

                return (
                    <motion.div
                        key={link.to}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: isMobile ? index * 0.2 + 0.2 : index * 0.1,
                            ease: "easeOut"
                        }}
                    >
                        <a
                            href={link.to}
                            onClick={onLinkClick}
                            className={`${isMobile ? 'text-2xl font-bold' : 'text-lg font-medium'} text-textPrimary hover:text-accent dark:text-textPrimary dark:hover:text-blue-300 transition-colors duration-300 relative group ${isActive ? 'text-blue-300' : ''}`}
                        >
                            {link.label}
                            <motion.span
                                className={`absolute bottom-0 left-0 h-0.5 ${isMobile ? '' : 'w-0 group-hover:w-full'} bg-blue-300 transition-all duration-500 ease-in-out`}
                                animate={{ width: isActive ? '100%' : '0%' }}
                            ></motion.span>
                        </a>
                    </motion.div>
                );
            })}
        </nav>
    );
}
