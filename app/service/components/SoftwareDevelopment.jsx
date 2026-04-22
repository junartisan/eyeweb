"use client";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import Image from "next/image";
import { assets } from "../../../assets/assets";
import { motion } from "framer-motion";

const SoftwareDevelopment = () => {
    const {isDarkMode} = useTheme ();
    
    return (
        <div id="softdev" className="w-full px-[12%] py-20 scroll-mt-20">
            <h1>Software Development</h1>
        </div>
    );

}
export default SoftwareDevelopment;