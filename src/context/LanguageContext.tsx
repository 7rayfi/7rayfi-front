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
        "artisans.search":"chercher ...",


        // Authentication
        "auth.welcomeBack":"bienvenue",
        "auth.phoneFormat":"numéro de votre télépone",

        "auth.phone" : "Téléphone",
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
        "createService.title": "Créer un nouveau service",
        "createService.subtitle": "Proposez vos compétences et services aux clients",
        "createService.steps.info": "Informations de base",
        "createService.steps.details": "Détails supplémentaires",
        "createService.steps.preview": "Prévisualisation",
        "createService.form.title": "Titre du service",
        "createService.form.titlePlaceholder": "Ex: Réparation de plomberie professionnelle",
        "createService.form.description": "Description",
        "createService.form.descriptionPlaceholder": "Décrivez en détail le service que vous proposez...",
        "createService.form.category": "Catégorie",
        "createService.form.selectCategory": "Sélectionnez une catégorie",
        "createService.form.price": "Prix (DH)",
        "createService.form.location": "Ville",
        "createService.form.selectLocation": "Sélectionnez une ville",
        "createService.form.tags": "Tags",
        "createService.form.images": "Images",
        "createService.form.uploadImages": "Cliquez pour ajouter des images",
        "createService.form.maxImages": "Maximum 5 images (JPG, PNG)",
        "createService.form.availability": "Disponibilité",
        "createService.nextStep": "Suivant",
        "createService.previousStep": "Précédent",
        "createService.submit": "Créer le service",
        "createService.submitting": "Création en cours...",
        "createService.successMessage": "Votre service a été créé avec succès!",
        "createService.maxImagesError": "Vous ne pouvez pas ajouter plus de 5 images",
        "createService.errors.titleRequired": "Le titre est requis",
        "createService.errors.descriptionRequired": "La description est requise",
        "createService.errors.descriptionLength": "La description doit contenir au moins 50 caractères",
        "createService.errors.categoryRequired": "La catégorie est requise",
        "createService.errors.priceRequired": "Le prix doit être supérieur à 0",
        "createService.errors.tagsRequired": "Sélectionnez au moins un tag",
        "createService.errors.locationRequired": "La ville est requise",

        // Demande de service
        "requestService.title": "Demander un service",
        "requestService.subtitle": "Décrivez votre besoin et trouvez le bon artisan",
        "requestService.steps.details": "Détails du besoin",
        "requestService.steps.preferences": "Préférences",
        "requestService.steps.review": "Révision et soumission",
        "requestService.form.title": "Titre de la demande",
        "requestService.form.titlePlaceholder": "Ex: Réparation d'un robinet qui fuit",
        "requestService.form.description": "Description",
        "requestService.form.descriptionPlaceholder": "Décrivez en détail votre besoin...",
        "requestService.form.category": "Catégorie",
        "requestService.form.selectCategory": "Sélectionnez une catégorie",
        "requestService.form.location": "Ville",
        "requestService.form.selectLocation": "Sélectionnez une ville",
        "requestService.form.budget": "Budget (DH)",
        "requestService.form.minBudget": "Min",
        "requestService.form.maxBudget": "Max",
        "requestService.form.preferredDate": "Date souhaitée",
        "requestService.form.urgency": "Urgence",
        "requestService.urgency.low": "Faible",
        "requestService.urgency.medium": "Moyenne",
        "requestService.urgency.high": "Élevée",
        "requestService.form.contactMethod": "Méthode de contact préférée",
        "requestService.contactMethod.phone": "Téléphone",
        "requestService.contactMethod.email": "Email",
        "requestService.contactMethod.both": "Les deux",
        "requestService.form.attachments": "Pièces jointes",
        "requestService.form.uploadAttachments": "Cliquez pour ajouter des photos ou documents",
        "requestService.form.maxAttachments": "Maximum 3 fichiers (JPG, PNG, PDF)",
        "requestService.nextStep": "Suivant",
        "requestService.previousStep": "Précédent",
        "requestService.submit": "Soumettre la demande",
        "requestService.submitting": "Soumission en cours...",
        "requestService.successMessage": "Votre demande a été soumise avec succès!",
        "requestService.maxAttachmentsError": "Vous ne pouvez pas ajouter plus de 3 pièces jointes",
        "requestService.errors.titleRequired": "Le titre est requis",
        "requestService.errors.descriptionRequired": "La description est requise",
        "requestService.errors.descriptionLength": "La description doit contenir au moins 30 caractères",
        "requestService.errors.categoryRequired": "La catégorie est requise",
        "requestService.errors.budgetRequired": "Le budget minimum et maximum sont requis",
        "requestService.errors.budgetInvalid": "Le budget minimum ne peut pas être supérieur au budget maximum",
        "requestService.errors.locationRequired": "La ville est requise",
        "requestService.matchingArtisans": "Artisans correspondants",
        "requestService.noMatchingArtisans":
            "Aucun artisan correspondant trouvé pour le moment. Votre demande sera visible par tous les artisans de la catégorie sélectionnée.",

        // Jours de la semaine
        "days.monday": "Lundi",
        "days.tuesday": "Mardi",
        "days.wednesday": "Mercredi",
        "days.thursday": "Jeudi",
        "days.friday": "Vendredi",
        "days.saturday": "Samedi",
        "days.sunday": "Dimanche",

        // Tags
        "tag.emergency": "Urgence",
        "tag.repair": "Réparation",
        "tag.installation": "Installation",
        "tag.commercial": "Commercial",
        "tag.residential": "Résidentiel",
        "tag.interior": "Intérieur",
        "tag.exterior": "Extérieur",
        "tag.custom": "Sur mesure",
        "tag.maintenance": "Entretien",
        "tag.wood": "Bois",
        "tag.furniture": "Meubles",
        "tag.professional": "Professionnel",
        "tag.complete": "Complet",
        "tag.creation": "Création",
        "tag.landscaping": "Paysagisme",

        "portfolio.title": "Portfolio",
        "portfolio.projects": "projets",
        "portfolio.filterByCategory": "Filtrer par catégorie",
        "portfolio.featured": "En vedette",
        "portfolio.client": "Client",
        "portfolio.date": "Date",
        "portfolio.location": "Lieu",
        "portfolio.category": "Catégorie",
        "portfolio.close": "Fermer",
        "portfolio.noProjects": "Aucun projet trouvé dans cette catégorie",
        "portfolio.categories.all": "Tous",

        // Profil
        "profile.contact": "Contacter",
        "profile.viewPortfolio": "Voir le portfolio",
        "profile.reviews": "avis",
        "profile.tabs.services": "Services",
        "profile.tabs.reviews": "Avis",
        "profile.tabs.certifications": "Certifications",
        "profile.tabs.info": "Informations",
        "profile.contactInfo": "Coordonnées",
        "profile.socialMedia": "Réseaux sociaux",
        "profile.languages": "Langues",
        "profile.availability": "Disponibilité",
        "profile.requestService": "Demander ce service",
        "profile.serviceReviews": "Avis sur ce service",
        "profile.noReviews": "Aucun avis pour ce service",
        "profile.contactArtisan": "Contacter l'artisan",
        "profile.contactDescription": "Envoyez un message à {name} pour discuter de vos besoins ou demander un devis.",
        "profile.form.name": "Votre nom",
        "profile.form.email": "Votre email",
        "profile.form.phone": "Votre téléphone",
        "profile.form.message": "Votre message",
        "profile.cancel": "Annuler",
        "profile.send": "Envoyer",
        "profile.close": "Fermer",
        "profile.contactSuccess": "Votre message a été envoyé avec succès !",
        "profile.stats.experience": "Années d'expérience",
        "profile.stats.completedJobs": "Projets réalisés",
        "profile.stats.rating": "Note moyenne",
        "profile.stats.responseTime": "Temps de réponse",
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
        "services.categories.subtitle":"اكتشف مجموعة واسعة من الخدمات التي يقدمها الحرفيون المؤهلون لدينا في فئات مختلفة",
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
        "services.count":"عدد الخدمات",
        "services.categories.viewAll":"المزيد",
        "services.search":"ابحث",

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
        "artisans.search":"ابحث",


        // Authentication
        "auth.welcomeBack":"مرحبا بك",
        "auth.phoneFormat":"الهاتف المغربي",
        "auth.phone" : "الهاتق",
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
        "services.categories.title": "الفئات",
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
        "createService.title": "إنشاء خدمة جديدة",
        "createService.subtitle": "قدم مهاراتك وخدماتك للعملاء",
        "createService.steps.info": "المعلومات الأساسية",
        "createService.steps.details": "تفاصيل إضافية",
        "createService.steps.preview": "معاينة",
        "createService.form.title": "عنوان الخدمة",
        "createService.form.titlePlaceholder": "مثال: خدمة إصلاح السباكة المهنية",
        "createService.form.description": "الوصف",
        "createService.form.descriptionPlaceholder": "صف بالتفصيل الخدمة التي تقدمها...",
        "createService.form.category": "الفئة",
        "createService.form.selectCategory": "اختر فئة",
        "createService.form.price": "السعر (درهم)",
        "createService.form.location": "المدينة",
        "createService.form.selectLocation": "اختر مدينة",
        "createService.form.tags": "العلامات",
        "createService.form.images": "الصور",
        "createService.form.uploadImages": "انقر لإضافة صور",
        "createService.form.maxImages": "الحد الأقصى 5 صور (JPG، PNG)",
        "createService.form.availability": "التوفر",
        "createService.nextStep": "التالي",
        "createService.previousStep": "السابق",
        "createService.submit": "إنشاء الخدمة",
        "createService.submitting": "جاري الإنشاء...",
        "createService.successMessage": "تم إنشاء خدمتك بنجاح!",
        "createService.maxImagesError": "لا يمكنك إضافة أكثر من 5 صور",
        "createService.errors.titleRequired": "العنوان مطلوب",
        "createService.errors.descriptionRequired": "الوصف مطلوب",
        "createService.errors.descriptionLength": "يجب أن يحتوي الوصف على 50 حرفًا على الأقل",
        "createService.errors.categoryRequired": "الفئة مطلوبة",
        "createService.errors.priceRequired": "يجب أن يكون السعر أكبر من 0",
        "createService.errors.tagsRequired": "اختر علامة واحدة على الأقل",
        "createService.errors.locationRequired": "المدينة مطلوبة",

        // Demande de service
        "requestService.title": "طلب خدمة",
        "requestService.subtitle": "صف احتياجك وابحث عن الحرفي المناسب",
        "requestService.steps.details": "تفاصيل الاحتياج",
        "requestService.steps.preferences": "التفضيلات",
        "requestService.steps.review": "المراجعة والتقديم",
        "requestService.form.title": "عنوان الطلب",
        "requestService.form.titlePlaceholder": "مثال: إصلاح صنبور مسرب",
        "requestService.form.description": "الوصف",
        "requestService.form.descriptionPlaceholder": "صف بالتفصيل احتياجك...",
        "requestService.form.category": "الفئة",
        "requestService.form.selectCategory": "اختر فئة",
        "requestService.form.location": "المدينة",
        "requestService.form.selectLocation": "اختر مدينة",
        "requestService.form.budget": "الميزانية (درهم)",
        "requestService.form.minBudget": "الحد الأدنى",
        "requestService.form.maxBudget": "الحد الأقصى",
        "requestService.form.preferredDate": "التاريخ المفضل",
        "requestService.form.urgency": "الأولوية",
        "requestService.urgency.low": "منخفضة",
        "requestService.urgency.medium": "متوسطة",
        "requestService.urgency.high": "عالية",
        "requestService.form.contactMethod": "طريقة الاتصال المفضلة",
        "requestService.contactMethod.phone": "الهاتف",
        "requestService.contactMethod.email": "البريد الإلكتروني",
        "requestService.contactMethod.both": "كلاهما",
        "requestService.form.attachments": "المرفقات",
        "requestService.form.uploadAttachments": "انقر لإضافة صور أو مستندات",
        "requestService.form.maxAttachments": "الحد الأقصى 3 ملفات (JPG، PNG، PDF)",
        "requestService.nextStep": "التالي",
        "requestService.previousStep": "السابق",
        "requestService.submit": "تقديم الطلب",
        "requestService.submitting": "جاري التقديم...",
        "requestService.successMessage": "تم تقديم طلبك بنجاح!",
        "requestService.maxAttachmentsError": "لا يمكنك إضافة أكثر من 3 مرفقات",
        "requestService.errors.titleRequired": "العنوان مطلوب",
        "requestService.errors.descriptionRequired": "الوصف مطلوب",
        "requestService.errors.descriptionLength": "يجب أن يحتوي الوصف على 30 حرفًا على الأقل",
        "requestService.errors.categoryRequired": "الفئة مطلوبة",
        "requestService.errors.budgetRequired": "الحد الأدنى والأقصى للميزانية مطلوبان",
        "requestService.errors.budgetInvalid": "لا يمكن أن يكون الحد الأدنى للميزانية أكبر من الحد الأقصى",
        "requestService.errors.locationRequired": "المدينة مطلوبة",
        "requestService.matchingArtisans": "الحرفيون المطابقون",
        "requestService.noMatchingArtisans":
            "لم يتم العثور على حرفيين مطابقين حاليًا. سيكون طلبك مرئيًا لجميع الحرفيين في الفئة المحددة.",

        // Jours de la semaine
        "days.monday": "الإثنين",
        "days.tuesday": "الثلاثاء",
        "days.wednesday": "الأربعاء",
        "days.thursday": "الخميس",
        "days.friday": "الجمعة",
        "days.saturday": "السبت",
        "days.sunday": "الأحد",

        // Tags
        "tag.emergency": "طوارئ",
        "tag.repair": "إصلاح",
        "tag.installation": "تركيب",
        "tag.commercial": "تجاري",
        "tag.residential": "سكني",
        "tag.interior": "داخلي",
        "tag.exterior": "خارجي",
        "tag.custom": "مخصص",
        "tag.maintenance": "صيانة",
        "tag.wood": "خشب",
        "tag.furniture": "أثاث",
        "tag.professional": "احترافي",
        "tag.complete": "شامل",
        "tag.creation": "إنشاء",
        "tag.landscaping": "تنسيق الحدائق",
        "portfolio.title": "معرض الأعمال",
        "portfolio.projects": "مشاريع",
        "portfolio.filterByCategory": "تصفية حسب الفئة",
        "portfolio.featured": "مميز",
        "portfolio.client": "العميل",
        "portfolio.date": "التاريخ",
        "portfolio.location": "الموقع",
        "portfolio.category": "الفئة",
        "portfolio.close": "إغلاق",
        "portfolio.noProjects": "لم يتم العثور على مشاريع في هذه الفئة",
        "portfolio.categories.all": "الكل",

        // Profil
        "profile.contact": "اتصل",
        "profile.viewPortfolio": "عرض الأعمال",
        "profile.reviews": "تقييمات",
        "profile.tabs.services": "الخدمات",
        "profile.tabs.reviews": "التقييمات",
        "profile.tabs.certifications": "الشهادات",
        "profile.tabs.info": "معلومات",
        "profile.contactInfo": "معلومات الاتصال",
        "profile.socialMedia": "وسائل التواصل الاجتماعي",
        "profile.languages": "اللغات",
        "profile.availability": "التوفر",
        "profile.requestService": "طلب هذه الخدمة",
        "profile.serviceReviews": "تقييمات هذه الخدمة",
        "profile.noReviews": "لا توجد تقييمات لهذه الخدمة",
        "profile.contactArtisan": "اتصل بالحرفي",
        "profile.contactDescription": "أرسل رسالة إلى {name} لمناقشة احتياجاتك أو طلب عرض سعر.",
        "profile.form.name": "اسمك",
        "profile.form.email": "بريدك الإلكتروني",
        "profile.form.phone": "هاتفك",
        "profile.form.message": "رسالتك",
        "profile.cancel": "إلغاء",
        "profile.send": "إرسال",
        "profile.close": "إغلاق",
        "profile.contactSuccess": "تم إرسال رسالتك بنجاح!",
        "profile.stats.experience": "سنوات الخبرة",
        "profile.stats.completedJobs": "المشاريع المنجزة",
        "profile.stats.rating": "متوسط التقييم",
        "profile.stats.responseTime": "وقت الاستجابة",
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