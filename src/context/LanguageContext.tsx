"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

type Language = "fr" | "ar"

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

// Définition des traductions
const translations: Record<Language, Record<string, string>> = {
    fr: {
        // Navigation
        "nav.home": "Accueil",
        "nav.services": "Services",
        "nav.artisans": "Artisans",
        "nav.formations": "Formations",
        "nav.about": "À propos",
        "nav.contact": "Contact",
        "nav.login": "Connexion",
        "nav.register": "Inscription",

        // Hero Section
        "hero.title": "Trouvez les meilleurs artisans au Maroc",
        "hero.subtitle":
            "Hrayfi connecte les clients avec des prestataires de services qualifiés pour tous vos besoins de bricolage, projets et conseils.",
        "hero.button.find": "Trouver un service",
        "hero.button.become": "Devenir prestataire",
        "hero.providers": "Plus de 2000 prestataires de confiance",

        // Services
        "services.title": "Services populaires",
        "services.subtitle": "Découvrez les services les plus demandés par nos clients",
        "services.button": "Voir tous les services",
        "services.filter.title": "Filtrer les services",
        "services.filter.category": "Catégorie",
        "services.filter.price": "Prix",
        "services.filter.rating": "Évaluation",
        "services.filter.provider": "Prestataire",
        "services.filter.apply": "Appliquer",
        "services.filter.reset": "Réinitialiser",
        "services.details": "Voir détails",
        all: "Tous",
        years: "ans",

        // Artisans
        "artisans.title": "Nos artisans qualifiés",
        "artisans.subtitle": "Découvrez nos prestataires de services professionnels",
        "artisans.filter.title": "Filtrer les artisans",
        "artisans.filter.specialty": "Spécialité",
        "artisans.filter.location": "Emplacement",
        "artisans.filter.experience": "Expérience",
        "artisans.filter.apply": "Appliquer",
        "artisans.filter.reset": "Réinitialiser",
        "artisans.contact": "Contacter",
        "artisans.profile": "Voir profil",
        "artisans.experience": "Expérience",
        "artisans.services": "Services",
        "artisans.completed": "Réalisés",

        // Authentication
        "auth.login": "Connexion",
        "auth.register": "Inscription",
        "auth.email": "Email",
        "auth.password": "Mot de passe",
        "auth.confirmPassword": "Confirmer le mot de passe",
        "auth.firstName": "Prénom",
        "auth.lastName": "Nom",
        "auth.rememberMe": "Se souvenir de moi",
        "auth.forgotPassword": "Mot de passe oublié ?",
        "auth.noAccount": "Vous n'avez pas de compte ?",
        "auth.haveAccount": "Vous avez déjà un compte ?",
        "auth.signIn": "Se connecter",
        "auth.signUp": "S'inscrire",
        "auth.or": "Ou continuer avec",
        "auth.terms": "J'accepte les conditions d'utilisation",
        "auth.privacy": "et la politique de confidentialité",
        "auth.client": "Client",
        "auth.provider": "Prestataire (Hrayfi)",
        "auth.accountType": "Type de compte",
        "auth.loading": "Chargement...",

        // Categories
        "category.plumbing": "Plomberie",
        "category.electrical": "Électricité",
        "category.painting": "Peinture",
        "category.carpentry": "Menuiserie",
        "category.cleaning": "Nettoyage",
        "category.gardening": "Jardinage",
        "category.decoration": "Décoration",
        "category.masonry": "Maçonnerie",

        // Footer
        "footer.rights": "Tous droits réservés",
        "footer.terms": "Conditions d'utilisation",
        "footer.privacy": "Politique de confidentialité",
        "footer.faq": "FAQ",
    },
    ar: {
        // Navigation
        "nav.home": "الرئيسية",
        "nav.services": "الخدمات",
        "nav.artisans": "الحرفيين",
        "nav.formations": "التكوينات",
        "nav.about": "من نحن",
        "nav.contact": "اتصل بنا",
        "nav.login": "تسجيل الدخول",
        "nav.register": "التسجيل",

        // Hero Section
        "hero.title": "ابحث عن أفضل الحرفيين في المغرب",
        "hero.subtitle": "حرفي يربط العملاء بمقدمي الخدمات المؤهلين لجميع احتياجاتك من الإصلاحات والمشاريع والاستشارات.",
        "hero.button.find": "ابحث عن خدمة",
        "hero.button.become": "كن مقدم خدمة",
        "hero.providers": "أكثر من 2000 مقدم خدمة موثوق",

        // Services
        "services.title": "الخدمات الشائعة",
        "services.subtitle": "اكتشف الخدمات الأكثر طلبًا من قبل عملائنا",
        "services.button": "عرض جميع الخدمات",
        "services.filter.title": "تصفية الخدمات",
        "services.filter.category": "الفئة",
        "services.filter.price": "السعر",
        "services.filter.rating": "التقييم",
        "services.filter.provider": "مقدم الخدمة",
        "services.filter.apply": "تطبيق",
        "services.filter.reset": "إعادة تعيين",
        "services.details": "عرض التفاصيل",
        all: "الكل",
        years: "سنوات",

        // Artisans
        "artisans.title": "حرفيونا المؤهلون",
        "artisans.subtitle": "اكتشف مقدمي الخدمات المحترفين لدينا",
        "artisans.filter.title": "تصفية الحرفيين",
        "artisans.filter.specialty": "التخصص",
        "artisans.filter.location": "الموقع",
        "artisans.filter.experience": "الخبرة",
        "artisans.filter.apply": "تطبيق",
        "artisans.filter.reset": "إعادة تعيين",
        "artisans.contact": "اتصل",
        "artisans.profile": "عرض الملف الشخصي",
        "artisans.experience": "الخبرة",
        "artisans.services": "الخدمات",
        "artisans.completed": "المنجزة",

        // Authentication
        "auth.login": "تسجيل الدخول",
        "auth.register": "التسجيل",
        "auth.email": "البريد الإلكتروني",
        "auth.password": "كلمة المرور",
        "auth.confirmPassword": "تأكيد كلمة المرور",
        "auth.firstName": "الاسم الأول",
        "auth.lastName": "اسم العائلة",
        "auth.rememberMe": "تذكرني",
        "auth.forgotPassword": "نسيت كلمة المرور؟",
        "auth.noAccount": "ليس لديك حساب؟",
        "auth.haveAccount": "لديك حساب بالفعل؟",
        "auth.signIn": "تسجيل الدخول",
        "auth.signUp": "التسجيل",
        "auth.or": "أو المتابعة باستخدام",
        "auth.terms": "أوافق على شروط الاستخدام",
        "auth.privacy": "وسياسة الخصوصية",
        "auth.client": "عميل",
        "auth.provider": "مقدم خدمة (حرفي)",
        "auth.accountType": "نوع الحساب",
        "auth.loading": "جاري التحميل...",

        // Categories
        "category.plumbing": "السباكة",
        "category.electrical": "الكهرباء",
        "category.painting": "الدهان",
        "category.carpentry": "النجارة",
        "category.cleaning": "التنظيف",
        "category.gardening": "البستنة",
        "category.decoration": "الديكور",
        "category.masonry": "البناء",

        // Footer
        "footer.rights": "جميع الحقوق محفوظة",
        "footer.terms": "شروط الاستخدام",
        "footer.privacy": "سياسة الخصوصية",
        "footer.faq": "الأسئلة الشائعة",
    },
}

const LanguageContext = createContext<LanguageContextType>({
    language: "fr",
    setLanguage: () => {},
    t: (key: string) => key,
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>("fr")

    useEffect(() => {
        // Check if there's a stored language preference
        const storedLanguage = localStorage.getItem("language") as Language | null
        if (storedLanguage && (storedLanguage === "fr" || storedLanguage === "ar")) {
            setLanguage(storedLanguage)
        }

        // Apply RTL for Arabic
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
        document.body.classList.toggle("rtl", language === "ar")
    }, [language])

    const t = (key: string): string => {
        // Vérifier si la clé existe dans les traductions
        if (translations[language] && translations[language][key]) {
            return translations[language][key]
        }
        // Si la clé n'existe pas, retourner la clé elle-même
        console.warn(`Translation key not found: ${key}`)
        return key
    }

    return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}
