import type React from "react"
import Navbar from "../components/Navbar"
import HeroSection from "../components/HeroSection"
import CategorySection from "../components/CategorySection"
import FeaturedServices from "../components/FeaturedServices"
import HowItWorks from "../components/HowItWorks"
import TestimonialsSection from "../components/TestimonialsSection"
import SubscriptionPlans from "../components/SubscriptionPlans"
import CTASection from "../components/CTASection"
import Footer from "../components/Footer"

const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <HeroSection />
                <CategorySection />
                <FeaturedServices />
                <HowItWorks />
                <TestimonialsSection />
                <SubscriptionPlans />
                <CTASection />
            </main>
            <Footer />
        </div>
    )
}

export default Home
