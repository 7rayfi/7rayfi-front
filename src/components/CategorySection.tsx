import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Category {
    id: number;
    name: string;
    icon: string;
    count: number;
}

const categories: Category[] = [
    { id: 1, name: "Bricolage", icon: "🔨", count: 120 },
    { id: 2, name: "Plomberie", icon: "🚿", count: 85 },
    { id: 3, name: "Électricité", icon: "⚡", count: 67 },
    { id: 4, name: "Peinture", icon: "🖌️", count: 93 },
    { id: 5, name: "Jardinage", icon: "🌱", count: 45 },
    { id: 6, name: "Menuiserie", icon: "🪚", count: 38 },
    { id: 7, name: "Nettoyage", icon: "🧹", count: 74 },
    { id: 8, name: "Décoration", icon: "🏠", count: 52 },
];

const CategorySection: React.FC = () => {
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
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Explorez nos catégories</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Découvrez une large gamme de services proposés par nos artisans qualifiés dans différentes catégories
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
                                    <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                                    <p className="text-sm text-gray-500">{category.count} services</p>
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
                        Voir toutes les catégories
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
