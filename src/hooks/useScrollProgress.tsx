import { createContext, useContext, useRef, useEffect, useState, type ReactNode } from 'react';

interface SectionProgress {
    hero: number;
    skills: number;
    experience: number;
    contact: number;
}

interface ScrollProgressContextType {
    progress: SectionProgress;
    activeSection: keyof SectionProgress;
    totalProgress: number;
}

const defaultProgress: SectionProgress = {
    hero: 0,
    skills: 0,
    experience: 0,
    contact: 0,
};

const ScrollProgressContext = createContext<ScrollProgressContextType>({
    progress: defaultProgress,
    activeSection: 'hero',
    totalProgress: 0,
});

export const useScrollProgress = () => useContext(ScrollProgressContext);

interface ScrollProgressProviderProps {
    children: ReactNode;
}

export const ScrollProgressProvider = ({ children }: ScrollProgressProviderProps) => {
    const [progress, setProgress] = useState<SectionProgress>(defaultProgress);
    const [activeSection, setActiveSection] = useState<keyof SectionProgress>('hero');
    const [totalProgress, setTotalProgress] = useState(0);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const sections: (keyof SectionProgress)[] = ['hero', 'skills', 'experience', 'contact'];

        const calculateProgress = () => {
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollY = window.scrollY;

            // Total page progress 0-1
            const total = Math.min(Math.max(scrollY / docHeight, 0), 1);
            setTotalProgress(total);

            const newProgress: SectionProgress = { ...defaultProgress };
            let currentActive: keyof SectionProgress = 'hero';

            sections.forEach((sectionId) => {
                const el = document.getElementById(sectionId);
                if (!el) return;

                const rect = el.getBoundingClientRect();
                const sectionTop = rect.top + scrollY;
                const sectionHeight = rect.height;

                // Calculate section-specific progress
                const sectionScrolled = scrollY - sectionTop + windowHeight;
                const sectionProgress = Math.min(Math.max(sectionScrolled / (sectionHeight + windowHeight), 0), 1);

                newProgress[sectionId] = sectionProgress;

                // Determine active section (which section is most visible)
                const visibleTop = Math.max(0, rect.top);
                const visibleBottom = Math.min(windowHeight, rect.bottom);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);

                if (visibleHeight > windowHeight * 0.4) {
                    currentActive = sectionId;
                }
            });

            setProgress(newProgress);
            setActiveSection(currentActive);
        };

        const handleScroll = () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            rafRef.current = requestAnimationFrame(calculateProgress);
        };

        // Initial calculation
        calculateProgress();

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', calculateProgress, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', calculateProgress);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return (
        <ScrollProgressContext.Provider value={{ progress, activeSection, totalProgress }}>
            {children}
        </ScrollProgressContext.Provider>
    );
};

export default useScrollProgress;
