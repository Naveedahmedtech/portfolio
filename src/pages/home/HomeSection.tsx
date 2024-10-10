import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function HomeSection() {
    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: true,
    });

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="relative flex items-center justify-center h-screen overflow-hidden px-4 md:px-8 mt-6 md:mt-0"
            id='home'
        >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-blue-900 opacity-50 blur-2xl"></div>
            <motion.div
                className="relative h-auto w-full max-w-5xl text-textPrimary p-8 md:p-12 text-center bg-gradient-to-br from-gray-900 bg-opacity-80 rounded-3xl shadow-2xl"
                variants={childVariants}
            >
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary"
                    variants={childVariants}
                >
                    <TypeAnimation
                        sequence={["Hi, I'm Software Engineer", 1000, "I Design & Develop Scalable Solutions", 1000]}
                        speed={50}
                        wrapper="span"
                        repeat={Infinity}
                    />
                </motion.h2>
                <motion.p
                    className="text-xl md:text-2xl font-medium mb-8 text-textSecondary"
                    variants={childVariants}
                >
                    Building smart web solutions that help businesses grow and work better
                </motion.p>
                <motion.div
                    className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 mb-8"
                    variants={childVariants}
                >
                    <motion.button
                        className="bg-blue-600 hover:bg-blue-800 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold shadow-lg transform transition-all duration-100 ease-in-out outline-none ring-4 ring-offset-2 ring-blue-800 "
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a href="#projects">
                            Explore My Work
                        </a>
                    </motion.button>
                    <motion.button
                        className="bg-green-600 hover:bg-green-800 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold shadow-lg transform transition-all duration-100 ease-in-out focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-800 "
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a href="#contact">
                            Let’s Collaborate
                        </a>
                    </motion.button>
                </motion.div>
                <motion.div
                    className="flex justify-center space-x-6 md:space-x-8 text-2xl md:text-3xl text-accent"
                    variants={childVariants}
                >
                    <motion.a
                        href="https://github.com/Naveedahmedtech"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, color: "#fff" }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaGithub />
                    </motion.a>
                    <motion.a
                        href="https://www.linkedin.com/in/naveed-dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, color: "#0077B5" }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaLinkedin />
                    </motion.a>
                    <motion.a
                        href="mailto:technaveedahmed@gmail.com"
                        whileHover={{ scale: 1.2, color: "#D44638" }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaEnvelope />
                    </motion.a>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default HomeSection;
