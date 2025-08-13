"use client"

import { useEffect, useState } from "react"

interface ConfettiPiece {
  id: number
  left: number
  delay: number
  color: string
  size: number
}

export function ConfettiEffect() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const colors = ["#581c87", "#a855f7", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"]
    const pieces: ConfettiPiece[] = []

    for (let i = 0; i < 80; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2, // Reduced delay for faster start
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 6, // Made pieces slightly larger
      })
    }

    setConfetti(pieces)

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => clearTimeout(hideTimer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-pulse"
          style={{
            left: `${piece.left}%`,
            top: "-20px", // Start above viewport
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
            animation: `confetti-fall ${3 + Math.random() * 2}s linear ${piece.delay}s forwards`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  )
}
