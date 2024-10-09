import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaExternalLinkAlt, FaGithub, FaTimes } from 'react-icons/fa';
import movieProject from "../../assets/images/projects/project-movie.png";
import blogProject from "../../assets/images/projects/project-blog.png";

export const projects = [
    {
        id: 1,
        name: "Chillout",
        description:
            "A social platform similar to Instagram, where users can share photos, explore posts, engage with content through likes and comments, and follow other users. Featuring a clean interface and advanced filtering for seamless browsing. Chillout provides a highly scalable and engaging user experience with its robust photo-sharing, post-filtering, and interactive UI.",
        image: blogProject,
        demoUrl: "https://chillout-naveed.netlify.app/",
    },
    {
        id: 2,
        name: "Movie Project",
        description:
            "Discover & explore movies/TVs with advanced search, filtering, ratings, trailers, and detailed cast info. Your ultimate cinema guide.",
        image: movieProject,
        demoUrl: "https://watchmovienow.netlify.app/",
        codeUrl: "https://github.com/Naveedahmedtech/movie-app",
    },
    {
        id: 3,
        name: "Blog Project",
        description:
            "Explore blogs with advanced search, filtering, ratings, comments, and author info. The ultimate guide for readers and writers.",
        image: blogProject,
        demoUrl: "https://naveed-blogs.netlify.app/",
        codeUrl: "https://github.com/Naveedahmedtech/movie-app",
    },
];

function ProjectsSection() {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const [selectedProject, setSelectedProject] = useState<any>(null);

    // Use useEffect to handle scrolling when the modal is open or closed
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            document.body.style.overflow = 'auto'; // Allow scrolling
        }

        // Clean up when the component unmounts or the modal is closed
        return () => {
            document.body.style.overflow = 'auto'; // Reset overflow to default
        };
    }, [selectedProject]);

    const handleReadMore = (project: any) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeInOut" } },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="relative flex flex-col items-center justify-center min-h-screen md:px-8 bg-gradient-to-b from-gray-900 to-[#000d28]"
            id="projects"
        >
            <motion.div
                className="relative max-w-6xl w-full text-white p-8 md:p-16 text-center"
                variants={childVariants}
            >
                <motion.h2
                    className="text-5xl md:text-6xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
                    variants={childVariants}
                >
                    Projects
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
                    variants={childVariants}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center bg-gradient-to-br from-blue-800 to-gray-700 bg-opacity-90 rounded-xl shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden w-full"
                            variants={childVariants}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0px 10px 30px rgba(0, 255, 170, 0.5)",
                                transition: { duration: 0.5, ease: "easeInOut" },
                            }}
                            animate={inView ? 'visible' : 'hidden'}
                        >
                            <motion.div
                                className="w-full h-52 bg-cover bg-center mb-6"
                                style={{
                                    backgroundImage: `url(${project.image})`,
                                    height: "auto",
                                    aspectRatio: '16/9',
                                }}
                            ></motion.div>
                            <div className="px-6 py-4">
                                <h3 className="text-3xl font-bold mb-4">{project.name}</h3>
                                <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
                                    {project.description.length > 80
                                        ? `${project.description.substring(0, 80)}...`
                                        : project.description}
                                </p>
                                {project.description.length > 80 && (
                                    <button
                                        className="text-sm text-blue-400 hover:text-blue-600"
                                        onClick={() => handleReadMore(project)}
                                    >
                                        Read More
                                    </button>
                                )}
                                <div className="flex space-x-6 mt-4">
                                    {project.codeUrl && (
                                        <motion.a
                                            href={project.codeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-2xl text-gray-300 hover:text-white transition-colors duration-300"
                                            whileHover={{ scale: 1.3 }}
                                        >
                                            <FaGithub />
                                        </motion.a>
                                    )}
                                    <motion.a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-2xl text-gray-300 hover:text-white transition-colors duration-300"
                                        whileHover={{ scale: 1.3 }}
                                    >
                                        <FaExternalLinkAlt />
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Modal for full description */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 flex justify-center items-center z-50"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={modalVariants}
                    >
                        {/* Background Blur Effect */}
                        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md"></div>

                        <motion.div
                            className="relative bg-gray-900 p-8 rounded-lg max-w-lg w-full text-white shadow-2xl"
                            variants={modalVariants}
                        >
                            {/* Close Button */}
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 text-white text-2xl hover:text-gray-400 focus:outline-none"
                            >
                                <FaTimes />
                            </button>

                            <h3 className="text-3xl font-bold mb-4">{selectedProject.name}</h3>
                            <p className="mb-6">{selectedProject.description}</p>
                            <button
                                className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default ProjectsSection;
