import type React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"

const CTASection: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section className="py-16 bg-gradient-to-r from-secondary to-primary text-white"   style={{
            background: `linear-gradient(to right, var(--secondary), var(--primary), var(--accent))`
        }}>
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        {t("cta.title")}
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-100 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {t("cta.subtitle")}
                    </motion.p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <motion.button
                            className="bg-white text-primary font-semibold px-8 py-4 rounded-md shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {t("cta.button.find")}
                        </motion.button>
                        <motion.button
                            className="border-2 border-white text-white font-semibold px-8 py-4 rounded-md"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {t("cta.button.become")}
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default CTASection