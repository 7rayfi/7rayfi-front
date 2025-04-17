"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useLanguage } from "../context/LanguageContext"

// Types pour les projets du portfolio
interface PortfolioProject {
    id: number
    title: string
    category: string
    description: string
    images: string[]
    date: string
    location: string
    client?: string
    featured: boolean
}

// Types pour les catégories
interface Category {
    id: string
    nameKey: string
}

// Données fictives pour le portfolio
const portfolioProjects: PortfolioProject[] = [
    {
        id: 1,
        title: "Rénovation salle de bain moderne",
        category: "plumbing",
        description:
            "Rénovation complète d'une salle de bain avec installation de nouveaux équipements sanitaires, carrelage et plomberie.",
        images: [
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
        ],
        date: "2023-05-15",
        location: "Casablanca",
        client: "Famille Benani",
        featured: true,
    },
    {
        id: 2,
        title: "Installation électrique résidentielle",
        category: "electrical",
        description:
            "Installation complète du système électrique pour une nouvelle construction résidentielle, incluant le câblage, les prises et l'éclairage.",
        images: [
            "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
            "https://images.unsplash.com/photo-1558402529-d2638a7023e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        ],
        date: "2023-03-22",
        location: "Rabat",
        featured: false,
    },
    {
        id: 3,
        title: "Peinture intérieure villa",
        category: "painting",
        description:
            "Travaux de peinture intérieure pour une villa de 4 chambres, avec préparation des surfaces et finition de qualité.",
        images: [
            "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        ],
        date: "2023-02-10",
        location: "Marrakech",
        client: "M. Alaoui",
        featured: true,
    },
    {
        id: 4,
        title: "Fabrication de mobilier sur mesure",
        category: "carpentry",
        description:
            "Conception et fabrication d'un ensemble de meubles sur mesure pour un salon, incluant bibliothèque, table basse et meuble TV.",
        images: [
            "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
        ],
        date: "2023-01-05",
        location: "Fès",
        client: "Famille Tazi",
        featured: true,
    },
    {
        id: 5,
        title: "Nettoyage professionnel après construction",
        category: "cleaning",
        description:
            "Service de nettoyage complet après travaux de construction, incluant le nettoyage des vitres, sols et surfaces.",
        images: [
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        ],
        date: "2022-12-18",
        location: "Tanger",
        featured: false,
    },
    {
        id: 6,
        title: "Aménagement jardin méditerranéen",
        category: "gardening",
        description:
            "Création d'un jardin méditerranéen avec plantation d'oliviers, agrumes et plantes aromatiques, installation d'un système d'irrigation.",
        images: [
            "https://images.unsplash.com/photo-1558293842-c0fd3db86157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
            "https://images.unsplash.com/photo-1598512199776-e0e136836d51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        ],
        date: "2022-11-05",
        location: "Agadir",
        client: "Riad Al Andalous",
        featured: true,
    },
]

// Catégories disponibles
const categories: Category[] = [
    { id: "all", nameKey: "portfolio.categories.all" },
    { id: "plumbing", nameKey: "category.plumbing" },
    { id: "electrical", nameKey: "category.electrical" },
    { id: "painting", nameKey: "category.painting" },
    { id: "carpentry", nameKey: "category.carpentry" },
    { id: "cleaning", nameKey: "category.cleaning" },
    { id: "gardening", nameKey: "category.gardening" },
    { id: "decoration", nameKey: "category.decoration" },
    { id: "masonry", nameKey: "category.masonry" },
]

// Données de l'artisan
const artisanData = {
    id: 101,
    name: "Ahmed Mansouri",
    specialty: "plumbing",
    experience: 8,
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    completedJobs: 156,
    description:
        "Plombier professionnel avec plus de 8 ans d'expérience dans l'installation et la réparation de systèmes de plomberie résidentiels et commerciaux.",
}

const ArtisanPortfolio: React.FC = () => {
    const { t, language } = useLanguage()
    const [isRTL, setIsRTL] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [filteredProjects, setFilteredProjects] = useState<PortfolioProject[]>(portfolioProjects)
    const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Vérifier si l'interface est en mode RTL (arabe)
    useEffect(() => {
        const lang = localStorage.getItem("language")
        setIsRTL(lang === "ar")
    }, [language])

    // Filtrer les projets par catégorie
    useEffect(() => {
        if (selectedCategory === "all") {
            setFilteredProjects(portfolioProjects)
        } else {
            setFilteredProjects(portfolioProjects.filter((project) => project.category === selectedCategory))
        }
    }, [selectedCategory])

    // Ouvrir le modal de détail du projet
    const openProjectModal = (project: PortfolioProject) => {
        setSelectedProject(project)
        setCurrentImageIndex(0)
        document.body.style.overflow = "hidden" // Empêcher le défilement du body
    }

    // Fermer le modal de détail du projet
    const closeProjectModal = () => {
        setSelectedProject(null)
        document.body.style.overflow = "auto" // Réactiver le défilement du body
    }

    // Navigation entre les images du projet
    const nextImage = () => {
        if (selectedProject) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProject.images.length)
        }
    }

    const prevImage = () => {
        if (selectedProject) {
            setCurrentImageIndex(
                (prevIndex) => (prevIndex - 1 + selectedProject.images.length) % selectedProject.images.length,
            )
        }
    }

    // Animations pour les projets
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const projectVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <div className={isRTL ? "rtl" : ""}>
            <Navbar />
            <main className="pt-24 pb-16 bg-light min-h-screen">
                <div className="container mx-auto px-4">
                    {/* En-tête du portfolio */}
                    <div className="mb-8">
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
                                <h1 className="text-3xl font-bold text-primary mb-2">{t("portfolio.title")}</h1>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{artisanData.name}</h2>
                                <p className="text-lg text-secondary mb-2">
                                    {t(categories.find((c) => c.id === artisanData.specialty)?.nameKey || "")}
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
                                    <div className="bg-white rounded-lg shadow-sm px-3 py-2 flex items-center">
                                        <span className="text-primary font-semibold">{artisanData.experience}</span>
                                        <span className="ml-1 text-gray-600">{t("artisans.experience")}</span>
                                    </div>
                                    <div className="bg-white rounded-lg shadow-sm px-3 py-2 flex items-center">
                                        <span className="text-primary font-semibold">{artisanData.completedJobs}</span>
                                        <span className="ml-1 text-gray-600">{t("artisans.completed")}</span>
                                    </div>
                                    <div className="bg-white rounded-lg shadow-sm px-3 py-2 flex items-center">
                                        <span className="text-primary font-semibold">{portfolioProjects.length}</span>
                                        <span className="ml-1 text-gray-600">{t("portfolio.projects")}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-6 bg-white p-4 rounded-lg shadow-sm"
                        >
                            <p className="text-gray-700">{artisanData.description}</p>
                        </motion.div>
                    </div>

                    {/* Filtres de catégories */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mb-8"
                    >
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">{t("portfolio.filterByCategory")}</h3>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <motion.button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-md text-sm transition-all ${
                                        selectedCategory === category.id
                                            ? "bg-primary text-white"
                                            : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {t(category.nameKey)}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Projets du portfolio */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    variants={projectVariants}
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
                                    onClick={() => openProjectModal(project)}
                                >
                                    <div className="relative">
                                        <img
                                            src={project.images[0] || "/placeholder.svg"}
                                            alt={project.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        {project.featured && (
                                            <div className="absolute top-2 right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
                                                {t("portfolio.featured")}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-1 text-gray-800">{project.title}</h3>
                                        <p className="text-primary text-sm mb-2">
                                            {t(categories.find((c) => c.id === project.category)?.nameKey || "")}
                                        </p>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{project.description}</p>
                                        <div className="flex justify-between items-center text-xs text-gray-500">
                                            <span>{project.location}</span>
                                            <span>{new Date(project.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8">
                                <p className="text-gray-500">{t("portfolio.noProjects")}</p>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Modal de détail du projet */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
                            onClick={closeProjectModal}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="relative">
                                    <div className="h-64 sm:h-80 md:h-96 bg-gray-200 relative">
                                        <img
                                            src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                                            alt={selectedProject.title}
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Navigation des images */}
                                        {selectedProject.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
                                                    aria-label="Image précédente"
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
                                                    onClick={nextImage}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
                                                    aria-label="Image suivante"
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
                                            </>
                                        )}

                                        {/* Indicateur de position */}
                                        {selectedProject.images.length > 1 && (
                                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                                {selectedProject.images.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setCurrentImageIndex(index)
                                                        }}
                                                        className={`w-2 h-2 rounded-full ${
                                                            index === currentImageIndex ? "bg-white" : "bg-white bg-opacity-50"
                                                        }`}
                                                        aria-label={`Image ${index + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {/* Bouton de fermeture */}
                                        <button
                                            onClick={closeProjectModal}
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
                                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedProject.title}</h2>
                                        <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm">
                        {t(categories.find((c) => c.id === selectedProject.category)?.nameKey || "")}
                      </span>
                                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {selectedProject.location}
                      </span>
                                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {new Date(selectedProject.date).toLocaleDateString()}
                      </span>
                                        </div>

                                        <p className="text-gray-700 mb-6">{selectedProject.description}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedProject.client && (
                                                <div>
                                                    <span className="text-gray-500">{t("portfolio.client")}:</span>
                                                    <span className="ml-2 font-medium">{selectedProject.client}</span>
                                                </div>
                                            )}
                                            <div>
                                                <span className="text-gray-500">{t("portfolio.date")}:</span>
                                                <span className="ml-2 font-medium">{new Date(selectedProject.date).toLocaleDateString()}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">{t("portfolio.location")}:</span>
                                                <span className="ml-2 font-medium">{selectedProject.location}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">{t("portfolio.category")}:</span>
                                                <span className="ml-2 font-medium">
                          {t(categories.find((c) => c.id === selectedProject.category)?.nameKey || "")}
                        </span>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex justify-end">
                                            <motion.button
                                                onClick={closeProjectModal}
                                                className="bg-primary text-white px-4 py-2 rounded-md"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {t("portfolio.close")}
                                            </motion.button>
                                        </div>
                                    </div>
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

export default ArtisanPortfolio
