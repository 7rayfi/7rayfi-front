import type React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"

interface ArtisanCardProps {
    id: number
    name: string
    specialty: string
    location: string
    experience: number
    rating: number
    image: string
    services: number
    completedJobs: number
}

const ArtisanCard: React.FC<ArtisanCardProps> = ({
                                                     id,
                                                     name,
                                                     specialty,
                                                     location,
                                                     experience,
                                                     rating,
                                                     image,
                                                     services,
                                                     completedJobs,
                                                 }) => {
    const { t } = useLanguage();

    // Convertir la spécialité en clé de traduction
    const getSpecialtyKey = (specialty: string): string => {
        const specialtyMap: { [key: string]: string } = {
            "Plomberie": "category.plumbing",
            "Électricité": "category.electrical",
            "Peinture": "category.painting",
            "Menuiserie": "category.carpentry",
            "Nettoyage": "category.cleaning",
            "Jardinage": "category.gardening",
            "Décoration": "category.decoration",
            "Bricolage": "category.handyman"
        };

        return specialtyMap[specialty] || specialty;
    };

    return (
        <motion.div
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <img
                        src={image || "/placeholder.svg"}
                        alt={name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-light"
                    />
                    <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                        <p className="text-primary font-medium">{t(getSpecialtyKey(specialty)) || specialty}</p>
                        <div className="flex items-center justify-center sm:justify-start mt-2">
                            <span className="text-accent mr-1">★</span>
                            <span className="text-sm text-gray-700">{rating.toFixed(1)}</span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-sm text-gray-700">{location}</span>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                            <div className="bg-light rounded-md p-2">
                                <p className="text-xs text-gray-600">{t("artisans.experience")}</p>
                                <p className="font-semibold text-primary">{experience} {t("years")}</p>
                            </div>
                            <div className="bg-light rounded-md p-2">
                                <p className="text-xs text-gray-600">{t("artisans.services")}</p>
                                <p className="font-semibold text-primary">{services}</p>
                            </div>
                            <div className="bg-light rounded-md p-2">
                                <p className="text-xs text-gray-600">{t("artisans.completed")}</p>
                                <p className="font-semibold text-primary">{completedJobs}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex gap-2">
                    <Link to={`/artisans/${id}`} className="flex-1">
                        <motion.button
                            className="w-full bg-primary text-white py-2 px-4 rounded-md text-sm"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {t("artisans.profile")}
                        </motion.button>
                    </Link>
                    <Link to={`/contact/${id}`} className="flex-1">
                        <motion.button
                            className="w-full bg-secondary text-white py-2 px-4 rounded-md text-sm"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {t("artisans.contact")}
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default ArtisanCard