import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi'; // Icons from react-icons

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [, setIsToggling] = useState(false);

    const handleToggle = () => {
        setIsToggling(true);
        toggleTheme();
        setTimeout(() => setIsToggling(false), 500); // Smooth animation
    };

    return (
        <button
            onClick={handleToggle}
            className="relative w-14 h-7 p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-yellow-400 dark:to-red-500 rounded-full shadow-lg focus:outline-none transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl"
        >
            <span className="sr-only">Toggle Theme</span>

            {/* Background track of the toggle switch */}
            <div
                className={`absolute inset-0 rounded-full transition-all duration-500 ease-in-out ${theme === 'dark' ? 'bg-gradient-to-r from-yellow-400 to-red-500' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
                    }`}
            />

            {/* Toggle circle that moves left to right */}
            <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-500 ease-in-out flex items-center justify-center ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
                    }`}
            >
                {theme === 'dark' ? (
                    <FiMoon className="text-yellow-400 w-3.5 h-3.5" /> // Moon Icon for Dark Mode
                ) : (
                    <FiSun className="text-yellow-500 w-3.5 h-3.5" /> // Sun Icon for Light Mode
                )}
            </div>
        </button>
    );
}
