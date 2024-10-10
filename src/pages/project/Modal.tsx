import { FC, ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md"></div>
                    <motion.div
                        className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-lg relative mx-5"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-600"
                            whileHover={{ scale: 1.2, rotate: 90 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FaTimes size={20} />
                        </motion.button>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
