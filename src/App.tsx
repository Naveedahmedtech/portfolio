import { useEffect, useState } from "react";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import ContextMenu from "./components/ContextMenu";
import GlobalCanvas from "./components/canvas/GlobalCanvas";
import { ScrollProgressProvider } from "./hooks/useScrollProgress";
import Hero from "./features/hero";
import Skills from "./features/skills";
import ExperienceProjects from "./features/experience-projects";
import Contact from "./features/contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on refresh
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    const tickerFunc = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerFunc);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFunc);
    };
  }, []);

  return (
    <ScrollProgressProvider>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <div className={`min-h-screen bg-background text-textPrimary transition-opacity duration-1000 cursor-none ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Global 3D Canvas - Fixed position, spans all sections */}
        <GlobalCanvas />

        <CustomCursor />
        <Header />
        <ContextMenu />
        <main className="relative z-10">
          <Hero />
          <Skills />
          <ExperienceProjects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ScrollProgressProvider>
  );
}

export default App;
