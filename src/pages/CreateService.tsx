"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useLanguage } from "../context/LanguageContext"

interface ServiceFormData {
    title: string
    description: string
    category: string
    price: number
    tags: string[]
    images: File[]
    availability: {
        monday: boolean
        tuesday: boolean
        wednesday: boolean
        thursday: boolean
        friday: boolean
        saturday: boolean
        sunday: boolean
    }
    location: string
}

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

// Tags disponibles
const availableTags = [
    { id: "emergency", nameKey: "tag.emergency" },
    { id: "repair", nameKey: "tag.repair" },
    { id: "installation", nameKey: "tag.installation" },
    { id: "commercial", nameKey: "tag.commercial" },
    { id: "residential", nameKey: "tag.residential" },
    { id: "interior", nameKey: "tag.interior" },
    { id: "exterior", nameKey: "tag.exterior" },
    { id: "custom", nameKey: "tag.custom" },
    { id: "maintenance", nameKey: "tag.maintenance" },
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

const CreateService: React.FC = () => {
    const { t, language } = useLanguage()
    const [isRTL, setIsRTL] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const [previewImages, setPreviewImages] = useState<string[]>([])
    const [formData, setFormData] = useState<ServiceFormData>({
        title: "",
        description: "",
        category: "",
        price: 0,
        tags: [],
        images: [],
        availability: {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
            sunday: false,
        },
        location: "",
    })
    const [errors, setErrors] = useState<Partial<Record<keyof ServiceFormData, string>>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    // Vérifier si l'interface est en mode RTL (arabe)
    useEffect(() => {
        const lang = localStorage.getItem("language")
        setIsRTL(lang === "ar")
    }, [language])

    // Gérer les changements dans le formulaire
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? Number.parseFloat(value) || 0 : value,
        }))
    }

    // Gérer les changements de disponibilité
    const handleAvailabilityChange = (day: keyof ServiceFormData["availability"]) => {
        setFormData((prev) => ({
            ...prev,
            availability: {
                ...prev.availability,
                [day]: !prev.availability[day],
            },
        }))
    }

    // Gérer les changements de tags
    const handleTagToggle = (tagId: string) => {
        setFormData((prev) => {
            const newTags = prev.tags.includes(tagId) ? prev.tags.filter((t) => t !== tagId) : [...prev.tags, tagId]
            return { ...prev, tags: newTags }
        })
    }

    // Gérer l'upload d'images
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files)

            // Limiter à 5 images
            if (formData.images.length + filesArray.length > 5) {
                alert(t("createService.maxImagesError"))
                return
            }

            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, ...filesArray],
            }))

            // Créer des URLs pour la prévisualisation
            const newPreviewImages = filesArray.map((file) => URL.createObjectURL(file))
            setPreviewImages((prev) => [...prev, ...newPreviewImages])
        }
    }

    // Supprimer une image
    const removeImage = (index: number) => {
        setFormData((prev) => {
            const newImages = [...prev.images]
            newImages.splice(index, 1)
            return { ...prev, images: newImages }
        })

        // Révoquer l'URL de prévisualisation pour éviter les fuites de mémoire
        URL.revokeObjectURL(previewImages[index])
        setPreviewImages((prev) => {
            const newPreviews = [...prev]
            newPreviews.splice(index, 1)
            return newPreviews
        })
    }

    // Valider le formulaire
    const validateForm = () => {
        const newErrors: Partial<Record<keyof ServiceFormData, string>> = {}

        if (!formData.title.trim()) {
            newErrors.title = t("createService.errors.titleRequired")
        }

        if (!formData.description.trim()) {
            newErrors.description = t("createService.errors.descriptionRequired")
        } else if (formData.description.length < 50) {
            newErrors.description = t("createService.errors.descriptionLength")
        }

        if (!formData.category) {
            newErrors.category = t("createService.errors.categoryRequired")
        }

        if (formData.price <= 0) {
            newErrors.price = t("createService.errors.priceRequired")
        }

        if (formData.tags.length === 0) {
            newErrors.tags = t("createService.errors.tagsRequired")
        }

        if (!formData.location) {
            newErrors.location = t("createService.errors.locationRequired")
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Soumettre le formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            setIsSubmitting(true)

            try {
                // Simuler un appel API
                await new Promise((resolve) => setTimeout(resolve, 1500))
                console.log("Service créé:", formData)
                setIsSuccess(true)

                // Réinitialiser le formulaire après 2 secondes
                setTimeout(() => {
                    setFormData({
                        title: "",
                        description: "",
                        category: "",
                        price: 0,
                        tags: [],
                        images: [],
                        availability: {
                            monday: true,
                            tuesday: true,
                            wednesday: true,
                            thursday: true,
                            friday: true,
                            saturday: false,
                            sunday: false,
                        },
                        location: "",
                    })
                    setPreviewImages([])
                    setIsSuccess(false)
                    setCurrentStep(1)
                }, 2000)
            } catch (error) {
                console.error("Erreur lors de la création du service:", error)
            } finally {
                setIsSubmitting(false)
            }
        }
    }

    // Passer à l'étape suivante
    const goToNextStep = () => {
        if (currentStep === 1) {
            if (formData.title && formData.description && formData.category && formData.price > 0) {
                setCurrentStep(2)
            } else {
                validateForm()
            }
        } else if (currentStep === 2) {
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

    // Traductions pour les jours de la semaine
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
                        <h1 className="text-3xl font-bold text-primary mb-2">{t("createService.title")}</h1>
                        <p className="text-gray-600">{t("createService.subtitle")}</p>
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
                        ? t("createService.steps.info")
                        : step === 2
                            ? t("createService.steps.details")
                            : t("createService.steps.preview")}
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
                            {/* Étape 1: Informations de base */}
                            {currentStep === 1 && (
                                <motion.div
                                    className="p-6"
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageVariants}
                                    transition={pageTransition}
                                >
                                    <h2 className="text-xl font-semibold mb-6 text-primary">{t("createService.steps.info")}</h2>

                                    <div className="mb-4">
                                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                                            {t("createService.form.title")} <span className="text-red-500">*</span>
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
                                            placeholder={t("createService.form.titlePlaceholder")}
                                        />
                                        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                                            {t("createService.form.description")} <span className="text-red-500">*</span>
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
                                            placeholder={t("createService.form.descriptionPlaceholder")}
                                        ></textarea>
                                        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                                                {t("createService.form.category")} <span className="text-red-500">*</span>
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
                                                <option value="">{t("createService.form.selectCategory")}</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {t(category.nameKey)}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                                                {t("createService.form.price")} <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    id="price"
                                                    name="price"
                                                    value={formData.price || ""}
                                                    onChange={handleChange}
                                                    min="0"
                                                    step="10"
                                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                                        errors.price ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                    placeholder="0"
                                                />
                                                <span className="absolute right-3 top-2 text-gray-500">DH</span>
                                            </div>
                                            {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                                            {t("createService.form.location")} <span className="text-red-500">*</span>
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
                                            <option value="">{t("createService.form.selectLocation")}</option>
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
                                            {t("createService.nextStep")}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Étape 2: Détails supplémentaires */}
                            {currentStep === 2 && (
                                <motion.div
                                    className="p-6"
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageVariants}
                                    transition={pageTransition}
                                >
                                    <h2 className="text-xl font-semibold mb-6 text-primary">{t("createService.steps.details")}</h2>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            {t("createService.form.tags")} <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {availableTags.map((tag) => (
                                                <motion.button
                                                    key={tag.id}
                                                    type="button"
                                                    onClick={() => handleTagToggle(tag.id)}
                                                    className={`px-3 py-1 rounded-full text-sm ${
                                                        formData.tags.includes(tag.id)
                                                            ? "bg-primary text-white"
                                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                    }`}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    {t(tag.nameKey)}
                                                </motion.button>
                                            ))}
                                        </div>
                                        {errors.tags && <p className="mt-1 text-sm text-red-500">{errors.tags}</p>}
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-medium mb-2">{t("createService.form.images")}</label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                                            <input
                                                type="file"
                                                id="images"
                                                name="images"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                            <label htmlFor="images" className="cursor-pointer flex flex-col items-center justify-center">
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
                                                <span className="mt-2 text-gray-600">{t("createService.form.uploadImages")}</span>
                                                <span className="text-xs text-gray-500 mt-1">{t("createService.form.maxImages")}</span>
                                            </label>
                                        </div>

                                        {/* Prévisualisation des images */}
                                        {previewImages.length > 0 && (
                                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                                {previewImages.map((src, index) => (
                                                    <div key={index} className="relative">
                                                        <img
                                                            src={src || "/placeholder.svg"}
                                                            alt={`Preview ${index + 1}`}
                                                            className="w-full h-24 object-cover rounded-md"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(index)}
                                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            {t("createService.form.availability")}
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {Object.entries(formData.availability).map(([day, isAvailable]) => (
                                                <div key={day} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={day}
                                                        checked={isAvailable}
                                                        onChange={() => handleAvailabilityChange(day as keyof ServiceFormData["availability"])}
                                                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                                                    />
                                                    <label htmlFor={day} className="ml-2 text-gray-700">
                                                        {getDayTranslation(day)}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-between mt-6">
                                        <motion.button
                                            type="button"
                                            onClick={goToPreviousStep}
                                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-all"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {t("createService.previousStep")}
                                        </motion.button>
                                        <motion.button
                                            type="button"
                                            onClick={goToNextStep}
                                            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-all"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {t("createService.nextStep")}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Étape 3: Prévisualisation et soumission */}
                            {currentStep === 3 && (
                                <motion.div
                                    className="p-6"
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageVariants}
                                    transition={pageTransition}
                                >
                                    <h2 className="text-xl font-semibold mb-6 text-primary">{t("createService.steps.preview")}</h2>

                                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                                        <h3 className="font-semibold text-lg mb-2">{formData.title}</h3>
                                        <p className="text-gray-600 mb-4">{formData.description}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <span className="text-gray-500">{t("createService.form.category")}:</span>
                                                <span className="ml-2 font-medium">
                          {t(categories.find((c) => c.id === formData.category)?.nameKey || "category.unknown")}
                        </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">{t("createService.form.price")}:</span>
                                                <span className="ml-2 font-medium text-primary">{formData.price} DH</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">{t("createService.form.location")}:</span>
                                                <span className="ml-2 font-medium">{formData.location}</span>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <span className="text-gray-500">{t("createService.form.tags")}:</span>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {formData.tags.map((tagId) => (
                                                    <span
                                                        key={tagId}
                                                        className="bg-secondary bg-opacity-20 text-white px-2 py-1 rounded-full text-xs"
                                                    >
                            {t(availableTags.find((t) => t.id === tagId)?.nameKey || tagId)}
                          </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <span className="text-gray-500">{t("createService.form.availability")}:</span>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {Object.entries(formData.availability)
                                                    .filter(([ isAvailable]) => isAvailable)
                                                    .map(([day]) => (
                                                        <span
                                                            key={day}
                                                            className="bg-primary bg-opacity-10 text-white px-2 py-1 rounded-full text-xs"
                                                        >
                              {getDayTranslation(day)}
                            </span>
                                                    ))}
                                            </div>
                                        </div>

                                        {previewImages.length > 0 && (
                                            <div>
                                                <span className="text-gray-500">{t("createService.form.images")}:</span>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-1">
                                                    {previewImages.map((src, index) => (
                                                        <img
                                                            key={index}
                                                            src={src || "/placeholder.svg"}
                                                            alt={`Preview ${index + 1}`}
                                                            className="w-full h-16 object-cover rounded-md"
                                                        />
                                                    ))}
                                                </div>
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
                                            {t("createService.previousStep")}
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
                                                    {t("createService.submitting")}
                        </span>
                                            ) : (
                                                t("createService.submit")
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
                            <span>{t("createService.successMessage")}</span>
                        </motion.div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default CreateService
