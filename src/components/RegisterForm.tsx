"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"
import { AtSign, Lock, User, Facebook, Mail, Eye, EyeOff, UserCheck, UserCog, Phone } from "lucide-react"

interface RegisterFormProps {
    onSubmit?: (data: {
        firstName: string
        lastName: string
        email?: string
        phoneNumber: string
        password: string
        userType: "client" | "hrayfi"
    }) => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
    const { t } = useLanguage()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [userType, setUserType] = useState<"client" | "hrayfi">("client")
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [phoneError, setPhoneError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)

    const validatePassword = () => {
        if (password !== confirmPassword) {
            setPasswordError(t("auth.password.mismatch") || "Les mots de passe ne correspondent pas")
            return false
        }
        if (password.length < 8) {
            setPasswordError(t("auth.password.tooShort") || "Le mot de passe doit contenir au moins 8 caractères")
            return false
        }
        setPasswordError(null)
        return true
    }

    const validatePhone = () => {
        const phoneRegex = /^(\+212|0)[5-7][0-9]{8}$/
        if (!phoneRegex.test(phoneNumber)) {
            setPhoneError(t("auth.invalidPhone") || "Numéro de téléphone invalide")
            return false
        }
        setPhoneError(null)
        return true
    }

    const handleNextStep = () => {
        if (currentStep === 1) {
            if (!firstName || !lastName || !phoneNumber) {
                setError(t("auth.fillRequiredFields") || "Veuillez remplir tous les champs obligatoires")
                return
            }

            if (!validatePhone()) {
                return
            }

            setError(null)
            setCurrentStep(2)
        }
    }

    const handlePrevStep = () => {
        setCurrentStep(1)
        setError(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!validatePassword()) {
            return
        }

        if (!validatePhone()) {
            return
        }

        if (!agreeTerms) {
            setError(t("auth.terms.required") || "Vous devez accepter les conditions d'utilisation")
            return
        }

        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            if (onSubmit) {
                onSubmit({
                    firstName,
                    lastName,
                    email: email || undefined, // Make email optional
                    phoneNumber,
                    password,
                    userType,
                })
            }

            // Here you would normally handle the API response
            // For now, we'll just simulate a successful registration
            console.log("Registration successful")
        } catch (err) {
            setError(t("auth.error") || "Une erreur s'est produite")
            console.error("Registration error:", err)
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
                        {t("auth.register") || "Inscription"}
                    </motion.h2>
                    <motion.p
                        className="text-white text-center mt-2 opacity-90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        {t("auth.createAccount") || "Créez votre compte"}
                    </motion.p>

                    {/* Step indicator */}
                    <div className="flex justify-center mt-6">
                        <div className="flex items-center">
                            <motion.div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    currentStep === 1 ? "bg-white text-primary" : "bg-white/30 text-white"
                                }`}
                                whileHover={{ scale: 1.1 }}
                                style={{ color: currentStep === 1 ? "#93441a" : "white" }}
                            >
                                1
                            </motion.div>
                            <div className={`w-10 h-1 ${currentStep === 2 ? "bg-white" : "bg-white/30"}`}></div>
                            <motion.div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    currentStep === 2 ? "bg-white text-primary" : "bg-white/30 text-white"
                                }`}
                                whileHover={{ scale: 1.1 }}
                                style={{ color: currentStep === 2 ? "#93441a" : "white" }}
                            >
                                2
                            </motion.div>
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

                <form onSubmit={handleSubmit}>
                    {currentStep === 1 && (
                        <motion.div variants={containerVariants} initial="hidden" animate="visible" custom={1} key="step1">
                            <motion.div className="mb-6" variants={itemVariants}>
                                <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                                    {t("auth.firstName") || "Prénom"} *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                        placeholder={t("auth.firstName") || "Prénom"}
                                        required
                                    />
                                </div>
                            </motion.div>

                            <motion.div className="mb-6" variants={itemVariants}>
                                <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                                    {t("auth.lastName") || "Nom"} *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                        placeholder={t("auth.lastName") || "Nom"}
                                        required
                                    />
                                </div>
                            </motion.div>

                            <motion.div className="mb-6" variants={itemVariants}>
                                <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
                                    {t("auth.phone") || "Numéro de téléphone"} *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                                            phoneError ? "border-red-500" : "border-gray-300"
                                        }`}
                                        placeholder="+212 6XX XXX XXX"
                                        required
                                    />
                                </div>
                                {phoneError && <p className="mt-1 text-sm text-red-600">{phoneError}</p>}
                                <p className="mt-1 text-xs text-gray-500">
                                    {t("auth.phoneFormat") || "Format: +212 6XX XXX XXX ou 06XX XXX XXX"}
                                </p>
                            </motion.div>

                            <motion.div className="mb-6" variants={itemVariants}>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                    {t("auth.email") || "Email"} <span className="text-gray-400 text-sm">(facultatif)</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <AtSign className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                        placeholder="votre@email.com"
                                    />
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <motion.button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="w-full py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 shadow-lg text-white"
                                    style={{ backgroundColor: "#93441a" }}
                                    whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(147, 68, 26, 0.3)" }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {t("auth.next") || "Suivant"}
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div variants={containerVariants} initial="hidden" animate="visible" custom={-1} key="step2">
                            <motion.div className="mb-6" variants={itemVariants}>
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                    {t("auth.password") || "Mot de passe"} *
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

                            <motion.div className="mb-6" variants={itemVariants}>
                                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                                    {t("auth.confirmPassword") || "Confirmer le mot de passe"} *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                                            passwordError ? "border-red-500" : "border-gray-300"
                                        }`}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
                            </motion.div>

                            <motion.div className="mb-6" variants={itemVariants}>
                                <label className="block text-gray-700 font-medium mb-2">
                                    {t("auth.accountType") || "Type de compte"}
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        className={`relative rounded-lg border-2 ${
                                            userType === "client" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                                        } p-4 cursor-pointer transition-all duration-200`}
                                        onClick={() => setUserType("client")}
                                        style={{
                                            borderColor: userType === "client" ? "#93441a" : "",
                                            backgroundColor: userType === "client" ? "rgba(147, 68, 26, 0.05)" : "",
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            id="client"
                                            name="userType"
                                            value="client"
                                            checked={userType === "client"}
                                            onChange={() => setUserType("client")}
                                            className="sr-only"
                                        />
                                        <div className="flex flex-col items-center">
                                            <UserCheck
                                                className={`h-8 w-8 mb-2 ${userType === "client" ? "text-primary" : "text-gray-400"}`}
                                                style={{ color: userType === "client" ? "#93441a" : "" }}
                                            />
                                            <label
                                                htmlFor="client"
                                                className={`block text-center font-medium ${userType === "client" ? "text-primary" : "text-gray-700"}`}
                                                style={{ color: userType === "client" ? "#93441a" : "" }}
                                            >
                                                {t("auth.client") || "Client"}
                                            </label>
                                        </div>
                                        {userType === "client" && (
                                            <motion.div
                                                className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                                style={{ backgroundColor: "#93441a" }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </motion.div>
                                        )}
                                    </div>
                                    <div
                                        className={`relative rounded-lg border-2 ${
                                            userType === "hrayfi" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                                        } p-4 cursor-pointer transition-all duration-200`}
                                        onClick={() => setUserType("hrayfi")}
                                        style={{
                                            borderColor: userType === "hrayfi" ? "#93441a" : "",
                                            backgroundColor: userType === "hrayfi" ? "rgba(147, 68, 26, 0.05)" : "",
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            id="hrayfi"
                                            name="userType"
                                            value="hrayfi"
                                            checked={userType === "hrayfi"}
                                            onChange={() => setUserType("hrayfi")}
                                            className="sr-only"
                                        />
                                        <div className="flex flex-col items-center">
                                            <UserCog
                                                className={`h-8 w-8 mb-2 ${userType === "hrayfi" ? "text-primary" : "text-gray-400"}`}
                                                style={{ color: userType === "hrayfi" ? "#93441a" : "" }}
                                            />
                                            <label
                                                htmlFor="hrayfi"
                                                className={`block text-center font-medium ${userType === "hrayfi" ? "text-primary" : "text-gray-700"}`}
                                                style={{ color: userType === "hrayfi" ? "#93441a" : "" }}
                                            >
                                                {t("auth.provider") || "Prestataire"}
                                            </label>
                                        </div>
                                        {userType === "hrayfi" && (
                                            <motion.div
                                                className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                                style={{ backgroundColor: "#93441a" }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div className="mb-6" variants={itemVariants}>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            id="agree-terms"
                                            checked={agreeTerms}
                                            onChange={(e) => setAgreeTerms(e.target.checked)}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                            style={{ color: "#93441a" }}
                                        />
                                    </div>
                                    <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                                        {t("auth.terms") || "J'accepte les"}{" "}
                                        <Link to="/terms" className="text-primary hover:underline" style={{ color: "#93441a" }}>
                                            {t("footer.terms") || "conditions d'utilisation"}
                                        </Link>{" "}
                                        {t("auth.privacy") || "et la"}{" "}
                                        <Link to="/privacy" className="text-primary hover:underline" style={{ color: "#93441a" }}>
                                            {t("footer.privacy") || "politique de confidentialité"}
                                        </Link>
                                    </label>
                                </div>
                            </motion.div>

                            <motion.div className="flex gap-4" variants={itemVariants}>
                                <motion.button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="w-1/3 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all duration-200"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {t("auth.back") || "Retour"}
                                </motion.button>
                                <motion.button
                                    type="submit"
                                    className="w-2/3 py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 shadow-lg text-white"
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
                                        t("auth.signUp") || "S'inscrire"
                                    )}
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </form>

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
                        {t("auth.haveAccount") || "Vous avez déjà un compte?"}{" "}
                        <Link to="/login" className="font-medium hover:underline" style={{ color: "#93441a" }}>
                            {t("auth.signIn") || "Se connecter"}
                        </Link>
                    </p>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default RegisterForm
