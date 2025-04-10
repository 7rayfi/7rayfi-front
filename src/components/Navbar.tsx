"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

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
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                        {/* Logo Hrayfi - utilisation d'une image en ligne */}
                        <img src="https://img.icons8.com/color/48/000000/hammer.png" alt="Hrayfi" className="h-10" />
                    </motion.div>
                    <motion.h1
                        className={`ml-2 text-2xl font-bold transition-colors duration-300 ${
                            isScrolled ? "text-black" : "text-white"
                        }`}
                        whileHover={{ scale: 1.05 }}
                    >
                        Hrayfi
                    </motion.h1>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="text-gray-800 hover:text-[#d62828] transition-colors">
                        Accueil
                    </Link>
                    <Link to="/services" className="text-gray-800 hover:text-[#d62828] transition-colors">
                        Services
                    </Link>
                    <Link to="/formations" className="text-gray-800 hover:text-[#d62828] transition-colors">
                        Formations
                    </Link>
                    <Link to="/about" className="text-gray-800 hover:text-[#d62828] transition-colors">
                        À propos
                    </Link>
                    <Link to="/contact" className="text-gray-800 hover:text-[#d62828] transition-colors">
                        Contact
                    </Link>
                    <Link to="/login">
                        <motion.button
                            className="bg-[#d62828] text-white px-4 py-2 rounded-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Connexion
                        </motion.button>
                    </Link>
                    <Link to="/register">
                        <motion.button
                            className="bg-[#f77f00] text-white px-4 py-2 rounded-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Inscription
                        </motion.button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none">
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
                            className="text-gray-800 hover:text-[#d62828] py-2 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Accueil
                        </Link>
                        <Link
                            to="/services"
                            className="text-gray-800 hover:text-[#d62828] py-2 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Services
                        </Link>
                        <Link
                            to="/formations"
                            className="text-gray-800 hover:text-[#d62828] py-2 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Formations
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-800 hover:text-[#d62828] py-2 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            À propos
                        </Link>
                        <Link
                            to="/contact"
                            className="text-gray-800 hover:text-[#d62828] py-2 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <div className="flex space-x-2 pt-2">
                            <Link to="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                                <button className="w-full bg-[#d62828] text-white px-4 py-2 rounded-md">Connexion</button>
                            </Link>
                            <Link to="/register" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                                <button className="w-full bg-[#f77f00] text-white px-4 py-2 rounded-md">Inscription</button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    )
}

export default Navbar
