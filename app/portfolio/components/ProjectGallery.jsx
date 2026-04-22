"use client";
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext'; 
import Image from 'next/image';
import { assets } from '../../../assets/assets';
import { motion } from "framer-motion";

const projects = [
    {
        title: "Apex Logistics Engine",
        category: "Enterprise Software",
        description: "A robust C#/.NET system featuring automated label generation and multi-tier billing logic for global shipping.",
        tags: ["C#", ".NET", "SQL Server"],
        link: "#"
    },
    {
        title: "Cebu City Tour Explorer",
        category: "Full-Stack Web App",
        description: "A high-performance booking platform built with Next.js and FastAPI, optimized for real-time guest manifest tracking.",
        tags: ["Next.js", "FastAPI", "Tailwind v4"],
        link: "#"
    },
    {
        title: "Philippine Trust Directory",
        category: "Digital Strategy / SEO",
        description: "An SEO-first business directory featuring custom trust-score algorithms and automated verification workflows.",
        tags: ["React", "Python", "SEO"],
        link: "#"
    }
];

const ProjectGallery = () => {
    const { isDarkMode } = useTheme();

    return (
        <div id="portfolio" className='w-full px-[12%] py-10 scroll-mt-10'>
            <motion.h4 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className='text-center mb-2 text-lg font-Ovo mt-15'
            >
                Expertise in Action
            </motion.h4>
            
            <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className='text-center text-5xl font-Ovo'
            >
                Featured Projects
            </motion.h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12'>
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.4 }}
                        className={`group relative border border-gray-400 rounded-2xl p-8 cursor-pointer overflow-hidden transition-all duration-500 ${
                            isDarkMode 
                            ? 'bg-darkHover border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                            : 'bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]'
                        }`}
                    >
                        {/* Background Decorative Element */}
                        <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-20 transition-colors ${
                            isDarkMode ? 'bg-pink-500' : 'bg-pink-300'
                        }`} />

                        <p className='text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2'>
                            {project.category}
                        </p>
                        
                        <h3 className='text-2xl font-Ovo mb-4 group-hover:text-indigo-600 transition-colors'>
                            {project.title}
                        </h3>
                        
                        <p className={`text-sm leading-6 mb-6 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            {project.description}
                        </p>

                        <div className='flex flex-wrap gap-2 mb-8'>
                            {project.tags.map((tag, i) => (
                                <span 
                                    key={i} 
                                    className={`text-[10px] px-3 py-1 rounded-full border ${
                                        isDarkMode ? 'border-white/20 bg-white/5' : 'border-gray-200 bg-gray-50'
                                    }`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className='flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-white/5'>
                            <span className='text-sm font-semibold flex items-center gap-2'>
                                View Technical Case Study
                                <Image src={assets.right_arrow} className='w-3 group-hover:translate-x-2 transition-transform' alt=''/>
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* "Join Now" style button for the whole portfolio */}
            <div className='flex justify-center'>
                <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href='#inquiry' 
                    className='px-10 py-4 border rounded-full border-gray-500 flex items-center gap-2 hover:shadow-2xs dark:border-white dark:bg-pink-900 bg-pink-200 font-Ovo text-lg'
                >
                    Start Your Project <Image src={assets.right_arrow} className='w-4' alt=''/>
                </motion.a>
            </div>
        </div>
    );
}

export default ProjectGallery;