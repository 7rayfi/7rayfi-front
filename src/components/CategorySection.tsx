import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from "../context/LanguageContext";

interface Category {
    id: number;
    name: string;
    translationKey: string;
    icon: string;
    count: number;
}

const CategorySection: React.FC = () => {
    const { t } = useLanguage();

    const categories: Category[] = [
        { id: 1, name: "Bricolage", translationKey: "category.masonry", icon: "🔨", count: 120 },
        { id: 2, name: "Plomberie", translationKey: "category.plumbing", icon: "🚿", count: 85 },
        { id: 3, name: "Électricité", translationKey: "category.electrical", icon: "⚡", count: 67 },
        { id: 4, name: "Peinture", translationKey: "category.painting", icon: "🖌️", count: 93 },
        { id: 5, name: "Jardinage", translationKey: "category.gardening", icon: "🌱", count: 45 },
        { id: 6, name: "Menuiserie", translationKey: "category.carpentry", icon: "🪚", count: 38 },
        { id: 7, name: "Nettoyage", translationKey: "category.cleaning", icon: "🧹", count: 74 },
        { id: 8, name: "Décoration", translationKey: "category.decoration", icon: "🏠", count: 52 },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("services.categories.title")}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {t("services.categories.subtitle")}
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            variants={item}
                            whileHover={{ y: -5 }}
                        >
                            <Link to={`/category/${category.id}`} className="block">
                                <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                                    <div className="text-4xl mb-3">{category.icon}</div>
                                    <h3 className="font-semibold text-gray-800 mb-1">{t(category.translationKey) || category.name}</h3>
                                    <p className="text-sm text-gray-500">{category.count} {t("services.count")}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="text-center mt-10">
                    <motion.button
                        className="bg-primary text-white px-6 py-3 rounded-md font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t("services.categories.viewAll")}
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default CategorySection;