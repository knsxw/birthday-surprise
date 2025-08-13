"use client"

import { useState } from "react"

interface GrowingTreeProps {
  onThemeChange: (theme: "purple" | "green" | "pink" | "blue") => void
}

export function GrowingTree({ onThemeChange }: GrowingTreeProps) {
  const [isGrowing, setIsGrowing] = useState(false)
  const [growthStage, setGrowthStage] = useState(0)

  const themes = ["purple", "green", "pink", "blue"] as const

  const handleTreeClick = () => {
    if (isGrowing) return

    setIsGrowing(true)

    // Animate growth stages
    const stages = [1, 2, 3, 4, 5]
    stages.forEach((stage, index) => {
      setTimeout(() => {
        setGrowthStage(stage)
        if (stage === 5) {
          // Change theme when tree is fully grown
          const randomTheme = themes[Math.floor(Math.random() * themes.length)]
          onThemeChange(randomTheme)

          // Reset after animation
          setTimeout(() => {
            setIsGrowing(false)
            setGrowthStage(0)
          }, 1000)
        }
      }, index * 300)
    })
  }

  return (
    <div className="flex flex-col items-center">
      <div className="cursor-pointer transition-transform hover:scale-105" onClick={handleTreeClick}>
        <svg width="120" height="160" viewBox="0 0 120 160" className="tree-svg">
          {/* Tree trunk */}
          <rect
            x="55"
            y="120"
            width="10"
            height="40"
            fill="#8B4513"
            className={`transition-all duration-300 ${isGrowing ? "animate-pulse" : ""}`}
          />

          {/* Tree layers - grow from bottom to top */}
          {growthStage >= 1 && (
            <circle
              cx="60"
              cy="130"
              r="15"
              fill="#228B22"
              className="animate-tree-grow"
              style={{ animationDelay: "0ms" }}
            />
          )}

          {growthStage >= 2 && (
            <circle
              cx="60"
              cy="115"
              r="18"
              fill="#32CD32"
              className="animate-tree-grow"
              style={{ animationDelay: "300ms" }}
            />
          )}

          {growthStage >= 3 && (
            <circle
              cx="60"
              cy="95"
              r="20"
              fill="#228B22"
              className="animate-tree-grow"
              style={{ animationDelay: "600ms" }}
            />
          )}

          {growthStage >= 4 && (
            <circle
              cx="60"
              cy="75"
              r="22"
              fill="#32CD32"
              className="animate-tree-grow"
              style={{ animationDelay: "900ms" }}
            />
          )}

          {growthStage >= 5 && (
            <>
              <circle
                cx="60"
                cy="55"
                r="25"
                fill="#228B22"
                className="animate-tree-grow"
                style={{ animationDelay: "1200ms" }}
              />
              {/* Flowers/fruits when fully grown */}
              <circle cx="45" cy="60" r="3" fill="#FF69B4" className="animate-bounce" />
              <circle
                cx="75"
                cy="65"
                r="3"
                fill="#FF1493"
                className="animate-bounce"
                style={{ animationDelay: "200ms" }}
              />
              <circle
                cx="50"
                cy="80"
                r="3"
                fill="#FF69B4"
                className="animate-bounce"
                style={{ animationDelay: "400ms" }}
              />
              <circle
                cx="70"
                cy="85"
                r="3"
                fill="#FF1493"
                className="animate-bounce"
                style={{ animationDelay: "600ms" }}
              />
            </>
          )}
        </svg>
      </div>

      <p className="text-sm text-gray-600 mt-2 font-sans">
        {isGrowing ? "Growing..." : "Click the tree to grow it! 🌱"}
      </p>
    </div>
  )
}
