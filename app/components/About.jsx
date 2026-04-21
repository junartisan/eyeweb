"use client"; 
import React from 'react';
import { assets, infoList, toolsData } from '../../assets/assets';
import Image from 'next/image';
import { useTheme } from '../contexts/ThemeContext'; 
import { motion } from "framer-motion";

const About = () => { 
  const { isDarkMode } = useTheme();

  return (
    <div id='About' className='w-full px-[12%] py-10 scroll-mt-30'>
      <h4 className='text-center mb-2 text-lg font-Ovo text-gray-800 dark:text-white'>Introduction</h4>
      <h2 className='text-center text-5xl font-Ovo text-gray-800 dark:text-white mb-10'>About Us</h2>
    
      {/* Added items-center to help with vertical centering on mobile */}
      <div className='flex w-full flex-col lg:flex-row items-center gap-10 lg:gap-10'>
        
        {/* Image Container: w-64 on mobile, mx-auto for centering, larger on lg screens */}
        <div className='w-64 sm:w-80 lg:w-max rounded-3xl mx-auto mb-10 lg:mb-0'>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }} 
            whileInView={{ opacity: 1, scale: .8 }} 
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <Image 
              src={assets.user_image} 
              alt='Eyewebmaster' 
              className='w-full rounded-3xl'
            />
          </motion.div>
        </div>

        <div className='flex-1'>
          <p className='text-lg mb-10 max-w-2xl font-Ovo text-gray-800 dark:text-white text-center lg:text-left'>
            "We are professional app developers with over a decade of experience. Our team has collaborated with numerous organizations, contributing to their growth and success through innovative web applications." 
          </p>
          
          {/* Updated: Always 3 columns (grid-cols-3) and adjusted padding for smaller screens */}
        <ul className='grid grid-cols-2 gap-3 sm:gap-6 max-w-2xl'>
            {infoList.map(({icon, iconDark, title, description}, index)=>(
            <li className='border-[.5px] border-gray-400 rounded-xl p-4 sm:p-6 cursor-pointer hover:bg-light-hover hover:-translate-y-1 duration-500 hover:shadow-2xs dark:border-white dark:hover:shadow-white dark:hover:bg-pink-950'  key={index}>
            <Image src={isDarkMode ? iconDark : icon }  alt={title} className='w-5 sm:w-7 mt-3'/>
            
            {/* Reduced text size for mobile to fit the 3-column row */}
            <h3 className='my-2 sm:my-4 font-semibold text-sm sm:text-base text-gray-700 dark:text-white'>
                {title}
            </h3>
            
            <p className='text-gray-600 text-xs sm:text-lg dark:text-white/80'>
                {description}
            </p>
            </li>
            ))}
        </ul>

          <h4 className='my-6 text-gray-700 font-Ovo dark:text-white text-xl'>Tools We Use</h4>
          <ul className='flex items-center justify-center lg:justify-start gap-3 sm:gap-5'> 
             {toolsData.map((tool, index)=>(
              <li className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500' key={index} >
                <Image src={tool} alt='Tool' className='w-5 sm:w-7' />
              </li>
             ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About;