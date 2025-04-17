"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useLanguage } from "../context/LanguageContext"

// Types pour les services
interface Service {
    id: number
    title: string
    description: string
    price: number
    category: string
    image: string
    rating: number
    reviewCount: number
}

// Types pour les avis
interface Review {
    id: number
    author: string
    avatar: string
    rating: number
    comment: string
    date: string
    serviceId: number
}

// Types pour les certifications
interface Certification {
    id: number
    title: string
    issuer: string
    year: number
    icon: string
}

// Types pour les statistiques
interface Statistic {
    label: string
    value: number | string
    icon: string
}

// Données fictives pour l'artisan
const artisanData = {
    id: 101,
    name: "Ahmed Mansouri",
    title: "Plombier professionnel",
    specialty: "plumbing",
    location: "Casablanca",
    phone: "+212 661-234567",
    email: "ahmed.mansouri@example.com",
    website: "www.plomberie-mansouri.ma",
    experience: 8,
    rating: 4.8,
    reviewCount: 156,
    completedJobs: 187,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    coverImage:
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description:
        "Plombier professionnel avec plus de 8 ans d'expérience dans l'installation et la réparation de systèmes de plomberie résidentiels et commerciaux. Spécialisé dans les rénovations de salles de bain, les installations de chauffe-eau et la résolution de problèmes complexes de plomberie.",
    languages: ["Arabe", "Français", "Anglais"],
    availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
    },
    socialMedia: {
        facebook: "ahmed.mansouri.plombier",
        instagram: "mansouri_plomberie",
        linkedin: "ahmed-mansouri-123456",
    },
}

// Services proposés par l'artisan
const services: Service[] = [
    {
        id: 1,
        title: "Réparation de fuites d'eau",
        description: "Détection et réparation rapide de fuites d'eau dans les tuyaux, robinets et systèmes de plomberie.",
        price: 250,
        category: "plumbing",
        image:
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        rating: 4.9,
        reviewCount: 42,
    },
    {
        id: 2,
        title: "Installation de chauffe-eau",
        description: "Installation professionnelle de chauffe-eau électriques, à gaz ou solaires pour votre domicile.",
        price: 800,
        category: "plumbing",
        image:
            "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        rating: 4.7,
        reviewCount: 28,
    },
    {
        id: 3,
        title: "Rénovation de salle de bain",
        description:
            "Service complet de rénovation de salle de bain, incluant plomberie, carrelage et installation d'équipements sanitaires.",
        price: 5000,
        category: "plumbing",
        image:
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        rating: 4.8,
        reviewCount: 35,
    },
    {
        id: 4,
        title: "Débouchage de canalisations",
        description: "Débouchage rapide et efficace de canalisations obstruées avec équipement professionnel.",
        price: 350,
        category: "plumbing",
        image:
            "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        rating: 4.9,
        reviewCount: 51,
    },
]

// Avis des clients
const reviews: Review[] = [
    {
        id: 1,
        author: "Mohammed Alami",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        rating: 5,
        comment:
            "Ahmed a réparé une fuite d'eau complexe dans notre cuisine en un temps record. Très professionnel et efficace, je recommande vivement ses services !",
        date: "2023-05-20",
        serviceId: 1,
    },
    {
        id: 2,
        author: "Fatima Benani",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 4,
        comment:
            "Très satisfaite de l'installation de notre nouveau chauffe-eau. Ahmed a été ponctuel et a fait un travail propre. Seul petit bémol, quelques débris laissés après l'installation.",
        date: "2023-04-15",
        serviceId: 2,
    },
    {
        id: 3,
        author: "Karim Tazi",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        rating: 5,
        comment:
            "La rénovation de notre salle de bain a été réalisée à la perfection. Ahmed a respecté les délais et le budget. Le résultat est magnifique !",
        date: "2023-03-10",
        serviceId: 3,
    },
    {
        id: 4,
        author: "Nadia Lahlou",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 5,
        comment:
            "Service rapide et efficace pour déboucher notre canalisation. Ahmed est arrivé en moins d'une heure après notre appel et a résolu le problème rapidement.",
        date: "2023-02-28",
        serviceId: 4,
    },
]

// Certifications
const certifications: Certification[] = [
    {
        id: 1,
        title: "Certification en Plomberie Résidentielle",
        issuer: "Institut National des Métiers",
        year: 2015,
        icon: "🏆",
    },
    {
        id: 2,
        title: "Spécialiste en Systèmes de Chauffage",
        issuer: "Centre de Formation Professionnelle",
        year: 2017,
        icon: "🔥",
    },
    {
        id: 3,
        title: "Expert en Économie d'Eau",
        issuer: "Association Marocaine de Plomberie",
        year: 2019,
        icon: "💧",
    },
]

// Statistiques
const statistics: Statistic[] = [
    {
        label: "experience",
        value: 8,
        icon: "📅",
    },
    {
        label: "completedJobs",
        value: 187,
        icon: "✅",
    },
    {
        label: "rating",
        value: 4.8,
        icon: "⭐",
    },
    {
        label: "responseTime",
        value: "2h",
        icon: "⏱️",
    },
]

const ArtisanProfile: React.FC = () => {
    const { t, language } = useLanguage()
    const [isRTL, setIsRTL] = useState(false)
    const [activeTab, setActiveTab] = useState("services")
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    const [showContactModal, setShowContactModal] = useState(false)
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    })

    // Vérifier si l'interface est en mode RTL (arabe)
    useEffect(() => {
        const lang = localStorage.getItem("language")
        setIsRTL(lang === "ar")
    }, [language])

    // Gérer les changements dans le formulaire de contact
    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setContactForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Soumettre le formulaire de contact
    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Contact form submitted:", contactForm)
        // Simuler l'envoi du formulaire
        setTimeout(() => {
            setShowContactModal(false)
            setContactForm({
                name: "",
                email: "",
                phone: "",
                message: "",
            })
            alert(t("profile.contactSuccess"))
        }, 1000)
    }

    // Ouvrir le modal de service
    const openServiceModal = (service: Service) => {
        setSelectedService(service)
        document.body.style.overflow = "hidden" // Empêcher le défilement du body
    }

    // Fermer le modal de service
    const closeServiceModal = () => {
        setSelectedService(null)
        document.body.style.overflow = "auto" // Réactiver le défilement du body
    }

    // Ouvrir le modal de contact
    const openContactModal = () => {
        setShowContactModal(true)
        document.body.style.overflow = "hidden" // Empêcher le défilement du body
    }

    // Fermer le modal de contact
    const closeContactModal = () => {
        setShowContactModal(false)
        document.body.style.overflow = "auto" // Réactiver le défilement du body
    }

    // Obtenir les avis pour un service spécifique
    const getServiceReviews = (serviceId: number) => {
        return reviews.filter((review) => review.serviceId === serviceId)
    }

    // Animations pour les éléments
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    // Obtenir le jour de la semaine traduit
    const getDayTranslation = (day: string) => {
        const dayTranslations: Record<string, string> = {
            monday: t("days.monday"),
            tuesday: t("days.tuesday"),
            wednesday: t("days.wednesday"),
            thursday: t("days.thursday"),
            friday: t("days.friday"),
            saturday: t("days.saturday"),
            sunday: t("days.sunday"),
        }
        return dayTranslations[day] || day
    }

    // Obtenir la traduction pour une statistique
    const getStatTranslation = (stat: string) => {
        const statTranslations: Record<string, string> = {
            experience: t("profile.stats.experience"),
            completedJobs: t("profile.stats.completedJobs"),
            rating: t("profile.stats.rating"),
            responseTime: t("profile.stats.responseTime"),
        }
        return statTranslations[stat] || stat
    }

    return (
        <div className={isRTL ? "rtl" : ""}>
            <Navbar />
            <main className="pt-16 bg-light min-h-screen">
                {/* Bannière de couverture */}
                <div
                    className="h-48 md:h-64 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${artisanData.coverImage || "/placeholder.svg"})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4">
                    {/* En-tête du profil */}
                    <div className="relative -mt-16 mb-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative"
                                >
                                    <img
                                        src={artisanData.image || "/placeholder.svg"}
                                        alt={artisanData.name}
                                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {artisanData.rating} ★
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="flex-1 text-center md:text-left"
                                >
                                    <h1 className="text-3xl font-bold text-gray-800 mb-1">{artisanData.name}</h1>
                                    <h2 className="text-xl text-primary mb-2">{artisanData.title}</h2>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                    <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm">
                      {t(`category.${artisanData.specialty}`)}
                    </span>
                                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                      <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                                            {artisanData.location}
                    </span>
                                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                      <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        ></path>
                      </svg>
                                            {artisanData.reviewCount} {t("profile.reviews")}
                    </span>
                                    </div>

                                    <p className="text-gray-600 mb-4">{artisanData.description}</p>

                                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                        <motion.button
                                            onClick={openContactModal}
                                            className="bg-primary text-white px-4 py-2 rounded-md flex items-center"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <svg
                                                className="w-5 h-5 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                ></path>
                                            </svg>
                                            {t("profile.contact")}
                                        </motion.button>
                                        <Link to={`/artisan-portfolio/${artisanData.id}`}>
                                            <motion.button
                                                className="bg-secondary text-white px-4 py-2 rounded-md flex items-center"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <svg
                                                    className="w-5 h-5 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    ></path>
                                                </svg>
                                                {t("profile.viewPortfolio")}
                                            </motion.button>
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Statistiques */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                    >
                        {statistics.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="bg-white rounded-lg shadow-sm p-4 text-center"
                                whileHover={{ y: -5 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="text-2xl mb-2">{stat.icon}</div>
                                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                                <div className="text-sm text-gray-600">{getStatTranslation(stat.label)}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Onglets */}
                    <div className="mb-8">
                        <div className="flex overflow-x-auto space-x-4 bg-white rounded-lg shadow-sm p-2">
                            <motion.button
                                onClick={() => setActiveTab("services")}
                                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                                    activeTab === "services" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t("profile.tabs.services")}
                            </motion.button>
                            <motion.button
                                onClick={() => setActiveTab("reviews")}
                                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                                    activeTab === "reviews" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t("profile.tabs.reviews")}
                            </motion.button>
                            <motion.button
                                onClick={() => setActiveTab("certifications")}
                                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                                    activeTab === "certifications" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t("profile.tabs.certifications")}
                            </motion.button>
                            <motion.button
                                onClick={() => setActiveTab("info")}
                                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                                    activeTab === "info" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t("profile.tabs.info")}
                            </motion.button>
                        </div>
                    </div>

                    {/* Contenu des onglets */}
                    <AnimatePresence mode="wait">
                        {/* Services */}
                        {activeTab === "services" && (
                            <motion.div
                                key="services"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1,
                                        },
                                    },
                                }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                            >
                                {services.map((service) => (
                                    <motion.div
                                        key={service.id}
                                        variants={fadeInUp}
                                        whileHover={{ y: -5 }}
                                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
                                        onClick={() => openServiceModal(service)}
                                    >
                                        <div className="relative">
                                            <img
                                                src={service.image || "/placeholder.svg"}
                                                alt={service.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                                                {service.price} DH
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg mb-2 text-gray-800">{service.title}</h3>
                                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{service.description}</p>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <span className="text-accent mr-1">★</span>
                                                    <span className="text-sm text-gray-700">{service.rating}</span>
                                                    <span className="mx-1 text-gray-400">•</span>
                                                    <span className="text-sm text-gray-700">
                            {service.reviewCount} {t("profile.reviews")}
                          </span>
                                                </div>
                                                <motion.button
                                                    className="text-primary text-sm font-medium"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        openContactModal()
                                                    }}
                                                >
                                                    {t("profile.requestService")}
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* Avis */}
                        {activeTab === "reviews" && (
                            <motion.div
                                key="reviews"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1,
                                        },
                                    },
                                }}
                                className="mb-8"
                            >
                                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-primary mb-2">{artisanData.rating}</div>
                                            <div className="flex text-accent mb-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span key={star}>{star <= Math.round(artisanData.rating) ? "★" : "☆"}</span>
                                                ))}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {artisanData.reviewCount} {t("profile.reviews")}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="space-y-2">
                                                {[5, 4, 3, 2, 1].map((rating) => {
                                                    const count = reviews.filter((review) => Math.round(review.rating) === rating).length
                                                    const percentage = (count / reviews.length) * 100 || 0
                                                    return (
                                                        <div key={rating} className="flex items-center">
                                                            <div className="w-12 text-sm text-gray-600">{rating} ★</div>
                                                            <div className="flex-1 mx-2">
                                                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                                    <motion.div
                                                                        className="h-full bg-primary"
                                                                        initial={{ width: 0 }}
                                                                        animate={{ width: `${percentage}%` }}
                                                                        transition={{ duration: 0.8, delay: (5 - rating) * 0.1 }}
                                                                    ></motion.div>
                                                                </div>
                                                            </div>
                                                            <div className="w-12 text-right text-sm text-gray-600">{count}</div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <motion.div key={review.id} variants={fadeInUp} className="bg-white rounded-lg shadow-sm p-4">
                                            <div className="flex items-start gap-4">
                                                <img
                                                    src={review.avatar || "/placeholder.svg"}
                                                    alt={review.author}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <h3 className="font-medium text-gray-800">{review.author}</h3>
                                                        <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="flex text-accent text-sm mb-2">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <span key={star}>{star <= review.rating ? "★" : "☆"}</span>
                                                        ))}
                                                    </div>
                                                    <p className="text-gray-600">{review.comment}</p>
                                                    <div className="mt-2 text-sm text-primary">
                                                        {services.find((service) => service.id === review.serviceId)?.title}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Certifications */}
                        {activeTab === "certifications" && (
                            <motion.div
                                key="certifications"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1,
                                        },
                                    },
                                }}
                                className="mb-8"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {certifications.map((cert) => (
                                        <motion.div
                                            key={cert.id}
                                            variants={fadeInUp}
                                            whileHover={{ y: -5 }}
                                            className="bg-white rounded-lg shadow-sm p-6 flex items-start gap-4"
                                        >
                                            <div className="text-3xl">{cert.icon}</div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800 mb-1">{cert.title}</h3>
                                                <p className="text-sm text-gray-600 mb-2">{cert.issuer}</p>
                                                <span className="inline-block bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full text-xs">
                          {cert.year}
                        </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Informations */}
                        {activeTab === "info" && (
                            <motion.div
                                key="info"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1,
                                        },
                                    },
                                }}
                                className="mb-8"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow-sm p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("profile.contactInfo")}</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 text-primary mr-3"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                    ></path>
                                                </svg>
                                                <span className="text-gray-700">{artisanData.phone}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 text-primary mr-3"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    ></path>
                                                </svg>
                                                <span className="text-gray-700">{artisanData.email}</span>
                                            </div>
                                            {artisanData.website && (
                                                <div className="flex items-center">
                                                    <svg
                                                        className="w-5 h-5 text-primary mr-3"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                                        ></path>
                                                    </svg>
                                                    <span className="text-gray-700">{artisanData.website}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 text-primary mr-3"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                    ></path>
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                    ></path>
                                                </svg>
                                                <span className="text-gray-700">{artisanData.location}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <h4 className="font-medium text-gray-800 mb-2">{t("profile.socialMedia")}</h4>
                                            <div className="flex gap-3">
                                                {artisanData.socialMedia.facebook && (
                                                    <a
                                                        href={`https://facebook.com/${artisanData.socialMedia.facebook}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                                                    >
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                                        </svg>
                                                    </a>
                                                )}
                                                {artisanData.socialMedia.instagram && (
                                                    <a
                                                        href={`https://instagram.com/${artisanData.socialMedia.instagram}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors"
                                                    >
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                                                        </svg>
                                                    </a>
                                                )}
                                                {artisanData.socialMedia.linkedin && (
                                                    <a
                                                        href={`https://linkedin.com/in/${artisanData.socialMedia.linkedin}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="bg-blue-800 text-white p-2 rounded-full hover:bg-blue-900 transition-colors"
                                                    >
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow-sm p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("profile.languages")}</h3>
                                        <div className="space-y-2">
                                            {artisanData.languages.map((language, index) => (
                                                <div key={index} className="flex items-center">
                                                    <svg
                                                        className="w-5 h-5 text-primary mr-3"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                                                        ></path>
                                                    </svg>
                                                    <span className="text-gray-700">{language}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">{t("profile.availability")}</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {Object.entries(artisanData.availability).map(([day, isAvailable]) => (
                                                <div
                                                    key={day}
                                                    className={`p-2 rounded-md text-center ${
                                                        isAvailable ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"
                                                    }`}
                                                >
                                                    {getDayTranslation(day)}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Modal de détail du service */}
                <AnimatePresence>
                    {selectedService && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
                            onClick={closeServiceModal}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="relative">
                                    <img
                                        src={selectedService.image || "/placeholder.svg"}
                                        alt={selectedService.title}
                                        className="w-full h-64 object-cover"
                                    />
                                    <button
                                        onClick={closeServiceModal}
                                        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
                                        aria-label="Fermer"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className="text-2xl font-bold text-gray-800">{selectedService.title}</h2>
                                        <div className="bg-primary text-white px-3 py-1 rounded-full text-lg font-semibold">
                                            {selectedService.price} DH
                                        </div>
                                    </div>

                                    <p className="text-gray-700 mb-6">{selectedService.description}</p>

                                    <div className="flex items-center mb-6">
                                        <div className="flex text-accent mr-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span key={star}>{star <= Math.round(selectedService.rating) ? "★" : "☆"}</span>
                                            ))}
                                        </div>
                                        <span className="text-gray-600">
                      {selectedService.rating} ({selectedService.reviewCount} {t("profile.reviews")})
                    </span>
                                    </div>

                                    <div className="border-t border-gray-200 pt-6 mb-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("profile.serviceReviews")}</h3>
                                        <div className="space-y-4">
                                            {getServiceReviews(selectedService.id).length > 0 ? (
                                                getServiceReviews(selectedService.id).map((review) => (
                                                    <div key={review.id} className="border-b border-gray-100 pb-4">
                                                        <div className="flex items-start gap-3">
                                                            <img
                                                                src={review.avatar || "/placeholder.svg"}
                                                                alt={review.author}
                                                                className="w-10 h-10 rounded-full object-cover"
                                                            />
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-medium text-gray-800">{review.author}</span>
                                                                    <span className="text-xs text-gray-500">
                                    {new Date(review.date).toLocaleDateString()}
                                  </span>
                                                                </div>
                                                                <div className="flex text-accent text-sm my-1">
                                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                                        <span key={star}>{star <= review.rating ? "★" : "☆"}</span>
                                                                    ))}
                                                                </div>
                                                                <p className="text-gray-600 text-sm">{review.comment}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-500 text-center py-4">{t("profile.noReviews")}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <motion.button
                                            onClick={closeServiceModal}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {t("profile.close")}
                                        </motion.button>
                                        <motion.button
                                            onClick={() => {
                                                closeServiceModal()
                                                openContactModal()
                                            }}
                                            className="px-4 py-2 bg-primary text-white rounded-md"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {t("profile.requestService")}
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Modal de contact */}
                <AnimatePresence>
                    {showContactModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
                            onClick={closeContactModal}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-lg max-w-lg w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("profile.contactArtisan")}</h2>
                                    <p className="text-gray-600 mb-6">{t("profile.contactDescription")}</p>

                                    <form onSubmit={handleContactSubmit}>
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                                {t("profile.form.name")}
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={contactForm.name}
                                                onChange={handleContactChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                                {t("profile.form.email")}
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={contactForm.email}
                                                onChange={handleContactChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                                                {t("profile.form.phone")}
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={contactForm.phone}
                                                onChange={handleContactChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                                required
                                            />
                                        </div>

                                        <div className="mb-6">
                                            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                                                {t("profile.form.message")}
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={contactForm.message}
                                                onChange={handleContactChange}
                                                rows={4}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                                required
                                            ></textarea>
                                        </div>

                                        <div className="flex justify-end gap-3">
                                            <motion.button
                                                type="button"
                                                onClick={closeContactModal}
                                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {t("profile.cancel")}
                                            </motion.button>
                                            <motion.button
                                                type="submit"
                                                className="px-4 py-2 bg-primary text-white rounded-md"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {t("profile.send")}
                                            </motion.button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    )
}

export default ArtisanProfile
