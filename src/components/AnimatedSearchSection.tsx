// AnimatedSearchSection.js
import { useSpring, animated } from '@react-spring/web';
import { useState, useEffect } from 'react';

export default function AnimatedSearchSection() {
    const [isVisible, setIsVisible] = useState(false);

    // Show search section on scrolling past a certain point
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Spring animation for the search section
    const springProps = useSpring({
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0px)' : 'translateY(-50px)',
        config: { tension: 200, friction: 20 },
    });

    return (
        <animated.div style={{ ...springProps, position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
            <div className="p-4 bg-surface shadow-lg rounded">
                <input
                    type="text"
                    placeholder="Search the universe..."
                    className="p-2 rounded border border-primary w-72"
                />
                <button className="ml-2 p-2 bg-primary text-white rounded">Search</button>
            </div>
        </animated.div>
    );
}
