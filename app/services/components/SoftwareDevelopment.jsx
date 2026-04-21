"use client";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import Image from "next/image";
import { assets } from "../../../assets/assets";
import { motion } from "framer-motion";

const SoftwareDevelopment = () => {
    const {isDarkMode} = useTheme ();
    
    return (
        <div>
            <h1>Software Development</h1>
        </div>
    );

}
export default SoftwareDevelopment;