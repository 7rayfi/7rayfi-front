import type React from "react"
import { motion } from "framer-motion"
import ServiceCard from "./ServiceCard"
import { useLanguage } from "../context/LanguageContext"

// Sample data for featured services with web images
const featuredServices = [
    {
        id: 1,
        title: "Réparation plomberie",
        titleKey: "services.plumbing.repair",
        description: "Service de réparation de plomberie rapide et professionnel pour tous vos problèmes d'eau.",
        descriptionKey: "services.plumbing.repair.description",
        price: 2500,

        image:
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "Plomberie",
        categoryKey: "category.plumbing",
        provider: {
            id: 101,
            name: "Ahmed M.",
            rating: 4.8,
        },
    },
    {
        id: 2,
        title: "Installation électrique",
        titleKey: "services.electrical.installation",
        description: "Installation et réparation de systèmes électriques résidentiels et commerciaux.",
        descriptionKey: "services.electrical.installation.description",
        price: 350,
        image:
            "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
        category: "Électricité",
        categoryKey: "category.electrical",
        provider: {
            id: 102,
            name: "Karim B.",
            rating: 4.7,
        },
    },
    {
        id: 3,
        title: "Peinture intérieure",
        titleKey: "services.painting.interior",
        description: "Service de peinture professionnelle pour rafraîchir l'intérieur de votre maison.",
        descriptionKey: "services.painting.interior.description",
        price: 180,
        image:
            "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        category: "Peinture",
        categoryKey: "category.painting",
        provider: {
            id: 103,
            name: "Yasmine L.",
            rating: 4.9,
        },
    },
    {
        id: 4,
        title: "Menuiserie sur mesure",
        titleKey: "services.carpentry.custom",
        description: "Création de meubles et éléments en bois sur mesure selon vos besoins.",
        descriptionKey: "services.carpentry.custom.description",
        price: 450,
        image:
            "https://images.unsplash.com/photo-1588854337236-6889d631faa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "Menuiserie",
        categoryKey: "category.carpentry",
        provider: {
            id: 104,
            name: "Omar H.",
            rating: 4.6,
        },
    },
]

const FeaturedServices: React.FC = () => {
    const { t } = useLanguage();

    // Map through the services and add translated titles and descriptions
    const translatedServices = featuredServices.map(service => ({
        ...service,
        title: t(service.titleKey) || service.title,
        description: t(service.descriptionKey) || service.description,
        category: t(service.categoryKey) || service.category
    }));

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
                        {t("services.title")}
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {t("services.subtitle")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {translatedServices.map((service) => (
                        <ServiceCard key={service.id} {...service} />
                    ))}
                </div>

                <div className="text-center mt-10">
                    <motion.button
                        className="bg-[#f77f00] text-white px-6 py-3 rounded-md font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t("services.button")}
                    </motion.button>
                </div>
            </div>
        </section>
    )
}

export default FeaturedServices