"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Heart, X } from "lucide-react";
import { ConfettiEffect } from "@/components/confetti-effect";

interface GalleryItem {
  id: number;
  image: string;
  message: string;
  title: string;
}

interface InteractiveGalleryProps {
  onBack: () => void;
}

export function InteractiveGallery({ onBack }: InteractiveGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      image: "/on_the_beach_walking.jpeg",
      message:
        "Remember our first time on the beach? That's when I knew you were the one. 💕",
      title: "Our First Beach Walk",
    },
    {
      id: 2,
      image: "/dream_world.jpg",
      message:
        "Your laugh is my favorite sound in the world. This moment at dream world reminds me why I fall in love with you more each day. ❤️",
      title: "Adventures in Dreamworld",
    },
    {
      id: 3,
      image: "/cute.jpg",
      message: "You are my princess babe 🌟💃",
      title: "Dating My Princess",
    },
    {
      id: 4,
      image: "/basketball.jpg",
      message:
        "Even the simplest moments with you are magical. Playing together, laughing at our mistakes, creating memories. 🏀⛹🏻‍♀️",
      title: "Basketball Date",
    },
    {
      id: 5,
      image: "/riding_bike.jpg",
      message:
        "Every adventure is better with you by my side. Riding bikes, feeling the wind, and sharing smiles. 🚴‍♀️💖",
      title: "Biking Adventures",
    },
    {
      id: 6,
      image: "/explore.jpg",
      message:
        "Exploring new places with you is my favorite thing to do. Every corner holds a memory, every step brings us closer. 🌍❤️",
      title: "Exploering Together",
    },
  ];

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 relative">
      {showConfetti && <ConfettiEffect />}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={onBack}
              variant="outline"
              className="border-purple-300 text-purple-800 hover:bg-purple-50 rounded-full bg-transparent"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Celebration
            </Button>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-purple-800 text-center flex-1">
              Memories We Cherish
            </h1>
            <div className="w-32" /> {/* Spacer for centering */}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {galleryItems.map((item) => (
              <Card
                key={item.id}
                className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm"
                onClick={() => handleItemClick(item)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-serif font-bold text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm opacity-90">
                      Click to reveal our memory
                    </p>
                  </div>
                  <Heart
                    className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    size={24}
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Message overlay */}
          {selectedItem && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <Card className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="relative">
                  <img
                    src={selectedItem.image || "/placeholder.svg"}
                    alt={selectedItem.title}
                    className="w-full h-108 object-cover"
                  />
                  <Button
                    onClick={() => setSelectedItem(null)}
                    variant="outline"
                    size="sm"
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full"
                  >
                    <X size={16} />
                  </Button>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold text-purple-800 mb-4 text-center">
                    {selectedItem.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-center text-lg">
                    {selectedItem.message}
                  </p>
                  <div className="flex justify-center mt-6">
                    <Heart className="text-purple-600 heart-pulse" size={32} />
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
