import type React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"

const HeroSection: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="relative bg-gradient-to-r from-[#4a2511] to-[#DAAB3A] min-h-screen flex items-center">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
            </div>

            <div className="container mx-auto px-4 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white"
                    >
                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            {t("hero.title")}
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl mb-8 text-gray-100"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            {t("hero.subtitle")}
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <motion.button
                                className="bg-white text-[#d62828] font-semibold px-6 py-3 rounded-md shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t("hero.button.find")}
                            </motion.button>
                            <motion.button
                                className="border-2 border-white text-white font-semibold px-6 py-3 rounded-md"
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t("hero.button.become")}
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className="mt-12 flex items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            <div className="flex -space-x-2">
                                {/* Utilisation d'images du web au lieu d'images locales */}
                                <img
                                    src="https://randomuser.me/api/portraits/men/32.jpg"
                                    alt="User 1"
                                    className="w-10 h-10 rounded-full border-2 border-white"
                                />
                                <img
                                    src="https://randomuser.me/api/portraits/women/44.jpg"
                                    alt="User 2"
                                    className="w-10 h-10 rounded-full border-2 border-white"
                                />
                                <img
                                    src="https://randomuser.me/api/portraits/men/86.jpg"
                                    alt="User 3"
                                    className="w-10 h-10 rounded-full border-2 border-white"
                                />
                                <img
                                    src="https://randomuser.me/api/portraits/women/63.jpg"
                                    alt="User 4"
                                    className="w-10 h-10 rounded-full border-2 border-white"
                                />
                            </div>
                            <div className="ml-4">
                                <div className="text-yellow-300 flex">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                                <p className="text-white text-sm">{t("hero.providers")}</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden md:block"
                    >
                        {/* Image d'un artisan marocain depuis le web */}
                        <motion.img
                            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                            alt="Hrayfi Services"
                            className="w-full h-auto rounded-lg shadow-2xl"
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                                duration: 2,
                            }}
                        />
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
                    <path
                        fill="#ffffff"
                        fillOpacity="1"
                        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </div>
    )
}

export default HeroSection