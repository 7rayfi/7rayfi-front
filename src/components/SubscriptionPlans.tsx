import type React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"

interface Plan {
    id: string
    nameKey: string
    priceKey: string
    descriptionKey: string
    featuresKeys: string[]
    popular: boolean
}

const SubscriptionPlans: React.FC = () => {
    const { t } = useLanguage();

    const plans: Plan[] = [
        {
            id: "basic",
            nameKey: "plans.basic.title",
            priceKey: "plans.basic.price",
            descriptionKey: "plans.basic.description",
            featuresKeys: [
                "plans.basic.feature1",
                "plans.basic.feature2",
                "plans.basic.feature3",
                "plans.basic.feature4",
            ],
            popular: false,
        },
        {
            id: "premium",
            nameKey: "plans.premium.title",
            priceKey: "plans.premium.price",
            descriptionKey: "plans.premium.description",
            featuresKeys: [
                "plans.premium.feature1",
                "plans.premium.feature2",
                "plans.premium.feature3",
                "plans.premium.feature4",
                "plans.premium.feature5",
            ],
            popular: true,
        },
        {
            id: "extra",
            nameKey: "plans.extra.title",
            priceKey: "plans.extra.price",
            descriptionKey: "plans.extra.description",
            featuresKeys: [
                "plans.extra.feature1",
                "plans.extra.feature2",
                "plans.extra.feature3",
                "plans.extra.feature4",
                "plans.extra.feature5",
                "plans.extra.feature6",
            ],
            popular: false,
        },
    ];

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
                        {t("plans.title")}
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {t("plans.subtitle")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            className={`bg-white rounded-lg shadow-lg overflow-hidden ${plan.popular ? "ring-2 ring-primary" : ""}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -10 }}
                        >
                            {plan.popular && (
                                <div className="bg-primary text-white text-center py-2 text-sm font-semibold">
                                    {t("plans.popular")}
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t(plan.nameKey)}</h3>
                                <p className="text-gray-600 mb-4">{t(plan.descriptionKey)}</p>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-primary">{t(plan.priceKey)}</span>
                                    <span className="text-gray-600"> {t("plans.monthly")}</span>
                                </div>
                                <ul className="space-y-3 mb-6">
                                    {plan.featuresKeys.map((featureKey, index) => (
                                        <li key={index} className="flex items-start">
                                            <svg
                                                className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <span className="text-gray-600">{t(featureKey)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <motion.button
                                    className={`w-full py-3 rounded-md font-semibold ${
                                        plan.popular ? "bg-primary text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                    }`}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {plan.id === "basic" ? t("plans.button.free") : t("plans.button.subscribe")}
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SubscriptionPlans