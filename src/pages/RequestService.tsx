"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useLanguage } from "../context/LanguageContext"

// Types pour le formulaire
interface ServiceRequestData {
    title: string
    description: string
    category: string
    budget: {
        min: number
        max: number
    }
    urgency: "low" | "medium" | "high"
    location: string
    preferredDate: string
    contactMethod: "phone" | "email" | "both"
    attachments: File[]
}

// Catégories disponibles
const categories = [
    { id: "plumbing", nameKey: "category.plumbing" },
    { id: "electrical", nameKey: "category.electrical" },
    { id: "painting", nameKey: "category.painting" },
    { id: "carpentry", nameKey: "category.carpentry" },
    { id: "cleaning", nameKey: "category.cleaning" },
    { id: "gardening", nameKey: "category.gardening" },
    { id: "decoration", nameKey: "category.decoration" },
    { id: "masonry", nameKey: "category.masonry" },
]

// Villes marocaines
const moroccanCities = [
    "Casablanca",
    "Rabat",
    "Marrakech",
    "Fès",
    "Tanger",
    "Agadir",
    "Meknès",
    "Oujda",
    "Tétouan",
    "Safi",
]

const RequestService: React.FC = () => {
    const { t, language } = useLanguage()
    const [isRTL, setIsRTL] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const [previewAttachments, setPreviewAttachments] = useState<string[]>([])
    const [formData, setFormData] = useState<ServiceRequestData>({
        title: "",
        description: "",
        category: "",
        budget: {
            min: 0,
            max: 0,
        },
        urgency: "medium",
        location: "",
        preferredDate: "",
        contactMethod: "both",
        attachments: [],
    })
    const [errors, setErrors] = useState<Partial<Record<keyof ServiceRequestData, string>>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [matchingArtisans, setMatchingArtisans] = useState<any[]>([])

    // Vérifier si l'interface est en mode RTL (arabe)
    useEffect(() => {
        const lang = localStorage.getItem("language")
        setIsRTL(lang === "ar")
    }, [language])

    // Gérer les changements dans le formulaire
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        if (name === "min" || name === "max") {
            setFormData((prev) => ({
                ...prev,
                budget: {
                    ...prev.budget,
                    [name]: Number.parseFloat(value) || 0,
                },
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    // Gérer l'upload de pièces jointes
    const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files)

            // Limiter à 3 pièces jointes
            if (formData.attachments.length + filesArray.length > 3) {
                alert(t("requestService.maxAttachmentsError"))
                return
            }

            setFormData((prev) => ({
                ...prev,
                attachments: [...prev.attachments, ...filesArray],
            }))

            // Créer des URLs pour la prévisualisation
            const newPreviewAttachments = filesArray.map((file) => {
                if (file.type.startsWith("image/")) {
                    return URL.createObjectURL(file)
                }
                return file.type.includes("pdf") ? "/pdf-icon.png" : "/file-icon.png"
            })

            setPreviewAttachments((prev) => [...prev, ...newPreviewAttachments])
        }
    }

    // Supprimer une pièce jointe
    const removeAttachment = (index: number) => {
        setFormData((prev) => {
            const newAttachments = [...prev.attachments]
            newAttachments.splice(index, 1)
            return { ...prev, attachments: newAttachments }
        })

        // Révoquer l'URL de prévisualisation pour éviter les fuites de mémoire
        if (previewAttachments[index].startsWith("blob:")) {
            URL.revokeObjectURL(previewAttachments[index])
        }

        setPreviewAttachments((prev) => {
            const newPreviews = [...prev]
            newPreviews.splice(index, 1)
            return newPreviews
        })
    }

    // Valider le formulaire
    const validateForm = () => {
        const newErrors: Partial<Record<keyof ServiceRequestData, string>> = {}

        if (!formData.title.trim()) {
            newErrors.title = t("requestService.errors.titleRequired")
        }

        if (!formData.description.trim()) {
            newErrors.description = t("requestService.errors.descriptionRequired")
        } else if (formData.description.length < 30) {
            newErrors.description = t("requestService.errors.descriptionLength")
        }

        if (!formData.category) {
            newErrors.category = t("requestService.errors.categoryRequired")
        }

        if (formData.budget.min <= 0 || formData.budget.max <= 0) {
            newErrors.budget = t("requestService.errors.budgetRequired")
        } else if (formData.budget.min > formData.budget.max) {
            newErrors.budget = t("requestService.errors.budgetInvalid")
        }

        if (!formData.location) {
            newErrors.location = t("requestService.errors.locationRequired")
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Simuler la recherche d'artisans correspondants
    const findMatchingArtisans = () => {
        // Données fictives d'artisans
        const mockArtisans = [
            {
                id: 101,
                name: "Ahmed Mansouri",
                specialty: "plumbing",
                location: "Casablanca",
                rating: 4.8,
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                completedJobs: 156,
            },
            {
                id: 102,
                name: "Karim Benali",
                specialty: "electrical",
                location: "Rabat",
                rating: 4.7,
                image: "https://randomuser.me/api/portraits/men/45.jpg",
                completedJobs: 203,
            },
            {
                id: 103,
                name: "Yasmine Lahlou",
                specialty: "painting",
                location: "Marrakech",
                rating: 4.9,
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                completedJobs: 89,
            },
            {
                id: 104,
                name: "Omar Haddad",
                specialty: "carpentry",
                location: "Fès",
                rating: 4.6,
                image: "https://randomuser.me/api/portraits/men/22.jpg",
                completedJobs: 178,
            },
        ]

        // Filtrer les artisans par catégorie et emplacement
        return mockArtisans.filter(
            (artisan) =>
                (formData.category === artisan.specialty || formData.category === "") &&
                (formData.location === artisan.location || formData.location === ""),
        )
    }

    // Soumettre le formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            setIsSubmitting(true)

            try {
                // Simuler un appel API
                await new Promise((resolve) => setTimeout(resolve, 1500))
                console.log("Demande de service créée:", formData)
                setIsSuccess(true)

                // Réinitialiser le formulaire après 3 secondes
                setTimeout(() => {
                    setFormData({
                        title: "",
                        description: "",
                        category: "",
                        budget: {
                            min: 0,
                            max: 0,
                        },
                        urgency: "medium",
                        location: "",
                        preferredDate: "",
                        contactMethod: "both",
                        attachments: [],
                    })
                    setPreviewAttachments([])
                    setIsSuccess(false)
                    setCurrentStep(1)
                    setMatchingArtisans([])
                }, 3000)
            } catch (error) {
                console.error("Erreur lors de la création de la demande:", error)
            } finally {
                setIsSubmitting(false)
            }
        }
    }

    // Passer à l'étape suivante
    const goToNextStep = () => {
        if (currentStep === 1) {
            if (formData.title && formData.description && formData.category) {
                setCurrentStep(2)
            } else {
                validateForm()
            }
        } else if (currentStep === 2) {
            // Trouver des artisans correspondants
            const matches = findMatchingArtisans()
            setMatchingArtisans(matches)
            setCurrentStep(3)
        }
    }

    // Revenir à l'étape précédente
    const goToPreviousStep = () => {
        setCurrentStep(currentStep - 1)
    }

    // Animations pour les transitions entre étapes
    const pageVariants = {
        initial: {
            opacity: 0,
            x: isRTL ? -20 : 20,
        },
        in: {
            opacity: 1,
            x: 0,
        },
        out: {
            opacity: 0,
            x: isRTL ? 20 : -20,
        },
    }

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5,
    }

    // Obtenir la traduction pour l'urgence
    const getUrgencyTranslation = (urgency: string) => {
        const urgencyTranslations: Record<string, string> = {
            low: t("requestService.urgency.low"),
            medium: t("requestService.urgency.medium"),
            high: t("requestService.urgency.high"),
        }
        return urgencyTranslations[urgency] || urgency
    }

    // Obtenir la couleur pour l'urgence
    const getUrgencyColor = (urgency: string) => {
        const urgencyColors: Record<string, string> = {
            low: "bg-green-100 text-green-800",
            medium: "bg-yellow-100 text-yellow-800",
            high: "bg-red-100 text-red-800",
        }
        return urgencyColors[urgency] || ""
    }

    return (
        <div className={isRTL ? "rtl" : ""}>
            <Navbar />
            <main className="pt-24 pb-16 bg-light min-h-screen">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-3xl font-bold text-primary mb-2">{t("requestService.title")}</h1>
                        <p className="text-gray-600">{t("requestService.subtitle")}</p>
                    </motion.div>

                    {/* Indicateur de progression */}
                    <div className="max-w-3xl mx-auto mb-8">
                        <div className="flex items-center justify-between">
                            {[1, 2, 3].map((step) => (
                                <div key={step} className="flex flex-col items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            step === currentStep
                                                ? "bg-primary text-white"
                                                : step < currentStep
                                                    ? "bg-secondary text-white"
                                                    : "bg-gray-200 text-gray-500"
                                        }`}
                                    >
                                        {step}
                                    </div>
                                    <span
                                        className={`mt-2 text-sm ${step === currentStep ? "text-primary font-medium" : "text-gray-500"}`}
                                    >
                    {step === 1
                        ? t("requestService.steps.details")
                        : step === 2
                            ? t("requestService.steps.preferences")
                            : t("requestService.steps.review")}
                  </span>
                                </div>
                            ))}
                        </div>
                        <div className="relative h-1 bg-gray-200 mt-4">
                            <div
                                className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
                                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Formulaire */}
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                        <form onSubmit={handleSubmit}>
                            {/* Étape 1: Détails de la demande */}
                            {currentStep === 1 && (
                                <motion.div
                                    className="p-6"
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageVariants}
                                    transition={pageTransition}
                                >
                                    <h2 className="text-xl font-semibold mb-6 text-primary">{t("requestService.steps.details")}</h2>

                                    <div className="mb-4">
                                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                                            {t("requestService.form.title")} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                                errors.title ? "border-red-500" : "border-gray-300"
                                            }`}
                                            placeholder={t("requestService.form.titlePlaceholder")}
                                        />
                                        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                                            {t("requestService.form.description")} <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={4}
                                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                                errors.description ? "border-red-500" : "border-gray-300"
                                            }`}
                                            placeholder={t("requestService.form.descriptionPlaceholder")}
                                        ></textarea>
                                        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                                            {t("requestService.form.category")} <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                                errors.category ? "border-red-500" : "border-gray-300"
                                            }`}
                                        >
                                            <option value="">{t("requestService.form.selectCategory")}</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {t(category.nameKey)}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                                            {t("requestService.form.location")} <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                                errors.location ? "border-red-500" : "border-gray-300"
                                            }`}
                                        >
                                            <option value="">{t("requestService.form.selectLocation")}</option>
                                            {moroccanCities.map((city) => (
                                                <option key={city} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                                    </div>

                                    <div className="flex justify-end mt-6">
                                        <motion.button
                                            type="button"
                                            onClick={goToNextStep}
                                            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-all"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {t("requestService.nextStep")}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Étape 2: Préférences */}
                            {currentStep === 2 && (
                                <motion.div
                                    className="p-6"
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageVariants}
                                    transition={pageTransition}
                                >
                                    <h2 className="text-xl font-semibold mb-6 text-primary">{t("requestService.steps.preferences")}</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">
                                                {t("requestService.form.budget")} <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    name="min"
                                                    value={formData.budget.min || ""}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                                        errors.budget ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                    placeholder={t("requestService.form.minBudget")}
                                                    min="0"
                                                />
                                                <span>-</span>
                                                <input
                                                    type="number"
                                                    name="max"
                                                    value={formData.budget.max || ""}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                                        errors.budget ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                    placeholder={t("requestService.form.maxBudget")}
                                                    min="0"
                                                />
                                                <span className="text-gray-500">DH</span>
                                            </div>
                                            {errors.budget && <p className="mt-1 text-sm text-red-500">{errors.budget}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="preferredDate" className="block text-gray-700 font-medium mb-2">
                                                {t("requestService.form.preferredDate")}
                                            </label>
                                            <input
                                                type="date"
                                                id="preferredDate"
                                                name="preferredDate"
                                                value={formData.preferredDate}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                                min={new Date().toISOString().split("T")[0]}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-2">{t("requestService.form.urgency")}</label>
                                        <div className="flex flex-wrap gap-3">
                                            {["low", "medium", "high"].map((urgency) => (
                                                <motion.button
                                                    key={urgency}
                                                    type="button"
                                                    onClick={() => setFormData((prev) => ({ ...prev, urgency: urgency as never }))}
                                                    className={`px-4 py-2 rounded-md text-sm ${
                                                        formData.urgency === urgency
                                                            ? `${getUrgencyColor(urgency)} border-2 border-gray-400`
                                                            : "bg-gray-100 text-gray-700"
                                                    }`}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    {getUrgencyTranslation(urgency)}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            {t("requestService.form.contactMethod")}
                                        </label>
                                        <div className="flex flex-wrap gap-3">
                                            {["phone", "email", "both"].map((method) => (
                                                <motion.button
                                                    key={method}
                                                    type="button"
                                                    onClick={() => setFormData((prev) => ({ ...prev, contactMethod: method as never }))}
                                                    className={`px-4 py-2 rounded-md text-sm ${
                                                        formData.contactMethod === method ? "bg-primary text-white" : "bg-gray-100 text-gray-700"
                                                    }`}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    {t(`requestService.contactMethod.${method}`)}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            {t("requestService.form.attachments")}
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                                            <input
                                                type="file"
                                                id="attachments"
                                                name="attachments"
                                                accept="image/*,application/pdf"
                                                multiple
                                                onChange={handleAttachmentUpload}
                                                className="hidden"
                                            />
                                            <label htmlFor="attachments" className="cursor-pointer flex flex-col items-center justify-center">
                                                <svg
                                                    className="w-12 h-12 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                    ></path>
                                                </svg>
                                                <span className="mt-2 text-gray-600">{t("requestService.form.uploadAttachments")}</span>
                                                <span className="text-xs text-gray-500 mt-1">{t("requestService.form.maxAttachments")}</span>
                                            </label>
                                        </div>

                                        {/* Prévisualisation des pièces jointes */}
                                        {previewAttachments.length > 0 && (
                                            <div className="mt-4 grid grid-cols-3 gap-3">
                                                {previewAttachments.map((src, index) => (
                                                    <div key={index} className="relative">
                                                        {src.startsWith("blob:") ? (
                                                            <img
                                                                src={src || "/placeholder.svg"}
                                                                alt={`Attachment ${index + 1}`}
                                                                className="w-full h-24 object-cover rounded-md"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-24 bg-gray-100 rounded-md flex items-center justify-center">
                                                                <span className="text-gray-500 text-xs">{formData.attachments[index].name}</span>
                                                            </div>
                                                        )}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeAttachment(index)}
                                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-between mt-6">
                                        <motion.button
                                            type="button"
                                            onClick={goToPreviousStep}
                                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-all"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {t("requestService.previousStep")}
                                        </motion.button>
                                        <motion.button
                                            type="button"
                                            onClick={goToNextStep}
                                            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-all"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {t("requestService.nextStep")}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Étape 3: Révision et soumission */}
                            {currentStep === 3 && (
                                <motion.div
                                    className="p-6"
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageVariants}
                                    transition={pageTransition}
                                >
                                    <h2 className="text-xl font-semibold mb-6 text-primary">{t("requestService.steps.review")}</h2>

                                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                                        <h3 className="font-semibold text-lg mb-2">{formData.title}</h3>
                                        <p className="text-gray-600 mb-4">{formData.description}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <span className="text-gray-500">{t("requestService.form.category")}:</span>
                                                <span className="ml-2 font-medium">
                          {t(categories.find((c) => c.id === formData.category)?.nameKey || "category.unknown")}
                        </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">{t("requestService.form.location")}:</span>
                                                <span className="ml-2 font-medium">{formData.location}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">{t("requestService.form.budget")}:</span>
                                                <span className="ml-2 font-medium">
                          {formData.budget.min} - {formData.budget.max} DH
                        </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">{t("requestService.form.urgency")}:</span>
                                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getUrgencyColor(formData.urgency)}`}>
                          {getUrgencyTranslation(formData.urgency)}
                        </span>
                                            </div>
                                            {formData.preferredDate && (
                                                <div>
                                                    <span className="text-gray-500">{t("requestService.form.preferredDate")}:</span>
                                                    <span className="ml-2 font-medium">{formData.preferredDate}</span>
                                                </div>
                                            )}
                                            <div>
                                                <span className="text-gray-500">{t("requestService.form.contactMethod")}:</span>
                                                <span className="ml-2 font-medium">
                          {t(`requestService.contactMethod.${formData.contactMethod}`)}
                        </span>
                                            </div>
                                        </div>

                                        {previewAttachments.length > 0 && (
                                            <div>
                                                <span className="text-gray-500">{t("requestService.form.attachments")}:</span>
                                                <div className="grid grid-cols-3 gap-2 mt-1">
                                                    {previewAttachments.map((src, index) => (
                                                        <div key={index} className="relative">
                                                            {src.startsWith("blob:") ? (
                                                                <img
                                                                    src={src || "/placeholder.svg"}
                                                                    alt={`Attachment ${index + 1}`}
                                                                    className="w-full h-16 object-cover rounded-md"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-16 bg-gray-100 rounded-md flex items-center justify-center">
                                                                    <span className="text-gray-500 text-xs">{formData.attachments[index].name}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Artisans correspondants */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-lg mb-3 text-primary">{t("requestService.matchingArtisans")}</h3>

                                        {matchingArtisans.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {matchingArtisans.map((artisan) => (
                                                    <motion.div
                                                        key={artisan.id}
                                                        className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-3"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        whileHover={{ scale: 1.02, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                                                    >
                                                        <img
                                                            src={artisan.image || "/placeholder.svg"}
                                                            alt={artisan.name}
                                                            className="w-12 h-12 rounded-full object-cover"
                                                        />
                                                        <div className="flex-1">
                                                            <h4 className="font-medium">{artisan.name}</h4>
                                                            <div className="flex items-center text-sm">
                                                                <span className="text-accent mr-1">★</span>
                                                                <span>{artisan.rating}</span>
                                                                <span className="mx-1">•</span>
                                                                <span>{t(categories.find((c) => c.id === artisan.specialty)?.nameKey || "")}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end">
                              <span className="text-xs text-gray-500">
                                {artisan.completedJobs} {t("artisans.completed")}
                              </span>
                                                            <input
                                                                type="checkbox"
                                                                id={`select-artisan-${artisan.id}`}
                                                                className="mt-1 w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                                                            />
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-3 rounded-md">
                                                {t("requestService.noMatchingArtisans")}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-between mt-6">
                                        <motion.button
                                            type="button"
                                            onClick={goToPreviousStep}
                                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-all"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {t("requestService.previousStep")}
                                        </motion.button>
                                        <motion.button
                                            type="submit"
                                            className={`bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-all ${
                                                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                            }`}
                                            whileHover={isSubmitting ? {} : { scale: 1.03 }}
                                            whileTap={isSubmitting ? {} : { scale: 0.98 }}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center">
                          <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                          >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                                                    {t("requestService.submitting")}
                        </span>
                                            ) : (
                                                t("requestService.submit")
                                            )}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </form>
                    </div>

                    {/* Message de succès */}
                    {isSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-3xl mx-auto mt-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-md flex items-center"
                        >
                            <svg
                                className="w-5 h-5 mr-2 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>{t("requestService.successMessage")}</span>
                        </motion.div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default RequestService
