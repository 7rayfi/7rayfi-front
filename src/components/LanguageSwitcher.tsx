import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

interface LanguageSwitcherProps {
    onLanguageChange: (lang: "fr" | "ar") => void;
}

const LanguageSwitcher = ({ onLanguageChange }: LanguageSwitcherProps) => {
    const { language } = useLanguage();
    const [currentLanguage, setCurrentLanguage] = useState<"fr" | "ar">(language);

    useEffect(() => {
        // Sync with context language
        setCurrentLanguage(language);
    }, [language]);

    const toggleLanguage = () => {
        const newLang = currentLanguage === "fr" ? "ar" : "fr";
        setCurrentLanguage(newLang);
        onLanguageChange(newLang);

        // Store the language preference in localStorage
        localStorage.setItem("language", newLang);

        // Apply RTL for Arabic
        document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
        document.body.classList.toggle("rtl", newLang === "ar");
    };

    // SVG des drapeaux
    const moroccoFlag = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-5 h-5">
            <rect width="900" height="600" fill="#c1272d"/>
            <path d="M450,225L354.9,375.9h190.2L450,225z" fill="none" stroke="#006233" strokeWidth="40"/>
        </svg>
    );

    const franceFlag = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-5 h-5">
            <rect width="300" height="600" fill="#002395"/>
            <rect width="300" height="600" x="300" fill="#fff"/>
            <rect width="300" height="600" x="600" fill="#ed2939"/>
        </svg>
    );

    return (
        <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
        >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-20 overflow-hidden">
                {currentLanguage === "fr" ? moroccoFlag : franceFlag}
            </div>
            <span className={`${currentLanguage === "fr" ? "ml-2" : "mr-2"} text-sm hidden md:inline`}>
                {currentLanguage === "fr" ? "العربية" : "Français"}
            </span>
        </motion.div>
    );
};

export default LanguageSwitcher;