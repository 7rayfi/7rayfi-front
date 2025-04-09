"use client"

import type React from "react"
import { motion } from "framer-motion"

const steps = [
    {
        id: 1,
        title: "Recherchez un service",
        description:
            "Parcourez notre large sélection de services ou utilisez la recherche pour trouver ce dont vous avez besoin.",
        icon: "🔍",
    },
    {
        id: 2,
        title: "Choisissez un prestataire",
        description: "Comparez les profils, les évaluations et les portfolios pour choisir le meilleur prestataire.",
        icon: "👨‍🔧",
    },
    {
        id: 3,
        title: "Contactez et réservez",
        description: "Discutez directement avec le prestataire et réservez le service à la date qui vous convient.",
        icon: "📅",
    },
    {
        id: 4,
        title: "Profitez du service",
        description: "Recevez un service de qualité et laissez votre avis pour aider la communauté.",
        icon: "⭐",
    },
]

const HowItWorks: React.FC = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.h2
                        className="text-3xl font-bold text-gray-800 mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Comment ça marche
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Suivez ces étapes simples pour trouver et réserver le service dont vous avez besoin
                    </motion.p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {steps.map((step) => (
                        <motion.div key={step.id} variants={item} className="text-center">
                            <div className="relative mb-8">
                                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl mx-auto">
                                    {step.icon}
                                </div>
                                {step.id < steps.length && (
                                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-200 -z-10">
                                        <div className="absolute top-0 left-0 w-1/2 h-full bg-primary"></div>
                                    </div>
                                )}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="text-center mt-12">
                    <motion.button
                        className="bg-primary text-white px-6 py-3 rounded-md font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Commencer maintenant
                    </motion.button>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
