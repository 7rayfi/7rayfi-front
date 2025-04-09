"use client"

import type React from "react"
import { motion } from "framer-motion"

interface Plan {
    id: string
    name: string
    price: number
    description: string
    features: string[]
    popular: boolean
}

const plans: Plan[] = [
    {
        id: "basic",
        name: "Basic",
        price: 0,
        description: "Pour commencer à explorer la plateforme",
        features: [
            "Accès limité aux fonctionnalités",
            "Jusqu'à 5 demandes de services par mois",
            "Accès aux formations gratuites",
            "Support par email",
        ],
        popular: false,
    },
    {
        id: "premium",
        name: "Premium",
        price: 99,
        description: "Pour une utilisation régulière",
        features: [
            "Accès à toutes les fonctionnalités",
            "Jusqu'à 20 demandes de services par mois",
            "Accès aux formations premium",
            "Meilleure visibilité pour les prestataires",
            "Support prioritaire",
        ],
        popular: true,
    },
    {
        id: "extra",
        name: "Extra",
        price: 199,
        description: "Pour une utilisation professionnelle",
        features: [
            "Accès illimité à toutes les fonctionnalités",
            "Demandes de services illimitées",
            "Accès à toutes les formations",
            "Visibilité maximale pour les prestataires",
            "Support dédié 24/7",
            "Fonctionnalités exclusives",
        ],
        popular: false,
    },
]

const SubscriptionPlans: React.FC = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.h2
                        className="text-3xl font-bold text-gray-800 mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Choisissez votre forfait
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Des forfaits adaptés à tous les besoins et budgets
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            className={`bg-white rounded-lg shadow-lg overflow-hidden ${plan.popular ? "ring-2 ring-primary" : ""}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -10 }}
                        >
                            {plan.popular && (
                                <div className="bg-primary text-white text-center py-2 text-sm font-semibold">PLUS POPULAIRE</div>
                            )}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                                <p className="text-gray-600 mb-4">{plan.description}</p>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                                    <span className="text-gray-600"> DH/mois</span>
                                </div>
                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <svg
                                                className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <motion.button
                                    className={`w-full py-3 rounded-md font-semibold ${
                                        plan.popular ? "bg-primary text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                    }`}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {plan.price === 0 ? "Commencer gratuitement" : "S'abonner maintenant"}
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SubscriptionPlans
