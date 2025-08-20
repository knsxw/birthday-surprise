"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, Camera } from "lucide-react";
import { InteractiveGallery } from "@/components/interactive-gallery";
import { ConfettiEffect } from "@/components/confetti-effect";
import { MessageCard } from "@/components/message-card";
import { BirthdayCountdown } from "@/components/birthday-countdown";
import { HeartPhotoFrame } from "@/components/heart-photo-frame"; // Added heart photo frame import

type Theme = "purple" | "green" | "pink" | "blue";

export default function BirthdaySurprise() {
  const [showGallery, setShowGallery] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [theme, setTheme] = useState<Theme>("purple");
  const [countdownComplete, setCountdownComplete] = useState(false); // Added state to track countdown completion

  const birthdayDate = "2025-08-22T00:00:00+07:00";

  const messages = [
    "You light up my life every single day ✨",
    "Here's to many more adventures together 🌟",
    "You make every moment magical 💫",
    "My heart belongs to you forever 💕",
  ];

  const themeConfig = {
    purple: {
      bg: "bg-gradient-to-br from-purple-50 via-white to-purple-100",
      primary: "text-purple-800",
      secondary: "text-purple-600",
      hearts: "text-purple-200",
      button: "bg-purple-800 hover:bg-purple-700",
      buttonOutline: "border-purple-300 text-purple-800 hover:bg-purple-50",
      card: "border-purple-200",
      icon: "text-purple-600",
    },
    green: {
      bg: "bg-gradient-to-br from-green-50 via-white to-green-100",
      primary: "text-green-800",
      secondary: "text-green-600",
      hearts: "text-green-200",
      button: "bg-green-800 hover:bg-green-700",
      buttonOutline: "border-green-300 text-green-800 hover:bg-green-50",
      card: "border-green-200",
      icon: "text-green-600",
    },
    pink: {
      bg: "bg-gradient-to-br from-pink-50 via-white to-pink-100",
      primary: "text-pink-800",
      secondary: "text-pink-600",
      hearts: "text-pink-200",
      button: "bg-pink-800 hover:bg-pink-700",
      buttonOutline: "border-pink-300 text-pink-800 hover:bg-pink-50",
      card: "border-pink-200",
      icon: "text-pink-600",
    },
    blue: {
      bg: "bg-gradient-to-br from-blue-50 via-white to-blue-100",
      primary: "text-blue-800",
      secondary: "text-blue-600",
      hearts: "text-blue-200",
      button: "bg-blue-800 hover:bg-blue-700",
      buttonOutline: "border-blue-300 text-blue-800 hover:bg-blue-50",
      card: "border-blue-200",
      icon: "text-blue-600",
    },
  };

  const currentTheme = themeConfig[theme];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  const handleCelebrate = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowGallery(true);
    }, 1000);
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  };

  const handleCountdownComplete = () => {
    setCountdownComplete(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  };

  if (showGallery) {
    return <InteractiveGallery onBack={() => setShowGallery(false)} />;
  }

  if (!countdownComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <BirthdayCountdown
            targetDate={birthdayDate}
            onComplete={handleCountdownComplete}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${currentTheme.bg} relative overflow-hidden transition-all duration-1000`}
    >
      {showConfetti && <ConfettiEffect />}

      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute ${currentTheme.hearts} opacity-20 float transition-colors duration-1000`}
            size={24}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <div className="mb-12">
            <h1
              className={`text-6xl md:text-8xl font-serif font-black ${currentTheme.primary} mb-4 heart-pulse transition-colors duration-1000`}
            >
              Happy Birthday 🥳
            </h1>
            <h2
              className={`text-4xl md:text-6xl font-serif font-black ${currentTheme.secondary} mb-6 transition-colors duration-1000`}
            >
              My Love! 💕
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 font-sans max-w-2xl mx-auto leading-relaxed">
              Today is all about celebrating the most amazing person in my life.
              You deserve all the love and happiness in the world.
            </p>
          </div>

          {/* Heart-framed photos section */}
          <div className="mb-12">
            <h3
              className={`text-2xl font-serif font-bold ${currentTheme.primary} mb-6 transition-colors duration-1000`}
            >
              My Beautiful Love
            </h3>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <HeartPhotoFrame
                src="/pepperlunch.jpg"
                alt="My girlfriend cute photo"
                size="lg"
                className="animate-bounce delay-100"
              />
              <HeartPhotoFrame
                src="/art_workshop.jpg"
                alt="Her infectious laugh"
                size="md"
                className="animate-bounce delay-300"
              />
              <HeartPhotoFrame
                src="/ananda.jpg"
                alt="Happy moments together"
                size="lg"
                className="animate-bounce delay-500"
              />
            </div>
          </div>

          {/* Rotating messages */}
          <div className="mb-12">
            <MessageCard message={messages[currentMessage]} />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={handleCelebrate}
              size="lg"
              className={`${currentTheme.button} text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg`}
            >
              <Sparkles className="mr-2" size={20} />
              Let's Celebrate!
            </Button>

            <Button
              onClick={() => setShowGallery(true)}
              variant="outline"
              size="lg"
              className={`${currentTheme.buttonOutline} px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105`}
            >
              <Camera className="mr-2" size={20} />
              View Our Memories
            </Button>
          </div>

          {/* Special message cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card
              className={`p-6 bg-white/80 backdrop-blur-sm ${currentTheme.card} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="text-center">
                <Heart
                  className={`mx-auto mb-4 ${currentTheme.icon} transition-colors duration-1000`}
                  size={32}
                />
                <h3
                  className={`text-xl font-serif font-bold ${currentTheme.primary} mb-3 transition-colors duration-1000`}
                >
                  You're Special
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Your smile brightens my darkest days, your laugh is my
                  favorite sound, and your love makes everything possible. You
                  are my sunshine, my anchor, and my greatest adventure.
                </p>
              </div>
            </Card>

            <Card
              className={`p-6 bg-white/80 backdrop-blur-sm ${currentTheme.card} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="text-center">
                <Sparkles
                  className={`mx-auto mb-4 ${currentTheme.icon} transition-colors duration-1000`}
                  size={32}
                />
                <h3
                  className={`text-xl font-serif font-bold ${currentTheme.primary} mb-3 transition-colors duration-1000`}
                >
                  My Birthday Wish
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  I wish for you to always know how deeply you are loved, how
                  much joy you bring to me, and how grateful I am to share this
                  beautiful life with you.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
