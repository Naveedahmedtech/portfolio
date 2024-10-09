import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationMenu from './components/NavigationMenu';
import Logo from './components/Logo';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        // Close mobile menu if resizing to desktop view
        const handleResize = () => {
            if (window.innerWidth >= 768) { // Tailwind's md breakpoint is 768px
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 w-full z-50 p-4 transition-all duration-500 ease-in-out ${scrolled ? 'bg-surface/80 shadow-lg backdrop-blur-lg' : 'bg-transparent'
                    }`}
            >
                <div className="container mx-auto flex justify-between items-center">
                    <Logo />

                    {/* Desktop Navigation - Always visible on larger screens */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavigationMenu />
                    </div>

                    {/* Hamburger Icon for mobile screens */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="text-textPrimary dark:text-textPrimary focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Full-Screen Mobile Navigation */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-surface dark:bg-surface z-50 flex flex-col items-center justify-center transition-all duration-500 ease-in-out">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute top-4 right-4 text-textPrimary dark:text-textPrimary text-3xl focus:outline-none"
                        aria-label="Close Menu"
                    >
                        &times;
                    </button>

                    <NavigationMenu isMobile />

                    <div className="mt-8 text-center">
                        <p className="text-xl text-textSecondary">Welcome to my portfolio!</p>
                    </div>
                </div>
            )}

            <Outlet />
        </>
    );
}
