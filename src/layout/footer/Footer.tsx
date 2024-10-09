import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full py-12 bg-gradient-to-b from-gray-800 to-black text-gray-300 text-center"
        >
            <div className="flex justify-center space-x-8 mb-8">
                <motion.a
                    href="https://github.com/Naveedahmedtech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl text-gray-300 hover:text-green-400 transition-colors duration-300"
                    whileHover={{ scale: 1.3 }}
                >
                    <FaGithub />
                </motion.a>
                <motion.a
                    href="https://www.linkedin.com/in/naveed-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl text-gray-300 hover:text-blue-500 transition-colors duration-300"
                    whileHover={{ scale: 1.3 }}
                >
                    <FaLinkedin />
                </motion.a>
                <motion.a
                    href="https://x.com/Naveedahmedtech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl text-gray-300 hover:text-blue-400 transition-colors duration-300"
                    whileHover={{ scale: 1.3 }}
                >
                    <FaTwitter />
                </motion.a>
                <motion.a
                    href="https://www.instagram.com/naveedahmedtech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl text-gray-300 hover:text-pink-500 transition-colors duration-300"
                    whileHover={{ scale: 1.3 }}
                >
                    <FaInstagram />
                </motion.a>
            </div>
            <p className="text-lg font-semibold mb-2">Let's Connect and Build Something Great Together</p>
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Naveed Ahmed. All Rights Reserved.</p>
        </motion.footer>
    );
}

export default Footer;
