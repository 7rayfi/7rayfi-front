"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface BackgroundAnimationProps {
    type: "login" | "register"
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ type }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Motifs marocains et outils d'artisanat
    const patterns = [
        // Motif zellige (étoile à 8 branches)
        (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
            ctx.save()
            ctx.translate(x, y)
            ctx.beginPath()
            for (let i = 0; i < 8; i++) {
                ctx.rotate(Math.PI / 4)
                ctx.lineTo(size, 0)
                ctx.lineTo(size * 0.7, size * 0.7)
            }
            ctx.closePath()
            ctx.fillStyle = color
            ctx.globalAlpha = 0.1
            ctx.fill()
            ctx.restore()
        },

        // Motif de poterie
        (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
            ctx.save()
            ctx.translate(x, y)
            ctx.beginPath()
            ctx.moveTo(-size / 2, -size / 3)
            ctx.bezierCurveTo(-size / 2, -size, size / 2, -size, size / 2, -size / 3)
            ctx.bezierCurveTo(size / 2, size / 3, size / 3, size / 2, 0, size / 2)
            ctx.bezierCurveTo(-size / 3, size / 2, -size / 2, size / 3, -size / 2, -size / 3)
            ctx.closePath()
            ctx.fillStyle = color
            ctx.globalAlpha = 0.1
            ctx.fill()
            ctx.restore()
        },

        // Motif de tapis
        (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
            ctx.save()
            ctx.translate(x, y)
            ctx.beginPath()
            ctx.rect(-size / 2, -size / 2, size, size)
            ctx.moveTo(-size / 4, -size / 2)
            ctx.lineTo(-size / 4, size / 2)
            ctx.moveTo(size / 4, -size / 2)
            ctx.lineTo(size / 4, size / 2)
            ctx.moveTo(-size / 2, -size / 4)
            ctx.lineTo(size / 2, -size / 4)
            ctx.moveTo(-size / 2, size / 4)
            ctx.lineTo(size / 2, size / 4)
            ctx.strokeStyle = color
            ctx.globalAlpha = 0.1
            ctx.lineWidth = 2
            ctx.stroke()
            ctx.restore()
        },

        // Marteau (outil d'artisan)
        (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
            ctx.save()
            ctx.translate(x, y)
            ctx.beginPath()
            // Manche
            ctx.rect(-size / 8, -size / 2, size / 4, size)
            // Tête
            ctx.rect(-size / 2, -size / 2, size, size / 3)
            ctx.fillStyle = color
            ctx.globalAlpha = 0.1
            ctx.fill()
            ctx.restore()
        },

        // Ciseaux (outil d'artisan)
        (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
            ctx.save()
            ctx.translate(x, y)
            ctx.beginPath()
            ctx.moveTo(-size / 2, -size / 2)
            ctx.lineTo(size / 2, size / 2)
            ctx.moveTo(-size / 2, size / 2)
            ctx.lineTo(size / 2, -size / 2)
            ctx.strokeStyle = color
            ctx.globalAlpha = 0.1
            ctx.lineWidth = 3
            ctx.stroke()
            ctx.restore()
        },
    ]

    // Couleurs marocaines traditionnelles
    const colors = [
        "#93441a", // Terracotta
        "#c67c4e", // Terre cuite
        "#0f4c81", // Bleu majorelle
        "#e6b35a", // Jaune safran
        "#7a9a01", // Vert olive
        "#b22222", // Rouge marocain
    ]

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Ajuster la taille du canvas à la fenêtre
        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        // Créer les éléments animés
        const elements: {
            x: number
            y: number
            vx: number
            vy: number
            size: number
            pattern: number
            color: string
            rotation: number
            rotationSpeed: number
        }[] = []

        // Nombre d'éléments selon le type de page
        const elementCount = type === "login" ? 15 : 20

        for (let i = 0; i < elementCount; i++) {
            elements.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 30 + 20,
                pattern: Math.floor(Math.random() * patterns.length),
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.01,
            })
        }

        // Animation
        let animationFrameId: number

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            elements.forEach((element) => {
                // Mettre à jour la position
                element.x += element.vx
                element.y += element.vy
                element.rotation += element.rotationSpeed

                // Rebondir sur les bords
                if (element.x < 0 || element.x > canvas.width) element.vx *= -1
                if (element.y < 0 || element.y > canvas.height) element.vy *= -1

                // Dessiner le motif
                ctx.save()
                ctx.translate(element.x, element.y)
                ctx.rotate(element.rotation)
                patterns[element.pattern](ctx, 0, 0, element.size, element.color)
                ctx.restore()
            })

            animationFrameId = window.requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener("resize", handleResize)
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [type])

    return (
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" style={{ backgroundColor: "#f8f4f1" }} />
    )
}

export default BackgroundAnimation
