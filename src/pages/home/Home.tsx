import About from "../../components/about/About";
import Contact from "../../components/contact/Contact";
import Hero from "../../components/hero/Hero";
import Projects from "../../components/projects/Projects";
import Testimonials from "../../components/testimonials/Testimonials";


const Home = () => {
    return (
        <main>
            <Hero />
            <About />
            <Projects />
            <Testimonials />
            <Contact />
        </main>
    );
}

export default Home;
