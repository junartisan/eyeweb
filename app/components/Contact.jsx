"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { assets } from '../../assets/assets';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from "framer-motion";

const Contact = () => {
    const { isDarkMode } = useTheme();
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending...");
        setIsSubmitting(true);

        const formData = new FormData(event.target);
        
        // Prepare the data object to match your route.js destructuring
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            // Note: 'service' is omitted here so the route.js 
            // uses the "Basic Contact Form" template.
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const resData = await response.json();

            if (response.ok) {
                setResult("Message sent successfully!");
                event.target.reset();
            } else {
                setResult(resData.message || "Submission failed.");
            }
        } catch (error) {
            setResult("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id='contact' className='w-full px-[12%] py-10 scroll-mt-20'>

<h4 className='text-center mb-2 font-Ovo text-2xl'> 
        Connect with us
        </h4>
        <h2 className='text-center text-5xl font-Ovo'>
        Get in Touch
        </h2>
        <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo text-lg'>
        We love to hear from you! If you have any questions, comments, or feedback, please use the form below.
        </p>
            {/* Headers and text remain same */}
            <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-8">
                    <input
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        required
                        className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white dark:text-black"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white dark:text-black"
                    />
                </div>

                <textarea
                    name="message"
                    rows="6"
                    placeholder="Enter your message"
                    required
                    className="w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6 dark:text-black"
                />
                
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className={`py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/70 text-white rounded-full mx-auto hover:bg-black duration-500 ${isSubmitting ? 'opacity-50' : ''}`}
                >
                    {isSubmitting ? "Sending..." : "Submit now"} 
                    <Image src={isDarkMode ? assets.right_arrow_bold_dark : assets.right_arrow_white} alt="" className="w-4" />
                </button>

                <p className={`mt-4 text-center ${result.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                    {result}
                </p>
            </form>
        </div>
    );
}

export default Contact;