import type React from "react"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ArtisanCard from "../components/ArtisanCard"
import { useLanguage } from "../context/LanguageContext"

// Sample data for artisans
const artisansData = [
    {
        id: 101,
        name: "Ahmed Mansouri",
        specialty: "Plomberie",
        specialtyKey: "category.plumbing",
        location: "Casablanca",
        experience: 8,
        rating: 4.8,
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        services: 12,
        completedJobs: 156,
        tags: ["urgence", "installation", "réparation"],
    },
    {
        id: 102,
        name: "Karim Benali",
        specialty: "Électricité",
        specialtyKey: "category.electrical",
        location: "Rabat",
        experience: 10,
        rating: 4.7,
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        services: 8,
        completedJobs: 203,
        tags: ["installation", "commercial", "résidentiel"],
    },
    {
        id: 103,
        name: "Yasmine Lahlou",
        specialty: "Peinture",
        specialtyKey: "category.painting",
        location: "Marrakech",
        experience: 5,
        rating: 4.9,
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        services: 6,
        completedJobs: 89,
        tags: ["intérieur", "décoration", "résidentiel"],
    },
    {
        id: 104,
        name: "Omar Haddad",
        specialty: "Menuiserie",
        specialtyKey: "category.carpentry",
        location: "Fès",
        experience: 12,
        rating: 4.6,
        image: "https://randomuser.me/api/portraits/men/22.jpg",
        services: 10,
        completedJobs: 178,
        tags: ["sur mesure", "bois", "meubles"],
    },
    {
        id: 105,
        name: "Fatima Zahra",
        specialty: "Nettoyage",
        specialtyKey: "category.cleaning",
        location: "Tanger",
        experience: 4,
        rating: 4.9,
        image: "https://randomuser.me/api/portraits/women/32.jpg",
        services: 5,
        completedJobs: 112,
        tags: ["professionnel", "résidentiel", "complet"],
    },
    {
        id: 106,
        name: "Youssef Tazi",
        specialty: "Jardinage",
        specialtyKey: "category.gardening",
        location: "Agadir",
        experience: 7,
        rating: 4.7,
        image: "https://randomuser.me/api/portraits/men/86.jpg",
        services: 7,
        completedJobs: 95,
        tags: ["entretien", "création", "paysagisme"],
    },
]

const Artisans: React.FC = () => {
    const { t, language } = useLanguage();
    const [artisans, setArtisans] = useState(artisansData)
    const [filters, setFilters] = useState({
        specialty: "",
        location: "",
        experience: 0,
        rating: 0,
        searchTerm: "",
    })
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isRTL, setIsRTL] = useState(false)

    // Get unique specialties and locations
    const specialties = [...new Set(artisansData.map((artisan) => artisan.specialty))]
    const locations = [...new Set(artisansData.map((artisan) => artisan.location))]

    useEffect(() => {
        // Check if RTL is enabled
        const lang = localStorage.getItem("language")
        setIsRTL(lang === "ar")

        // Apply filters
        let filteredArtisans = artisansData

        // Filter by specialty
        if (filters.specialty) {
            filteredArtisans = filteredArtisans.filter((artisan) => artisan.specialty === filters.specialty)
        }

        // Filter by location
        if (filters.location) {
            filteredArtisans = filteredArtisans.filter((artisan) => artisan.location === filters.location)
        }

        // Filter by experience
        if (filters.experience > 0) {
            filteredArtisans = filteredArtisans.filter((artisan) => artisan.experience >= filters.experience)
        }

        // Filter by rating
        if (filters.rating > 0) {
            filteredArtisans = filteredArtisans.filter((artisan) => artisan.rating >= filters.rating)
        }

        // Filter by search term
        if (filters.searchTerm) {
            const term = filters.searchTerm.toLowerCase()
            filteredArtisans = filteredArtisans.filter(
                (artisan) =>
                    artisan.name.toLowerCase().includes(term) ||
                    artisan.specialty.toLowerCase().includes(term) ||
                    artisan.location.toLowerCase().includes(term),
            )
        }

        setArtisans(filteredArtisans)
    }, [filters, language])

    const handleSpecialtyChange = (specialty: string) => {
        setFilters((prev) => ({ ...prev, specialty }))
    }

    const handleLocationChange = (location: string) => {
        setFilters((prev) => ({ ...prev, location }))
    }

    const handleExperienceChange = (experience: number) => {
        setFilters((prev) => ({ ...prev, experience }))
    }

    const handleRatingChange = (rating: number) => {
        setFilters((prev) => ({ ...prev, rating }))
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
    }

    const resetFilters = () => {
        setFilters({
            specialty: "",
            location: "",
            experience: 0,
            rating: 0,
            searchTerm: "",
        })
    }

    // Fonction pour obtenir la traduction d'une spécialité
    const getSpecialtyTranslation = (specialty: string) => {
        const specialtyKeyMap: { [key: string]: string } = {
            "Plomberie": "category.plumbing",
            "Électricité": "category.electrical",
            "Peinture": "category.painting",
            "Menuiserie": "category.carpentry",
            "Nettoyage": "category.cleaning",
            "Jardinage": "category.gardening",
            "Décoration": "category.decoration",
            "Bricolage": "category.handyman"
        };

        return t(specialtyKeyMap[specialty] || specialty);
    };

    return (
        <div className={isRTL ? "rtl" : ""}>
            <Navbar />
            <main className="pt-24 bg-light">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t("artisans.title")}</h1>
                        <p className="text-gray-600">{t("artisans.subtitle")}</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Filters - Desktop */}
                        <div className="hidden md:block w-64 bg-white rounded-lg shadow-md p-4 h-fit">
                            <h2 className="text-lg font-semibold mb-4 text-primary">{t("artisans.filter.title")}</h2>

                            {/* Search */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder={t("artisans.search")}
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={filters.searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>

                            {/* Specialty Filter */}
                            <div className="mb-4">
                                <h3 className="font-medium mb-2">{t("artisans.filter.specialty")}</h3>
                                <select
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={filters.specialty}
                                    onChange={(e) => handleSpecialtyChange(e.target.value)}
                                >
                                    <option value="">{t("all")}</option>
                                    {specialties.map((specialty) => (
                                        <option key={specialty} value={specialty}>
                                            {getSpecialtyTranslation(specialty)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Location Filter */}
                            <div className="mb-4">
                                <h3 className="font-medium mb-2">{t("artisans.filter.location")}</h3>
                                <select
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={filters.location}
                                    onChange={(e) => handleLocationChange(e.target.value)}
                                >
                                    <option value="">{t("all")}</option>
                                    {locations.map((location) => (
                                        <option key={location} value={location}>
                                            {location}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Experience Filter */}
                            <div className="mb-4">
                                <h3 className="font-medium mb-2">{t("artisans.filter.experience")}</h3>
                                <select
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={filters.experience}
                                    onChange={(e) => handleExperienceChange(Number(e.target.value))}
                                >
                                    <option value="0">{t("all")}</option>
                                    <option value="1">1+ {t("years")}</option>
                                    <option value="3">3+ {t("years")}</option>
                                    <option value="5">5+ {t("years")}</option>
                                    <option value="10">10+ {t("years")}</option>
                                </select>
                            </div>

                            {/* Rating Filter */}
                            <div className="mb-4">
                                <h3 className="font-medium mb-2">{t("artisans.filter.rating")}</h3>
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
                                            ({t("artisans.filter.reset")})
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Reset Filters */}
                            <button
                                className="w-full bg-secondary text-white py-2 rounded-md hover:bg-opacity-90"
                                onClick={resetFilters}
                            >
                                {t("artisans.filter.reset")}
                            </button>
                        </div>

                        {/* Filters - Mobile */}
                        <div className="md:hidden mb-4">
                            <button
                                className="w-full bg-white shadow-md py-2 px-4 rounded-md flex justify-between items-center"
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                <span className="font-medium">{t("artisans.filter.title")}</span>
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
                                            placeholder={t("artisans.search")}
                                            className="w-full px-3 py-2 border rounded-md"
                                            value={filters.searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                    </div>

                                    {/* Specialty Filter */}
                                    <div className="mb-4">
                                        <h3 className="font-medium mb-2">{t("artisans.filter.specialty")}</h3>
                                        <select
                                            className="w-full px-3 py-2 border rounded-md"
                                            value={filters.specialty}
                                            onChange={(e) => handleSpecialtyChange(e.target.value)}
                                        >
                                            <option value="">{t("all")}</option>
                                            {specialties.map((specialty) => (
                                                <option key={specialty} value={specialty}>
                                                    {getSpecialtyTranslation(specialty)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Location Filter */}
                                    <div className="mb-4">
                                        <h3 className="font-medium mb-2">{t("artisans.filter.location")}</h3>
                                        <select
                                            className="w-full px-3 py-2 border rounded-md"
                                            value={filters.location}
                                            onChange={(e) => handleLocationChange(e.target.value)}
                                        >
                                            <option value="">{t("all")}</option>
                                            {locations.map((location) => (
                                                <option key={location} value={location}>
                                                    {location}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Reset Filters */}
                                    <button
                                        className="w-full bg-secondary text-white py-2 rounded-md hover:bg-opacity-90"
                                        onClick={resetFilters}
                                    >
                                        {t("artisans.filter.reset")}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Artisans Grid */}
                        <div className="flex-1">
                            {artisans.length === 0 ? (
                                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                                    <p className="text-lg text-gray-600">{t("artisans.no.results")}</p>
                                    <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md" onClick={resetFilters}>
                                        {t("artisans.filter.reset")}
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {artisans.map((artisan) => (
                                        <ArtisanCard key={artisan.id} {...artisan} />
                                    ))}
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

export default Artisans