"use client";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import Image from "next/image";
import { assets } from "../../../assets/assets";
import { motion } from "framer-motion";

const SoftwareDevelopment = () => {
    const { isDarkMode } = useTheme();

    const techHighlights = [
        { title: "Frontend", desc: "Next.js, React, Tailwind CSS", icon: assets.code_icon },
        { title: "Backend", desc: "FastAPI, Django, Python", icon: assets.project_icon },
        { title: "Enterprise", desc: "C#, .NET, SQL Server", icon: assets.edu_icon }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            id="softdev" 
            className="w-full px-[12%] py-20 scroll-mt-20"
        >
            <h4 className="text-center mb-2 text-lg font-Ovo">What we offer</h4>
            <h2 className="text-center text-5xl font-Ovo">Software Development</h2>
            
            <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
                Full-stack solutions developed by certified experts. From local directory systems in Cebu to enterprise-grade shipping and tracking software.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {techHighlights.map((tech, index) => (
                    <motion.div 
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`p-8 border rounded-2xl cursor-default transition-colors ${
                            isDarkMode 
                            ? 'border-white/20 hover:bg-white/5' 
                            : 'border-gray-200 hover:bg-indigo-50'
                        }`}
                    >
                        <Image 
                            src={tech.icon} 
                            alt={tech.title} 
                            className="w-10 mb-4" 
                        />
                        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {tech.title}
                        </h3>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {tech.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default SoftwareDevelopment;