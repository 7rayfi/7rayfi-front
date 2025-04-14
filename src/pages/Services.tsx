import type React from "react"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ServiceCard from "../components/ServiceCard"
import { useLanguage } from "../context/LanguageContext"

// Sample data for services
const servicesData = [
    {
        id: 1,
        title: "Réparation plomberie",
        titleKey: "services.plumbing.repair",
        description: "Service de réparation de plomberie rapide et professionnel pour tous vos problèmes d'eau.",
        descriptionKey: "services.plumbing.repair.description",
        price: 250,
        image:
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "plumbing",
        categoryKey: "category.plumbing",
        tags: ["urgence", "réparation", "installation"],
        tagKeys: ["tag.emergency", "tag.repair", "tag.installation"],
        provider: {
            id: 101,
            name: "Ahmed M.",
            rating: 4.8,
        },
    },
    {
        id: 2,
        title: "Installation électrique",
        titleKey: "services.electrical.installation",
        description: "Installation et réparation de systèmes électriques résidentiels et commerciaux.",
        descriptionKey: "services.electrical.installation.description",
        price: 350,
        image:
            "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
        category: "electrical",
        categoryKey: "category.electrical",
        tags: ["installation", "réparation", "commercial"],
        tagKeys: ["tag.installation", "tag.repair", "tag.commercial"],
        provider: {
            id: 102,
            name: "Karim B.",
            rating: 4.7,
        },
    },
    {
        id: 3,
        title: "Peinture intérieure",
        titleKey: "services.painting.interior",
        description: "Service de peinture professionnelle pour rafraîchir l'intérieur de votre maison.",
        descriptionKey: "services.painting.interior.description",
        price: 180,
        image:
            "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        category: "painting",
        categoryKey: "category.painting",
        tags: ["intérieur", "décoration", "résidentiel"],
        tagKeys: ["tag.interior", "tag.decoration", "tag.residential"],
        provider: {
            id: 103,
            name: "Yasmine L.",
            rating: 4.9,
        },
    },
    {
        id: 4,
        title: "Menuiserie sur mesure",
        titleKey: "services.carpentry.custom",
        description: "Création de meubles et éléments en bois sur mesure selon vos besoins.",
        descriptionKey: "services.carpentry.custom.description",
        price: 450,
        image:
            "https://images.unsplash.com/photo-1588854337236-6889d631faa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "carpentry",
        categoryKey: "category.carpentry",
        tags: ["sur mesure", "bois", "meubles"],
        tagKeys: ["tag.custom", "tag.wood", "tag.furniture"],
        provider: {
            id: 104,
            name: "Omar H.",
            rating: 4.6,
        },
    },
    {
        id: 5,
        title: "Nettoyage professionnel",
        titleKey: "services.cleaning.professional",
        description: "Service de nettoyage complet pour maisons et appartements.",
        descriptionKey: "services.cleaning.professional.description",
        price: 200,
        image:
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "cleaning",
        categoryKey: "category.cleaning",
        tags: ["professionnel", "résidentiel", "complet"],
        tagKeys: ["tag.professional", "tag.residential", "tag.complete"],
        provider: {
            id: 105,
            name: "Fatima Z.",
            rating: 4.9,
        },
    },
    {
        id: 6,
        title: "Jardinage et aménagement",
        titleKey: "services.gardening.landscaping",
        description: "Entretien et création de jardins et espaces verts.",
        descriptionKey: "services.gardening.landscaping.description",
        price: 300,
        image:
            "https://i.guim.co.uk/img/media/ef96c1f2495b60ec83379962d4aec38bfb1ce039/0_187_5600_3363/master/5600.jpg?width=1200&quality=85&auto=format&fit=max&s=f0198ef0d8b34258c6b8b494ca82669e",
        category: "gardening",
        categoryKey: "category.gardening",
        tags: ["entretien", "création", "paysagisme"],
        tagKeys: ["tag.maintenance", "tag.creation", "tag.landscaping"],
        provider: {
            id: 106,
            name: "Youssef T.",
            rating: 4.7,
        },
    },
]

const Services: React.FC = () => {
    const { t, language } = useLanguage();
    const [services, setServices] = useState(servicesData)
    const [filters, setFilters] = useState({
        category: "",
        priceRange: { min: 0, max: 1000 },
        rating: 0,
        tags: [] as string[],
        provider: "",
        searchTerm: "",
    })
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isRTL, setIsRTL] = useState(false)

    // Pour les catégories dans le filtre
    const categories = [...new Set(servicesData.map((service) => service.category))]

    // Pour les tags dans le filtre
    const tags = [...new Set(servicesData.flatMap((service) => service.tags))]

    // Pour les prestataires dans le filtre
    const providers = [...new Set(servicesData.map((service) => service.provider.name))]

    useEffect(() => {
        // Check if RTL is enabled
        const lang = localStorage.getItem("language")
        setIsRTL(lang === "ar")

        // Apply filters
        let filteredServices = servicesData

        // Filter by category
        if (filters.category) {
            filteredServices = filteredServices.filter((service) => service.category === filters.category)
        }

        // Filter by price range
        filteredServices = filteredServices.filter(
            (service) => service.price >= filters.priceRange.min && service.price <= filters.priceRange.max,
        )

        // Filter by rating
        if (filters.rating > 0) {
            filteredServices = filteredServices.filter((service) => service.provider.rating >= filters.rating)
        }

        // Filter by tags
        if (filters.tags.length > 0) {
            filteredServices = filteredServices.filter((service) => filters.tags.some((tag) => service.tags.includes(tag)))
        }

        // Filter by provider
        if (filters.provider) {
            filteredServices = filteredServices.filter((service) => service.provider.name === filters.provider)
        }

        // Filter by search term
        if (filters.searchTerm) {
            const term = filters.searchTerm.toLowerCase()
            filteredServices = filteredServices.filter(
                (service) =>
                    service.title.toLowerCase().includes(term) ||
                    service.description.toLowerCase().includes(term) ||
                    service.category.toLowerCase().includes(term),
            )
        }

        setServices(filteredServices)
    }, [filters, language])

    const handleCategoryChange = (category: string) => {
        setFilters((prev) => ({ ...prev, category }))
    }

    const handlePriceChange = (min: number, max: number) => {
        setFilters((prev) => ({ ...prev, priceRange: { min, max } }))
    }

    const handleRatingChange = (rating: number) => {
        setFilters((prev) => ({ ...prev, rating }))
    }

    const handleTagToggle = (tag: string) => {
        setFilters((prev) => {
            const newTags = prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag]
            return { ...prev, tags: newTags }
        })
    }

    const handleProviderChange = (provider: string) => {
        setFilters((prev) => ({ ...prev, provider }))
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
    }

    const resetFilters = () => {
        setFilters({
            category: "",
            priceRange: { min: 0, max: 1000 },
            rating: 0,
            tags: [],
            provider: "",
            searchTerm: "",
        })
    }

    // Fonction pour obtenir la traduction d'une catégorie
    const getCategoryTranslation = (category: string) => {
        const categoryKeyMap: { [key: string]: string } = {
            "plumbing": "category.plumbing",
            "electrical": "category.electrical",
            "painting": "category.painting",
            "carpentry": "category.carpentry",
            "cleaning": "category.cleaning",
            "gardening": "category.gardening"
        };

        return t(categoryKeyMap[category] || category);
    };

    // Fonction pour obtenir la traduction d'un tag
    const getTagTranslation = (tag: string) => {
        const tagKeyMap: { [key: string]: string } = {
            "urgence": "tag.emergency",
            "réparation": "tag.repair",
            "installation": "tag.installation",
            "commercial": "tag.commercial",
            "intérieur": "tag.interior",
            "décoration": "tag.decoration",
            "résidentiel": "tag.residential",
            "sur mesure": "tag.custom",
            "bois": "tag.wood",
            "meubles": "tag.furniture",
            "professionnel": "tag.professional",
            "complet": "tag.complete",
            "entretien": "tag.maintenance",
            "création": "tag.creation",
            "paysagisme": "tag.landscaping"
        };

        return t(tagKeyMap[tag] || tag);
    };

    return (
        <div className={isRTL ? "rtl" : ""}>
            <Navbar />
            <main className="pt-24 bg-light">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t("services.title")}</h1>
                        <p className="text-gray-600">{t("services.subtitle")}</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Filters - Desktop */}
                        <div className="hidden md:block w-64 bg-white rounded-lg shadow-md p-4 h-fit">
                            <h2 className="text-lg font-semibold mb-4 text-primary">{t("services.filter.title")}</h2>

                            {/* Search */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder={t("services.search")}
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={filters.searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="mb-4">
                                <h3 className="font-medium mb-2">{t("services.filter.category")}</h3>
                                <select
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={filters.category}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                >
                                    <option value="">{t("all")}</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {getCategoryTranslation(category)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range Filter */}
                            <div className="mb-4">
                                <h3 className="font-medium mb-2">{t("services.filter.price")}</h3>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="Min"
                                        value={filters.priceRange.min}
                                        onChange={(e) => handlePriceChange(Number(e.target.value), filters.priceRange.max)}
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="Max"
                                        value={filters.priceRange.max}
                                        onChange={(e) => handlePriceChange(filters.priceRange.min, Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div className="mb-4">
                                <h3 className="font-medium mb-2">{t("services.filter.rating")}</h3>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            className={`text-2xl ${star <= filters.rating ? "text-accent" : "text-gray-300"}`}
                                            onClick={() => handleRatingChange(star)}
                                        >
                                            ★
                                        </button>
                                    ))}
                                    {filters.rating > 0 && (
                                        <button className="ml-2 text-xs text-gray-500" onClick={() => handleRatingChange(0)}>
                                            ({t("services.filter.reset")})
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Tags Filter */}
                            <div className="mb-4">
                                <h3 className="font-medium mb-2">{t("services.filter.tags")}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <button
                                            key={tag}
                                            className={`px-2 py-1 text-xs rounded-full ${
                                                filters.tags.includes(tag)
                                                    ? "bg-primary text-white"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                            onClick={() => handleTagToggle(tag)}
                                        >
                                            {getTagTranslation(tag)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Provider Filter */}
                            <div className="mb-4">
                                <h3 className="font-medium mb-2">{t("services.filter.provider")}</h3>
                                <select
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={filters.provider}
                                    onChange={(e) => handleProviderChange(e.target.value)}
                                >
                                    <option value="">{t("all")}</option>
                                    {providers.map((provider) => (
                                        <option key={provider} value={provider}>
                                            {provider}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Reset Filters */}
                            <button
                                className="w-full bg-secondary text-white py-2 rounded-md hover:bg-opacity-90"
                                onClick={resetFilters}
                            >
                                {t("services.filter.reset")}
                            </button>
                        </div>

                        {/* Filters - Mobile */}
                        <div className="md:hidden mb-4">
                            <button
                                className="w-full bg-white shadow-md py-2 px-4 rounded-md flex justify-between items-center"
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                <span className="font-medium">{t("services.filter.title")}</span>
                                <svg
                                    className={`w-5 h-5 transition-transform ${isFilterOpen ? "transform rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isFilterOpen && (
                                <div className="bg-white rounded-lg shadow-md p-4 mt-2">
                                    {/* Search */}
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            placeholder={t("services.search")}
                                            className="w-full px-3 py-2 border rounded-md"
                                            value={filters.searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                    </div>

                                    {/* Category Filter */}
                                    <div className="mb-4">
                                        <h3 className="font-medium mb-2">{t("services.filter.category")}</h3>
                                        <select
                                            className="w-full px-3 py-2 border rounded-md"
                                            value={filters.category}
                                            onChange={(e) => handleCategoryChange(e.target.value)}
                                        >
                                            <option value="">{t("all")}</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {getCategoryTranslation(category)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Price Range Filter */}
                                    <div className="mb-4">
                                        <h3 className="font-medium mb-2">{t("services.filter.price")}</h3>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                className="w-full px-3 py-2 border rounded-md"
                                                placeholder="Min"
                                                value={filters.priceRange.min}
                                                onChange={(e) => handlePriceChange(Number(e.target.value), filters.priceRange.max)}
                                            />
                                            <span>-</span>
                                            <input
                                                type="number"
                                                className="w-full px-3 py-2 border rounded-md"
                                                placeholder="Max"
                                                value={filters.priceRange.max}
                                                onChange={(e) => handlePriceChange(filters.priceRange.min, Number(e.target.value))}
                                            />
                                        </div>
                                    </div>

                                    {/* Reset Filters */}
                                    <button
                                        className="w-full bg-secondary text-white py-2 rounded-md hover:bg-opacity-90"
                                        onClick={resetFilters}
                                    >
                                        {t("services.filter.reset")}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Services Grid */}
                        <div className="flex-1">
                            {services.length === 0 ? (
                                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                                    <p className="text-lg text-gray-600">{t("services.no.results")}</p>
                                    <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md" onClick={resetFilters}>
                                        {t("services.filter.reset")}
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {services.map((service) => {
                                        // Préparer un objet avec les traductions
                                        const translatedService = {
                                            ...service,
                                            title: t(service.titleKey) || service.title,
                                            description: t(service.descriptionKey) || service.description,
                                            category: t(service.categoryKey) || service.category
                                        };
                                        return <ServiceCard key={service.id} {...translatedService} />;
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Services