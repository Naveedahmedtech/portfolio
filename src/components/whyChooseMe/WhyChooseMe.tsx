import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaCogs, FaRocket, FaHandshake, FaBrain, FaPalette } from "react-icons/fa";

const highlights = [
    {
        icon: <FaRocket className="text-accent text-2xl" />,
        title: "You Need Faster Delivery, Not Just Code",
        description:
            "I ship fast, without breaking things. My lean workflows, reusable components, and automated testing keep projects on time and production-ready.",
    },
    {
        icon: <FaCogs className="text-accent text-2xl" />,
        title: "Your Product Needs to Scale",
        description:
            "I build with future growth in mind. Clean architecture, modular codebases, and performance-first APIs ensure you're ready for what’s next.",
    },
    {
        icon: <FaBrain className="text-accent text-2xl" />,
        title: "You Want to Leverage AI, but Don’t Know How",
        description:
            "From integrating LLMs to AI-assisted UX and tooling, I bring hands-on experience in modern AI solutions that create real product value.",
    },
    {
        icon: <FaHandshake className="text-accent text-2xl" />,
        title: "Your Dev Needs to Think Like a Partner",
        description:
            "I collaborate like a cofounder. I align with your goals, challenge assumptions when needed, and deliver solutions that support your vision.",
    },
    {
        icon: <FaPalette className="text-accent text-2xl" />,
        title: "Your Users Expect Better Experiences",
        description:
            "Beautiful is not enough. I build intuitive UIs based on UX patterns that reduce friction, increase conversion, and feel delightful to use.",
    },
    {
        icon: <FaCheckCircle className="text-accent text-2xl" />,
        title: "You Can’t Afford Missed Expectations",
        description:
            "Clients work with me because I communicate clearly, plan carefully, and follow through. My Upwork reviews back it up, every time.",
    },
];


const WhyChooseMe: React.FC = () => {
    return (
        <section id="why" className="bg-background text-textPrimary py-24 px-6">
            <div className="max-w-6xl mx-auto space-y-16">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <p className="text-sm uppercase tracking-widest font-semibold text-accent">
                        Why Choose Me
                    </p>
                    <h2 className="text-4xl font-extrabold text-primary mt-2">
                        What Sets Me Apart
                    </h2>
                    <p className="text-lg text-textSecondary mt-4">
                        Clients choose me because I bring more than code. I deliver scalable systems, user-focused interfaces, and reliable execution that helps products grow. Every decision I make supports real business value and long-term success.
                    </p>

                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {highlights.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-surface border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                {item.icon}
                                <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                            </div>
                            <p className="text-sm text-textSecondary">{item.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseMe;
