import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaCode, FaUsers, FaChartLine } from 'react-icons/fa';

function AboutSection() {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
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
            className="relative flex flex-col items-center justify-center min-h-screen px-4 md:px-8  mt-10"
            id='about'
        >
            <motion.div
                className="relative max-w-6xl w-full text-white p-8 md:p-16 text-center from-gray-900 to-blue-900 bg-opacity-90 rounded-3xl shadow-2xl border border-gray-700 transform hover:scale-105 transition-transform duration-500 ease-in-out"
                variants={childVariants}
            >
                <motion.h2
                    className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500"
                    variants={childVariants}
                >
                    About Me
                </motion.h2>
                <motion.p
                    className="text-lg md:text-2xl font-medium mb-8 text-gray-300 leading-relaxed"
                    variants={childVariants}
                >
                    I am Naveed Ahmed, a passionate software engineer specializing in building scalable and efficient web applications. My focus is on crafting solutions that blend elegant design with seamless user experiences.
                </motion.p>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12"
                    variants={childVariants}
                >
                    <motion.div
                        className="flex flex-col items-center bg-gradient-to-br from-blue-800 to-teal-600 bg-opacity-30 p-10 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
                        variants={childVariants}
                    >
                        <FaCode className="text-6xl text-teal-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-4">Development</h3>
                        <p className="text-base md:text-lg text-gray-300">
                            Proficient in full-stack development, with extensive experience in React, Node.js, and modern web technologies.
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-center bg-gradient-to-br from-blue-800 to-teal-600 bg-opacity-30 p-10 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
                        variants={childVariants}
                    >
                        <FaUsers className="text-6xl text-teal-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-4">Team Player</h3>
                        <p className="text-base md:text-lg text-gray-300">
                            Collaborative and communicative, I enjoy working with teams to deliver impactful projects.
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-center bg-gradient-to-br from-blue-800 to-teal-600 bg-opacity-30 p-10 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
                        variants={childVariants}
                    >
                        <FaChartLine className="text-6xl text-teal-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-4">Continuous Growth</h3>
                        <p className="text-base md:text-lg text-gray-300">
                            Committed to lifelong learning, always looking for opportunities to enhance my skills and knowledge.
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default AboutSection;
