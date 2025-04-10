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

    return (
        <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
        >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-20 text-white">
                {currentLanguage === "fr" ? "FR" : "AR"}
            </div>
            <span className="ml-2 text-sm hidden md:inline">
        {currentLanguage === "fr" ? "العربية" : "Français"}
      </span>
        </motion.div>
    );
};

export default LanguageSwitcher;