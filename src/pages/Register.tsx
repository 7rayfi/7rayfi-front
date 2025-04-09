"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import RegisterForm from "../components/RegisterForm"

const Register: React.FC = () => {
    const navigate = useNavigate()

    const handleRegister = (data: {
        firstName: string
        lastName: string
        email: string
        password: string
        userType: "client" | "hrayfi"
    }) => {
        // Here you would normally handle the registration logic with your API
        console.log("Registration data:", data)

        // For demo purposes, we'll just redirect to the login page
        setTimeout(() => {
            navigate("/login")
        }, 1000)
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <RegisterForm onSubmit={handleRegister} />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Register
