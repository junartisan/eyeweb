"use client";
import React, { useState } from 'react';
import { useTheme } from "../../contexts/ThemeContext";
import Image from 'next/image';
import { assets } from '../../../assets/assets';
import { motion } from "framer-motion";

const InquiryForm = () => {
    const { isDarkMode } = useTheme();
    const [selectedService, setSelectedService] = useState('Web Development');

    const services = [
        { id: 'web', label: 'Web Development', desc: 'Next.js, React, Full-stack' },
        { id: 'backend', label: 'Backend & APIs', desc: 'FastAPI, Django, Python' },
        { id: 'enterprise', label: 'Enterprise Solutions', desc: 'C# / .NET Applications' },
        { id: 'strategy', label: 'Digital Strategy', desc: 'SEO & Digital Marketing' }
    ];

    return (
        <div id="inquiry" className='w-full px-[12%] py-10 scroll-mt-10'>
            <h4 className='text-center mb-2 text-lg font-Ovo mt-15'>
                Ready to take the next step?
            </h4>

            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }} 
                whileInView={{ scale: 1, opacity: 1 }} 
                transition={{ duration: 1, type: 'spring' }}
            >
                <h2 className='text-center text-5xl font-Ovo'>Let’s Build Something Extraordinary</h2>
                <p className='pt-5 text-center text-lg max-w-2xl mx-auto'>
                    From concept to deployment, we provide the technical expertise to scale your vision. 
                    Tell us about your project below.
                </p>

                <div className='grid grid-cols-1 gap-6 my-10'>
                    <div className={`border border-gray-400 rounded-lg px-8 py-10 shadow-sm transition-all duration-500 ${isDarkMode ? 'bg-darkHover border-white/20 shadow-white/5' : 'bg-white hover:shadow-black/5'}`}>
                        
                        {/* Service Toggles */}
                        <div className='mb-10'>
                            <p className='font-bold mb-4 uppercase tracking-widest text-lg text-indigo-600'>1. Select Service</p>
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                                {services.map((service) => (
                                    <button
                                        key={service.id}
                                        onClick={() => setSelectedService(service.label)}
                                        className={`p-4 rounded-lg border text-left transition-all duration-300 ${
                                            selectedService === service.label 
                                            ? 'bg-pink-100 border-pink-400 dark:bg-pink-900 dark:border-pink-500' 
                                            : 'border-gray-300 dark:border-white/20 hover:bg-light-hover dark:hover:bg-white/5'
                                        }`}
                                    >
                                        <div className='font-bold'>{service.label}</div>
                                        <div className='text-[14px] opacity-70'>{service.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Inquiry Fields */}
                        <div className='mb-8'>
                            <p className='font-bold mb-6 uppercase tracking-widest text-lg text-indigo-600'>2. Project Details</p>
                            <form className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-semibold'>Full Name</label>
                                    <input type="text" placeholder="Rosendo Cuyasen" className='p-3 bg-transparent border border-gray-400 rounded-md outline-none focus:border-pink-500 transition-colors' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-semibold'>Company Name</label>
                                    <input type="text" placeholder="Eyewebmaster" className='p-3 bg-transparent border border-gray-400 rounded-md outline-none focus:border-pink-500 transition-colors' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-semibold'>Project Type</label>
                                    <select className='p-3 bg-transparent border border-gray-400 rounded-md outline-none focus:border-pink-500 dark:bg-gray-900'>
                                        <option>New Build</option>
                                        <option>Feature Update</option>
                                        <option>Maintenance</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-semibold'>Estimated Budget</label>
                                    <select className='p-3 bg-transparent border border-gray-400 rounded-md outline-none focus:border-pink-500 dark:bg-gray-900'>
                                        <option>$2k – $5k</option>
                                        <option>$5k – $10k</option>
                                        <option>$10k+</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-2 md:col-span-2'>
                                    <label className='text-sm font-semibold'>Project Timeline</label>
                                    <input type="text" placeholder="When do you need to launch?" className='p-3 bg-transparent border border-gray-400 rounded-md outline-none focus:border-pink-500 transition-colors' />
                                </div>
                                <div className='flex flex-col gap-2 md:col-span-2'>
                                    <label className='text-sm font-semibold'>Project Details (Elevator Pitch)</label>
                                    <textarea rows="4" placeholder="Briefly describe your project goals..." className='p-3 bg-transparent border border-gray-400 rounded-md outline-none focus:border-pink-500 transition-colors'></textarea>
                                </div>

                                <div className='w-full md:w-auto mt-4'>
                                    <button type="submit" className='px-10 py-4 border rounded-full border-gray-500 flex items-center gap-2 hover:-translate-y-1 duration-500 hover:shadow-2xs dark:border-white dark:hover:shadow-white dark:bg-pink-900 bg-pink-200 font-semibold'>
                                        Send Inquiry for {selectedService} <Image src={assets.right_arrow} className='w-4' alt=''/>
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default InquiryForm;