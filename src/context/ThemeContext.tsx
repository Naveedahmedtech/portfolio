import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the shape of our Theme Context
interface ThemeContextProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

// Create the context with default values
const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light', // default theme is light
    toggleTheme: () => { }, // default function does nothing
});

// Custom hook for consuming the ThemeContext easily
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Load the theme from localStorage or fallback to system preference
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        setTheme(storedTheme || systemPreference);
        document.documentElement.classList.add(storedTheme || systemPreference);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        // Update the HTML class for Tailwind's dark mode
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
