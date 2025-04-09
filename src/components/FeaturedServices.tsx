"use client"

import type React from "react"
import { motion } from "framer-motion"
import ServiceCard from "./ServiceCard"

// Sample data for featured services
const featuredServices = [
    {
        id: 1,
        title: "Réparation plomberie",
        description: "Service de réparation de plomberie rapide et professionnel pour tous vos problèmes d'eau.",
        price: 250,
        image: "/services/plumbing.jpg",
        category: "Plomberie",
        provider: {
            id: 101,
            name: "Ahmed M.",
            rating: 4.8,
        },
    },
    {
        id: 2,
        title: "Installation électrique",
        description: "Installation et réparation de systèmes électriques résidentiels et commerciaux.",
        price: 350,
        image: "/services/electrical.jpg",
        category: "Électricité",
        provider: {
            id: 102,
            name: "Karim B.",
            rating: 4.7,
        },
    },
    {
        id: 3,
        title: "Peinture intérieure",
        description: "Service de peinture professionnelle pour rafraîchir l'intérieur de votre maison.",
        price: 180,
        image: "/services/painting.jpg",
        category: "Peinture",
        provider: {
            id: 103,
            name: "Yasmine L.",
            rating: 4.9,
        },
    },
    {
        id: 4,
        title: "Menuiserie sur mesure",
        description: "Création de meubles et éléments en bois sur mesure selon vos besoins.",
        price: 450,
        image: "/services/carpentry.jpg",
        category: "Menuiserie",
        provider: {
            id: 104,
            name: "Omar H.",
            rating: 4.6,
        },
    },
]

const FeaturedServices: React.FC = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.h2
                        className="text-3xl font-bold text-gray-800 mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Services populaires
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Découvrez les services les plus demandés par nos clients
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredServices.map((service) => (
                        <ServiceCard key={service.id} {...service} />
                    ))}
                </div>

                <div className="text-center mt-10">
                    <motion.button
                        className="bg-secondary text-white px-6 py-3 rounded-md font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Voir tous les services
                    </motion.button>
                </div>
            </div>
        </section>
    )
}

export default FeaturedServices
