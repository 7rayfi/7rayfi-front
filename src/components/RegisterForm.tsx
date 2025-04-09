"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

interface RegisterFormProps {
    onSubmit?: (data: {
        firstName: string
        lastName: string
        email: string
        password: string
        userType: "client" | "hrayfi"
    }) => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [userType, setUserType] = useState<"client" | "hrayfi">("client")
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)

    const validatePassword = () => {
        if (password !== confirmPassword) {
            setPasswordError("Les mots de passe ne correspondent pas")
            return false
        }
        if (password.length < 8) {
            setPasswordError("Le mot de passe doit contenir au moins 8 caractères")
            return false
        }
        setPasswordError(null)
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!validatePassword()) {
            return
        }

        if (!agreeTerms) {
            setError("Vous devez accepter les conditions d'utilisation")
            return
        }

        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            if (onSubmit) {
                onSubmit({ firstName, lastName, email, password, userType })
            }

            // Here you would normally handle the API response
            // For now, we'll just simulate a successful registration
            console.log("Registration successful")
        } catch (err) {
            setError("Une erreur est survenue. Veuillez réessayer.")
            console.error("Registration error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <motion.div
            className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-gradient-to-r from-primary to-secondary py-6 px-6">
                <h2 className="text-2xl font-bold text-white text-center">Inscription</h2>
            </div>

            <div className="p-6">
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="flex gap-4 mb-4">
                        <div className="w-1/2">
                            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                                Prénom
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Prénom"
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                                Nom
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Nom"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="votre@email.com"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                            Confirmer le mot de passe
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                passwordError ? "border-red-500" : ""
                            }`}
                            placeholder="••••••••"
                            required
                        />
                        {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Type de compte</label>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <input
                                    type="radio"
                                    id="client"
                                    name="userType"
                                    value="client"
                                    checked={userType === "client"}
                                    onChange={() => setUserType("client")}
                                    className="sr-only"
                                />
                                <label
                                    htmlFor="client"
                                    className={`block w-full text-center py-2 px-4 border rounded-md cursor-pointer ${
                                        userType === "client"
                                            ? "bg-primary text-white border-primary"
                                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                    }`}
                                >
                                    Client
                                </label>
                            </div>
                            <div className="flex-1">
                                <input
                                    type="radio"
                                    id="hrayfi"
                                    name="userType"
                                    value="hrayfi"
                                    checked={userType === "hrayfi"}
                                    onChange={() => setUserType("hrayfi")}
                                    className="sr-only"
                                />
                                <label
                                    htmlFor="hrayfi"
                                    className={`block w-full text-center py-2 px-4 border rounded-md cursor-pointer ${
                                        userType === "hrayfi"
                                            ? "bg-primary text-white border-primary"
                                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                    }`}
                                >
                                    Prestataire (Hrayfi)
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                id="agree-terms"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                            />
                            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                                J'accepte les{" "}
                                <Link to="/terms" className="text-primary hover:underline">
                                    conditions d'utilisation
                                </Link>{" "}
                                et la{" "}
                                <Link to="/privacy" className="text-primary hover:underline">
                                    politique de confidentialité
                                </Link>
                            </label>
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        className="w-full bg-primary text-white py-2 px-4 rounded-md font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Inscription en cours...
              </span>
                        ) : (
                            "S'inscrire"
                        )}
                    </motion.button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Ou s'inscrire avec</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <motion.button
                            type="button"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    fillRule="evenodd"
                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Facebook
                        </motion.button>
                        <motion.button
                            type="button"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                            </svg>
                            Google
                        </motion.button>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Vous avez déjà un compte ?{" "}
                        <Link to="/login" className="text-primary font-medium hover:underline">
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

export default RegisterForm
