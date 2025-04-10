"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"

interface ServiceCardProps {
    id: number
    title: string
    description: string
    price: number
    image: string
    category: string
    provider: {
        id: number
        name: string
        rating: number
    }
}

// Images par défaut pour les services
const defaultServiceImages = [
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", // plomberie
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80", // électricité
    "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80", // peinture
    "https://images.unsplash.com/photo-1588854337236-6889d631faa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", // menuiserie
]

const ServiceCard: React.FC<ServiceCardProps> = ({ id, title, description, price, image, category, provider }) => {
    const { t } = useLanguage()

    // Utiliser l'image fournie ou une image par défaut basée sur l'ID
    const imageUrl = image || defaultServiceImages[id % defaultServiceImages.length]

    return (
        <motion.div
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative">
                <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                    {category}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
                <div className="flex items-center mb-3">
                    <span className="text-accent mr-1">★</span>
                    <span className="text-sm text-gray-700">{provider.rating.toFixed(1)}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-700">{provider.name}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">{price} DH</span>
                    <Link to={`/services/${id}`}>
                        <motion.button
                            className="bg-secondary text-white px-3 py-1 rounded text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {t("services.details")}
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default ServiceCard
