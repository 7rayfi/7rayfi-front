"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import LoginForm from "../components/LoginForm"
import { useLanguage } from "../context/LanguageContext"
import { motion } from "framer-motion"
import BackgroundAnimation from "../components/animations/BackgroundAnimation.tsx";

const Login: React.FC = () => {
    const navigate = useNavigate()
    const { language } = useLanguage()

    const handleLogin = (data: { identifier: string; password: string }) => {
        // Here you would normally handle the login logic with your API
        console.log("Login data:", data)

        // For demo purposes, we'll just redirect to the home page
        setTimeout(() => {
            navigate("/")
        }, 1000)
    }

    return (
        <div className={language === "ar" ? "rtl" : ""}>
            <BackgroundAnimation type="login" />
            <Navbar />
            <main className="flex-grow min-h-screen">
                <div className="container mx-auto px-4 py-16 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-lg pt-20"
                    >
                        <LoginForm onSubmit={handleLogin} />
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Login
