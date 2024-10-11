import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function ContactSection() {
    const { ref, inView } = useInView({
        threshold: 0.3,
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
            className="relative flex flex-col items-center justify-center min-h-screen px-4 md:px-8"
            id="contact"
        >
            <motion.div
                className="relative max-w-4xl w-full text-white p-8 md:p-16 text-center"
                variants={childVariants}
            >
                <motion.h2
                    className="text-4xl md:text-6xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
                    variants={childVariants}
                >
                    Contact Me
                </motion.h2>
                <motion.p
                    className="text-lg md:text-xl font-medium mb-8 text-gray-300 leading-relaxed"
                    variants={childVariants}
                >
                    If you'd like to get in touch, feel free to reach out via any of the methods below.
                </motion.p>
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-12"
                    variants={childVariants}
                >
                    <motion.div
                        className="flex flex-col items-center bg-gradient-to-br from-gray-800 to-gray-700 bg-opacity-90 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
                        variants={childVariants}
                    >
                        <FaEnvelope className="text-5xl text-pink-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Email</h3>
                        <p className="text-sm sm:text-base text-gray-300 break-words max-w-xs">
                            <a href="mailto:technaveedahmed@gmail.com" className="hover:underline">
                                technaveedahmed@gmail.com
                            </a>
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-center bg-gradient-to-br from-gray-800 to-gray-700 bg-opacity-90 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
                        variants={childVariants}
                    >
                        <FaPhone className="text-5xl text-purple-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Phone</h3>
                        <p className="text-base text-gray-300">
                            <a href="tel:+923105557923" className="hover:underline">
                                +92 310 5557923
                            </a>
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-center bg-gradient-to-br from-gray-800 to-gray-700 bg-opacity-90 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
                        variants={childVariants}
                    >
                        <FaMapMarkerAlt className="text-5xl text-blue-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Location</h3>
                        <p className="text-base text-gray-300">
                            Islamabad, Pakistan
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>

    );
}

export default ContactSection;
