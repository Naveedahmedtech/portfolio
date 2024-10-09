import AboutSection from "../about/aboutSection";
import ContactSection from "../contact/ContactSection";
import ProjectsSection from "../project/projectSection";
import HomeSection from "./HomeSection";

function Home() {
    return (
        <div className="h-full bg-background text-textPrimary p-2">
            <HomeSection />
            <AboutSection />
            <ProjectsSection />
            <ContactSection />
        </div>
    );
}

export default Home;
