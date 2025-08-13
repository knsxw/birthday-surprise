"use client"

import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"

interface MessageCardProps {
  message: string
}

export function MessageCard({ message }: MessageCardProps) {
  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm border-purple-200 rounded-2xl shadow-lg max-w-2xl mx-auto transition-all duration-500 transform">
      <div className="text-center">
        <Heart className="mx-auto mb-4 text-purple-600 heart-pulse" size={28} />
        <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">{message}</p>
      </div>
    </Card>
  )
}
