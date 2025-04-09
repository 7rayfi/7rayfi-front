"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

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

const ServiceCard: React.FC<ServiceCardProps> = ({ id, title, description, price, image, category, provider }) => {
    return (
        <motion.div
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative">
                <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                    {category}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
                <div className="flex items-center mb-3">
                    <span className="text-yellow-500 mr-1">★</span>
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
                            Voir détails
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default ServiceCard
