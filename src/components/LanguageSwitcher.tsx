"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface LanguageSwitcherProps {
    onLanguageChange: (lang: "fr" | "ar") => void
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onLanguageChange }) => {
    const [language, setLanguage] = useState<"fr" | "ar">("fr")

    const toggleLanguage = () => {
        const newLang = language === "fr" ? "ar" : "fr"
        setLanguage(newLang)
        onLanguageChange(newLang)

        // Store the language preference in localStorage
        localStorage.setItem("language", newLang)
    }

    useEffect(() => {
        // Check if there's a stored language preference
        const storedLanguage = localStorage.getItem("language") as "fr" | "ar" | null
        if (storedLanguage) {
            setLanguage(storedLanguage)
            onLanguageChange(storedLanguage)
        }
    }, [onLanguageChange])

    return (
        <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
        >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-20 text-white">
                {language === "fr" ? "FR" : "AR"}
            </div>
            <span className="ml-2 text-sm hidden md:inline">{language === "fr" ? "العربية" : "Français"}</span>
        </motion.div>
    )
}

export default LanguageSwitcher
