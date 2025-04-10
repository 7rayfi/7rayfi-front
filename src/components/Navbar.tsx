import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t,  setLanguage } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLanguageChange = (lang: "fr" | "ar") => {
        setLanguage(lang);
    };

    return (
        <motion.nav
            className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <img
                            src="https://img.icons8.com/color/48/000000/hammer.png"
                            alt="Hrayfi"
                            className="h-10"
                        />
                    </motion.div>
                    <motion.span
                        className={`ml-2 text-2xl font-bold ${isScrolled ? 'text-primary' : 'text-secondary'}`}
                        whileHover={{ scale: 1.05 }}
                    >
                        Hrayfi
                    </motion.span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link
                        to="/"
                        className={`${isScrolled ? 'text-gray-800' : 'text-secondary'} hover:text-primary transition-colors`}
                    >
                        {t("nav.home")}
                    </Link>
                    <Link
                        to="/services"
                        className={`${isScrolled ? 'text-gray-800' : 'text-secondary'} hover:text-primary transition-colors`}
                    >
                        {t("nav.services")}
                    </Link>
                    <Link
                        to="/artisans"
                        className={`${isScrolled ? 'text-gray-800' : 'text-secondary'} hover:text-primary transition-colors`}
                    >
                        {t("nav.artisans")}
                    </Link>
                    <Link
                        to="/formations"
                        className={`${isScrolled ? 'text-gray-800' : 'text-secondary'} hover:text-primary transition-colors`}
                    >
                        {t("nav.formations")}
                    </Link>
                    <Link
                        to="/about"
                        className={`${isScrolled ? 'text-gray-800' : 'text-secondary'} hover:text-primary transition-colors`}
                    >
                        {t("nav.about")}
                    </Link>
                    <Link
                        to="/contact"
                        className={`${isScrolled ? 'text-gray-800' : 'text-secondary'} hover:text-primary transition-colors`}
                    >
                        {t("nav.contact")}
                    </Link>

                    <LanguageSwitcher onLanguageChange={handleLanguageChange} />

                    <Link to="/login">
                        <motion.button
                            className="bg-primary text-white px-4 py-2 rounded-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {t("nav.login")}
                        </motion.button>
                    </Link>
                    <Link to="/register">
                        <motion.button
                            className="bg-secondary text-white px-4 py-2 rounded-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {t("nav.register")}
                        </motion.button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-4">
                    <LanguageSwitcher onLanguageChange={handleLanguageChange} />

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`${isScrolled ? 'text-gray-800' : 'text-white'} focus:outline-none`}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.div
                    className="md:hidden bg-white shadow-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
                        <Link
                            to="/"
                            className="text-gray-800 hover:text-primary py-2 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t("nav.home")}
                        </Link>
                        <Link
                            to="/services"
                            className="text-gray-800 hover:text-primary py-2 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t("nav.services")}
                        </Link>
                        <Link
                            to="/artisans"
                            className="text-gray-800 hover:text-primary py-2 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t("nav.artisans")}
                        </Link>
                        <Link
                            to="/formations"
                            className="text-gray-800 hover:text-primary py-2 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t("nav.formations")}
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-800 hover:text-primary py-2 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t("nav.about")}
                        </Link>
                        <Link
                            to="/contact"
                            className="text-gray-800 hover:text-primary py-2 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t("nav.contact")}
                        </Link>
                        <div className="flex space-x-2 pt-2">
                            <Link to="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                                <button className="w-full bg-primary text-white px-4 py-2 rounded-md">
                                    {t("nav.login")}
                                </button>
                            </Link>
                            <Link to="/register" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                                <button className="w-full bg-secondary text-white px-4 py-2 rounded-md">
                                    {t("nav.register")}
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;