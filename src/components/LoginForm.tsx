"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"
import { AtSign, Lock, Facebook, Mail, Eye, EyeOff, Phone } from "lucide-react"


interface LoginFormProps {
    onSubmit?: (data: { identifier: string; password: string }) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const { t } = useLanguage()
    const [identifier, setIdentifier] = useState("")

    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loginMethod, setLoginMethod] = useState<"email" | "phone">("phone")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        try {
            // Validate phone number if using phone login
            if (loginMethod === "phone") {
                const phoneRegex = /^(\+212|0)[5-7][0-9]{8}$/
                if (!phoneRegex.test(identifier)) {
                    throw new Error(t("auth.invalidPhone") || "Numéro de téléphone invalide")
                }
            }

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            if (onSubmit) {
                onSubmit({ identifier, password })
            }

            // Here you would normally handle the API response
            // For now, we'll just simulate a successful login
            console.log("Login successful")
        } catch (err: any) {
            setError(err.message || t("auth.error") || "Une erreur s'est produite")
            console.error("Login error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 },
        },
    }

    return (
        <motion.div
            className="w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden"

            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ backgroundColor: "#ffffff" }}
        >
            <div className="relative overflow-hidden">
                <div
                    className="py-8 px-6 relative z-10"
                    style={{
                        background: "linear-gradient(to right, #93441a, #c67c4e)",
                        color: "#ffffff",
                    }}
                >
                    <motion.h2
                        className="text-3xl font-bold text-white text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        {t("auth.login") || "Connexion"}
                    </motion.h2>
                    <motion.p
                        className="text-white text-center mt-2 opacity-90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        {t("auth.welcomeBack") || "Bienvenue à nouveau"}
                    </motion.p>

                    {/* Login method toggle */}
                    <div className="flex justify-center mt-4">
                        <div className="bg-white/20 p-1 rounded-lg flex">
                            <button
                                className={`px-4 py-1 rounded-md transition-all ${
                                    loginMethod === "phone" ? "bg-white text-primary" : "text-white"
                                }`}
                                onClick={() => setLoginMethod("phone")}
                                type="button"
                                style={{ color: loginMethod === "phone" ? "#93441a" : "" }}
                            >
                                {t("auth.phone") || "Téléphone"}
                            </button>
                            <button
                                className={`px-4 py-1 rounded-md transition-all ${
                                    loginMethod === "email" ? "bg-white text-primary" : "text-white"
                                }`}
                                onClick={() => setLoginMethod("email")}
                                type="button"
                                style={{ color: loginMethod === "email" ? "#93441a" : "" }}
                            >
                                {t("auth.email") || "Email"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Decorative circles */}
                <motion.div
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent opacity-20"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 45, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                ></motion.div>
                <motion.div
                    className="absolute -bottom-20 -left-10 w-60 h-60 rounded-full bg-primary opacity-10"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, -30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                ></motion.div>
            </div>

            <div className="p-8 bg-white">
                {error && (
                    <motion.div
                        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <p className="flex items-center">
                            <span className="mr-2">⚠️</span>
                            {error}
                        </p>
                    </motion.div>
                )}

                <motion.form onSubmit={handleSubmit} variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div className="mb-6" variants={itemVariants}>
                        <label htmlFor="identifier" className="block text-gray-700 font-medium mb-2">
                            {loginMethod === "email" ? t("auth.email") || "Email" : t("auth.phone") || "Numéro de téléphone"}
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {loginMethod === "email" ? (
                                    <AtSign className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <Phone className="h-5 w-5 text-gray-400" />
                                )}
                            </div>
                            <input
                                type={loginMethod === "email" ? "email" : "tel"}
                                id="identifier"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                placeholder={loginMethod === "email" ? "votre@email.com" : "+212 6XX XXX XXX"}
                                required
                            />
                        </div>
                        {loginMethod === "phone" && (
                            <p className="mt-1 text-xs text-gray-500">
                                {t("auth.phoneFormat") || "Format: +212 6XX XXX XXX ou 06XX XXX XXX"}
                            </p>
                        )}
                    </motion.div>

                    <motion.div className="mb-6" variants={itemVariants}>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            {t("auth.password") || "Mot de passe"}
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </motion.div>


                    <motion.div className="flex items-center justify-between mb-6" variants={itemVariants}>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember-me"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                style={{ color: "#93441a" }}
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                {t("auth.rememberMe") || "Se souvenir de moi"}
                            </label>
                        </div>
                        <div className="text-sm">
                            <Link
                                to="/forgot-password"
                                className="hover:text-primary-dark transition-colors"
                                style={{ color: "#93441a" }}
                            >
                                {t("auth.forgotPassword") || "Mot de passe oublié?"}

                            </Link>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <motion.button
                            type="submit"
                            className="w-full py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 shadow-lg text-white"
                            style={{ backgroundColor: "#93441a" }}
                            whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(147, 68, 26, 0.3)" }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                  <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                  >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                                    {t("auth.loading") || "Chargement..."}
                </span>
                            ) : (
                                t("auth.signIn") || "Se connecter"
                            )}
                        </motion.button>
                    </motion.div>
                </motion.form>


                <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">{t("auth.or") || "ou"}</span>

                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <motion.button
                            type="button"
                            className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Facebook className="w-5 h-5 mr-2 text-blue-600" />
                            Facebook
                        </motion.button>
                        <motion.button
                            type="button"
                            className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Mail className="w-5 h-5 mr-2 text-red-500" />
                            Google
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    className="mt-8 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <p className="text-sm text-gray-600">
                        {t("auth.noAccount") || "Vous n'avez pas de compte?"}{" "}
                        <Link to="/register" className="font-medium hover:underline" style={{ color: "#93441a" }}>
                            {t("auth.signUp") || "S'inscrire"}

                        </Link>
                    </p>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default LoginForm
