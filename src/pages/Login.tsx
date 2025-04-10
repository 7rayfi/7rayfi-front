"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import LoginForm from "../components/LoginForm"

const Login: React.FC = () => {
    const navigate = useNavigate()

    const handleLogin = (data: { email: string; password: string }) => {
        // Here you would normally handle the login logic with your API
        console.log("Login data:", data)

        // For demo purposes, we'll just redirect to the home page
        setTimeout(() => {
            navigate("/")
        }, 1000)
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <LoginForm onSubmit={handleLogin} />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Login
