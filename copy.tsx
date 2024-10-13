// import { useInView } from 'react-intersection-observer';
// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
// import Modal from './Modal';
// import { projects } from './util';
import React from "react";



// interface Project {
//     name: string;
//     description: string;
//     image: string;
//     codeUrl?: string;
//     demoUrl?: string;
// }

const ProjectsSection = () => {
    // const { ref, inView } = useInView({
    //     threshold: 0.1,
    //     triggerOnce: true,
    // });

    // const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // const handleReadMore = (project: Project) => {
    //     setSelectedProject(project);
    // };

    // const handleCloseModal = () => {
    //     setSelectedProject(null);
    // };

    // const containerVariants = {
    //     hidden: { opacity: 0, y: 50 },
    //     visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
    // };

    // const childVariants = {
    //     hidden: { opacity: 0, y: 20 },
    //     visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    // };

    return (
        <div>
             {/* <motion.div
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
                        className="text-4xl md:text-6xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
                        variants={childVariants}
                    >
                        Projects
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1  lg:grid-cols-3 gap-12"
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
                                    className="w-full h-52 bg-cover bg-center mb-2 "
                                    style={{
                                        backgroundImage: `url(${project.image})`,
                                        height: "auto",
                                        aspectRatio: '16/9',
                                    }}
                                ></motion.div>
                                <div className="px-6 py-4">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2 ">{project.name}</h3>
                                    <div
                                        className="text-sm md:text-lg text-gray-300 mb-2  leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                project.description.length > 150
                                                    ? `${project.description.substring(0, 150)}...`
                                                    : project.description
                                        }}
                                    />
                                    {project.description.length > 80 && (
                                        <button
                                            className="text-sm text-blue-400 hover:text-blue-600"
                                            onClick={() => handleReadMore(project)}
                                        >
                                            Read More
                                        </button>
                                    )}
                                    <div className="flex space-x-6 mt-2">
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
            </motion.div> */}

            {/* Modal for full description */}
            {/* <Modal isOpen={!!selectedProject} onClose={handleCloseModal}>
                {selectedProject && (
                    <div className="max-w-lg mx-auto">
                        <h2 className="text-2xl font-bold mb-4">{selectedProject.name}</h2>
                        <div
                            className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed max-h-80 overflow-y-auto"
                            dangerouslySetInnerHTML={{
                                __html: selectedProject.description,
                            }}
                        />
                        <div className="flex space-x-4 mt-4">
                            {selectedProject.codeUrl && (
                                <motion.a
                                    href={selectedProject.codeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl text-gray-300 hover:text-white transition-colors duration-300"
                                    whileHover={{ scale: 1.3 }}
                                >
                                    <FaGithub />
                                </motion.a>
                            )}
                            {selectedProject.demoUrl && (
                                <motion.a
                                    href={selectedProject.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl text-gray-300 hover:text-white transition-colors duration-300"
                                    whileHover={{ scale: 1.3 }}
                                >
                                    <FaExternalLinkAlt />
                                </motion.a>
                            )}
                        </div>
                    </div>
                )}
            </Modal>  */}

        </div>
    );
};

export default ProjectsSection;
