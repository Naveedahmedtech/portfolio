import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';
import NavigationMenu from './components/NavigationMenu';
import Logo from './components/Logo';
import { motion } from 'framer-motion';
import Footer from '../footer/Footer';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showLinks, setShowLinks] = useState(false); // State for link visibility

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
                setShowLinks(false); // Reset link visibility
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            setShowLinks(false); // Hide links initially when menu opens
            const timeout = setTimeout(() => {
                setShowLinks(true); // Show links after background is visible
            }, 300); // Debounce duration for link visibility

            return () => clearTimeout(timeout);
        } else {
            setShowLinks(false); // Hide links when menu closes
        }
    }, [isMenuOpen]);

    const onLinkClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className='relative'>
            <header
                className={`fixed top-0 w-full z-50 p-4 transition-all duration-500 ease-in-out ${scrolled ? 'bg-surface/80 shadow-lg backdrop-blur-lg' : 'bg-transparent'}`}
            >
                <div className="container mx-auto flex justify-between items-center">
                    <Logo />

                    <nav className="hidden md:flex items-center space-x-8">
                        <NavigationMenu />
                    </nav>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="text-textPrimary dark:text-textPrimary focus:outline-none transition-transform duration-200 transform hover:scale-110"
                            aria-label="Open Menu"
                            aria-expanded={isMenuOpen}
                        >
                            <GiHamburgerMenu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Full-Screen Mobile Navigation */}
            <motion.div
                className={`fixed inset-0 z-50 flex flex-col items-center justify-center`}
                initial={{ opacity: 0 }} // Start hidden
                animate={{ opacity: isMenuOpen ? 1 : 0 }} // Animate in/out
                transition={{ duration: 0.5 }} // Duration for background color
                style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }} // Prevent interactions when closed
            >
                <div className={`bg-background dark:bg-background flex flex-col items-center justify-center w-full h-full transition-all duration-500 ease-in-out relative`}>
                    {/* Background Element for Attraction */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            className="w-[600px] h-[600px] rounded-full bg-gradient-to-r from-accent to-primary opacity-20 filter blur-3xl dark:from-primary dark:to-accent"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 0.25 }}
                            transition={{ duration: 1.5, ease: 'easeInOut' }}
                            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }}
                        ></motion.div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute top-4 right-4 text-textPrimary dark:text-textPrimary text-3xl focus:outline-none transition-transform duration-200 transform hover:scale-110"
                        aria-label="Close Menu"
                    >
                        <MdClose />
                    </button>

                    {/* Show Navigation Links After Background Animation */}
                    {showLinks && <NavigationMenu isMobile onLinkClick={onLinkClick} />}
                </div>
            </motion.div>

            <Outlet />
            <Footer />
        </div>
    );
}
