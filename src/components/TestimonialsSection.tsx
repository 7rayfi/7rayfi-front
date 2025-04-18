import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"

interface Testimonial {
    id: number
    name: string
    role: string
    roleKey: string
    avatar: string
    content: string
    contentKey: string
    rating: number
}

const TestimonialsSection: React.FC = () => {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0)

    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: "Fatima Zahra",
            role: "Cliente",
            roleKey: "testimonials.role.client.female",
            avatar: "https://randomuser.me/api/portraits/women/32.jpg",
            content:
                "J'ai trouvé un excellent plombier sur Hrayfi qui a résolu mon problème en moins d'une heure. Le service était rapide et professionnel. Je recommande vivement cette plateforme !",
            contentKey: "testimonials.1.content",
            rating: 5,
        },
        {
            id: 2,
            name: "Mohammed Amine",
            role: "Client",
            roleKey: "testimonials.role.client.male",
            avatar: "https://randomuser.me/api/portraits/men/45.jpg",
            content:
                "Grâce à Hrayfi, j'ai pu trouver un électricien qualifié pour refaire toute l'installation électrique de ma maison. Le travail était impeccable et le prix très raisonnable.",
            contentKey: "testimonials.2.content",
            rating: 4,
        },
        {
            id: 3,
            name: "Nadia Benkiran",
            role: "Cliente",
            roleKey: "testimonials.role.client.female",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            content:
                "J'utilise Hrayfi depuis plusieurs mois maintenant et je suis toujours satisfaite des services. La plateforme est facile à utiliser et les prestataires sont très professionnels.",
            contentKey: "testimonials.3.content",
            rating: 5,
        },
        {
            id: 4,
            name: "Youssef Tazi",
            role: "Prestataire",
            roleKey: "testimonials.role.provider",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
            content:
                "En tant que menuisier, Hrayfi m'a permis de développer ma clientèle et d'augmenter mes revenus. La plateforme est très bien conçue et l'équipe support est toujours disponible.",
            contentKey: "testimonials.4.content",
            rating: 5,
        },
    ];

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <section className="py-16 bg-gradient-to-r from-[#d62828] to-[#f77f00] text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.h2
                        className="text-3xl font-bold mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        {t("testimonials.title")}
                    </motion.h2>
                    <motion.p
                        className="max-w-2xl mx-auto text-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {t("testimonials.subtitle")}
                    </motion.p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white text-gray-800 rounded-lg shadow-xl p-8"
                        >
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="mb-6 md:mb-0 md:mr-8">
                                    <img
                                        src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                                        alt={testimonials[currentIndex].name}
                                        className="w-24 h-24 rounded-full object-cover mx-auto"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex text-yellow-500 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-xl">
                                                {i < testimonials[currentIndex].rating ? "★" : "☆"}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-gray-700 italic mb-4">
                                        "{t(testimonials[currentIndex].contentKey) || testimonials[currentIndex].content}"
                                    </p>
                                    <div>
                                        <h4 className="font-bold text-[#d62828]">{testimonials[currentIndex].name}</h4>
                                        <p className="text-gray-600">
                                            {t(testimonials[currentIndex].roleKey) || testimonials[currentIndex].role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <button
                        onClick={prevTestimonial}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-white text-[#d62828] rounded-full p-2 shadow-md hover:bg-gray-100"
                        aria-label={t("testimonials.prev")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextTestimonial}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-white text-[#d62828] rounded-full p-2 shadow-md hover:bg-gray-100"
                        aria-label={t("testimonials.next")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <div className="flex justify-center mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 mx-1 rounded-full ${index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"}`}
                            aria-label={t("testimonials.goto").replace("{index}", (index + 1).toString())}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection