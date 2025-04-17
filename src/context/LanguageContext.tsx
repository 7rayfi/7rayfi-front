import { createContext, useState, useContext, useEffect, ReactNode } from "react";

type Language = "fr" | "ar";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
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
        "all": "Tous",
        "years": "ans",

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
        "services.categories.title":"Explorez nos catégories",
        "services.categories.subtitle":"Découvrez une large gamme de services proposés par nos artisans qualifiés dans différentes catégories",
        "services.categories.viewAll":"voir tous les catégories",
        "services.count":"services",

        "category.plumbing": "Plomberie",
        "category.electrical": "Électricité",
        "category.painting": "Peinture",
        "category.carpentry": "Menuiserie",
        "category.cleaning": "Nettoyage",
        "category.gardening": "Jardinage",
        "category.decoration": "Décoration",
        "category.masonry": "Maçonnerie",

        // How it works
        "howItWorks.title": "Comment ça marche",
        "howItWorks.subtitle": "Suivez ces étapes simples pour trouver et réserver le service dont vous avez besoin",
        "howItWorks.step1.title": "Recherchez un service",
        "howItWorks.step1.description": "Parcourez notre large sélection de services ou utilisez la recherche pour trouver ce dont vous avez besoin.",
        "howItWorks.step2.title": "Choisissez un prestataire",
        "howItWorks.step2.description": "Comparez les profils, les évaluations et les portfolios pour choisir le meilleur prestataire.",
        "howItWorks.step3.title": "Contactez et réservez",
        "howItWorks.step3.description": "Discutez directement avec le prestataire et réservez le service à la date qui vous convient.",
        "howItWorks.step4.title": "Profitez du service",
        "howItWorks.step4.description": "Recevez un service de qualité et laissez votre avis pour aider la communauté.",
        "howItWorks.button": "Commencer maintenant",



        // services




        // Testimonials
        "testimonials.title": "Ce que disent nos clients",
        "testimonials.subtitle": "Découvrez les témoignages de nos clients et prestataires satisfaits",

        // Subscription Plans
        "plans.title": "Choisissez votre forfait",
        "plans.subtitle": "Des forfaits adaptés à tous les besoins et budgets",
        "plans.basic.title": "Basic",
        "plans.basic.description": "Pour commencer à explorer la plateforme",
        "plans.basic.price": "0",
        "plans.premium.title": "Premium",
        "plans.premium.description": "Pour une utilisation régulière",
        "plans.premium.price": "99",
        "plans.extra.title": "Extra",
        "plans.extra.description": "Pour une utilisation professionnelle",
        "plans.extra.price": "199",
        "plans.monthly": "DH/mois",
        "plans.popular": "PLUS POPULAIRE",
        "plans.button.free": "Commencer gratuitement",
        "plans.button.subscribe": "S'abonner maintenant",

        // CTA Section
        "cta.title": "Prêt à trouver le service parfait pour vos besoins ?",
        "cta.subtitle": "Rejoignez des milliers d'utilisateurs satisfaits et commencez à utiliser Hrayfi dès aujourd'hui.",
        "cta.button.find": "Trouver un service",
        "cta.button.become": "Devenir prestataire",

        // Footer
        "footer.rights": "Tous droits réservés",
        "footer.terms": "Conditions d'utilisation",
        "footer.privacy": "Politique de confidentialité",
        "footer.faq": "FAQ",
        "footer.contact": "Contact",
        "footer.about": "À propos",
        "footer.services": "Services",
        "footer.artisans": "Artisans",
        "footer.formations": "Formations",
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
        "all": "الكل",
        "years": "سنوات",

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
        "artisans.filter.rating":"التقييم",
        "artisans.no.results":"لا يوجد",



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

        // How it works
        "howItWorks.title": "كيف يعمل",
        "howItWorks.subtitle": "اتبع هذه الخطوات البسيطة للعثور على الخدمة التي تحتاجها وحجزها",
        "howItWorks.step1.title": "ابحث عن خدمة",
        "howItWorks.step1.description": "تصفح مجموعتنا الواسعة من الخدمات أو استخدم البحث للعثور على ما تحتاجه.",
        "howItWorks.step2.title": "اختر مقدم خدمة",
        "howItWorks.step2.description": "قارن بين الملفات الشخصية والتقييمات والسير الذاتية لاختيار أفضل مقدم خدمة.",
        "howItWorks.step3.title": "اتصل واحجز",
        "howItWorks.step3.description": "تواصل مباشرة مع مقدم الخدمة واحجز الخدمة في التاريخ الذي يناسبك.",
        "howItWorks.step4.title": "استمتع بالخدمة",
        "howItWorks.step4.description": "احصل على خدمة عالية الجودة واترك رأيك لمساعدة المجتمع.",
        "howItWorks.button": "ابدأ الآن",

        // Testimonials
        "testimonials.title": "ماذا يقول عملاؤنا",
        "testimonials.subtitle": "اكتشف آراء عملائنا ومقدمي الخدمات الراضين",

        // Subscription Plans
        "plans.title": "اختر باقتك",
        "plans.subtitle": "باقات تناسب جميع الاحتياجات والميزانيات",
        "plans.basic.title": "أساسية",
        "plans.basic.description": "للبدء في استكشاف المنصة",
        "plans.basic.price": "0",
        "plans.premium.title": "متميزة",
        "plans.premium.description": "للاستخدام المنتظم",
        "plans.premium.price": "99",
        "plans.extra.title": "إضافية",
        "plans.extra.description": "للاستخدام المهني",
        "plans.extra.price": "199",
        "plans.monthly": "درهم/شهر",
        "plans.popular": "الأكثر شعبية",
        "plans.button.free": "ابدأ مجانًا",
        "plans.button.subscribe": "اشترك الآن",

        // CTA Section
        "cta.title": "هل أنت مستعد للعثور على الخدمة المثالية لاحتياجاتك؟",
        "cta.subtitle": "انضم إلى آلاف المستخدمين الراضين وابدأ استخدام حرفي اليوم.",
        "cta.button.find": "ابحث عن خدمة",
        "cta.button.become": "كن مقدم خدمة",

        // Footer
        "footer.rights": "جميع الحقوق محفوظة",
        "footer.terms": "شروط الاستخدام",
        "footer.privacy": "سياسة الخصوصية",
        "footer.faq": "الأسئلة الشائعة",
        "footer.contact": "اتصل بنا",
        "footer.about": "من نحن",
        "footer.services": "الخدمات",
        "footer.artisans": "الحرفيين",
        "footer.formations": "التكوينات",
    },
};

const LanguageContext = createContext<LanguageContextType>({
    language: "fr",
    setLanguage: () => {},
    t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>("fr");

    useEffect(() => {
        // Récupérer la langue enregistrée dans localStorage
        const storedLanguage = localStorage.getItem("language") as Language | null;
        if (storedLanguage && (storedLanguage === "fr" || storedLanguage === "ar")) {
            setLanguage(storedLanguage);
        }

        // Appliquer RTL pour l'arabe
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
        if (language === "ar") {
            document.body.classList.add("rtl");
        } else {
            document.body.classList.remove("rtl");
        }
    }, [language]);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);

        // Appliquer RTL pour l'arabe
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        if (lang === "ar") {
            document.body.classList.add("rtl");
        } else {
            document.body.classList.remove("rtl");
        }
    };

    const t = (key: string): string => {
        // Vérifier si la clé existe dans les traductions
        if (translations[language] && translations[language][key]) {
            return translations[language][key];
        }
        // Si la clé n'existe pas, retourner la clé elle-même
        console.warn(`Translation key not found: ${key}`);
        return key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};