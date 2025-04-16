"use client"

import type React from "react"
import { motion } from "framer-motion"

interface FloatingPatternsProps {
    count?: number
}

const FloatingPatterns: React.FC<FloatingPatternsProps> = ({ count = 5 }) => {
    // Motifs marocains SVG
    const patterns = [
        // Étoile à 8 branches (zellige)
        <svg viewBox="0 0 100 100" className="w-full h-full" key="zellige">
            <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="currentColor" />
        </svg>,

        // Motif géométrique simple
        <svg viewBox="0 0 100 100" className="w-full h-full" key="geometric">
            <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="5" />
            <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="3" />
            <rect x="40" y="40" width="20" height="20" fill="currentColor" />
        </svg>,

        // Motif floral stylisé
        <svg viewBox="0 0 100 100" className="w-full h-full" key="floral">
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="3" />
            <path d="M50 25 Q65 40 50 75 Q35 40 50 25" fill="currentColor" />
            <path d="M25 50 Q40 65 75 50 Q40 35 25 50" fill="currentColor" />
        </svg>,

        // Motif de poterie
        <svg viewBox="0 0 100 100" className="w-full h-full" key="pottery">
            <path d="M30 30 Q50 10 70 30 L70 70 Q50 90 30 70 Z" fill="none" stroke="currentColor" strokeWidth="3" />
            <path d="M40 40 Q50 30 60 40 L60 60 Q50 70 40 60 Z" fill="currentColor" />
        </svg>,

        // Motif de tapis
        <svg viewBox="0 0 100 100" className="w-full h-full" key="carpet">
            <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="3" />
            <line x1="10" y1="35" x2="90" y2="35" stroke="currentColor" strokeWidth="2" />
            <line x1="10" y1="65" x2="90" y2="65" stroke="currentColor" strokeWidth="2" />
            <line x1="35" y1="10" x2="35" y2="90" stroke="currentColor" strokeWidth="2" />
            <line x1="65" y1="10" x2="65" y2="90" stroke="currentColor" strokeWidth="2" />
        </svg>,
    ]

    // Générer des éléments flottants avec des positions et animations aléatoires
    const elements = Array.from({ length: count }, (_, i) => {
        const size = Math.floor(Math.random() * 60) + 40 // Taille entre 40 et 100px
        const top = Math.floor(Math.random() * 100) // Position verticale aléatoire
        const left = Math.floor(Math.random() * 100) // Position horizontale aléatoire
        const delay = Math.random() * 5 // Délai d'animation aléatoire
        const duration = Math.random() * 10 + 15 // Durée d'animation entre 15 et 25 secondes
        const patternIndex = Math.floor(Math.random() * patterns.length)

        // Couleurs marocaines traditionnelles avec faible opacité
        const colors = [
            "text-[#93441a]/10", // Terracotta
            "text-[#c67c4e]/10", // Terre cuite
            "text-[#0f4c81]/10", // Bleu majorelle
            "text-[#e6b35a]/10", // Jaune safran
            "text-[#7a9a01]/10", // Vert olive
            "text-[#b22222]/10", // Rouge marocain
        ]

        const color = colors[Math.floor(Math.random() * colors.length)]

        return (
            <motion.div
                key={i}
                className={`absolute ${color}`}
                style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                }}
                initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                animate={{
                    opacity: 0.7,
                    scale: [0.7, 1, 0.7],
                    rotate: 360,
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: duration,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: delay,
                }}
            >
                {patterns[patternIndex]}
            </motion.div>
        )
    })

    return <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">{elements}</div>
}

export default FloatingPatterns
