"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import RegisterForm from "../components/RegisterForm"
import { useLanguage } from "../context/LanguageContext"
import { motion } from "framer-motion"
import BackgroundAnimation from "../components/animations/BackgroundAnimation.tsx";

const Register: React.FC = () => {
    const navigate = useNavigate()
    const { language } = useLanguage()

    const handleRegister = (data: {
        firstName: string
        lastName: string
        email?: string
        phoneNumber: string
        password: string
        userType: "client" | "hrayfi"
    }) => {
        // Here you would normally handle the registration logic with your API
        console.log("Registration data:", data)

        setTimeout(() => {
            navigate("/login")
        }, 1000)
    }

    return (
        <div className={language === "ar" ? "rtl" : ""}>
            <BackgroundAnimation type="register" />
            <Navbar />
            <main className="flex-grow min-h-screen">
                <div className="container mx-auto px-4 py-16 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-lg pt-20"
                    >
                        <RegisterForm onSubmit={handleRegister} />
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Register
