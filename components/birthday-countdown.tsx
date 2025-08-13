"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Heart } from "lucide-react";

interface CountdownProps {
  targetDate: string; // Format: "2024-12-25" (YYYY-MM-DD)
  onComplete: () => void; // Added callback for when countdown completes
}

export function BirthdayCountdown({ targetDate, onComplete }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    isPast: false,
  });

  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setCurrentTime(new Date().toLocaleTimeString());
    tick(); // set initial time after mount
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isToday: false,
          isPast: false,
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true, // Always show as "today" when countdown completes
          isPast: false,
        });

        onComplete(); // Trigger the surprise reveal
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  if (timeLeft.isToday) {
    return (
      <Card className="p-8 bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200 rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="mb-4">
            <Heart className="mx-auto text-pink-500 animate-pulse" size={48} />
          </div>
          <h2 className="text-4xl font-serif font-bold text-pink-800 mb-2">
            🎉 IT'S YOUR BIRTHDAY! 🎉
          </h2>
          <p className="text-xl text-pink-600 font-medium">
            Today is your special day, my love!
          </p>
        </div>
      </Card>
    );
  }

  if (timeLeft.isPast) {
    return (
      <Card className="p-8 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200 rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="mb-4">
            <Calendar className="mx-auto text-purple-500" size={48} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-purple-800 mb-2">
            The countdown has ended
          </h2>
          <p className="text-lg text-purple-600">
            But the surprise is waiting for the right moment! 💕
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <Card className="p-12 bg-gradient-to-r from-white/95 to-purple-50/95 border-purple-200 rounded-3xl shadow-2xl backdrop-blur-sm max-w-4xl w-full">
        <div className="text-center">
          <div className="mb-8">
            <Clock
              className="mx-auto text-purple-500 animate-pulse"
              size={64}
            />
          </div>
          <h1 className="text-5xl font-serif font-bold text-purple-800 mb-2">
            Birthday Countdown
          </h1>
          <h2 className="text-2xl text-purple-600 mb-8">
            Get ready for something special! 🎂
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold mb-2 animate-pulse">
                {timeLeft.days}
              </div>
              <div className="text-lg font-medium opacity-90">Days</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold mb-2 animate-pulse">
                {timeLeft.hours}
              </div>
              <div className="text-lg font-medium opacity-90">Hours</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold mb-2 animate-pulse">
                {timeLeft.minutes}
              </div>
              <div className="text-lg font-medium opacity-90">Minutes</div>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform animate-bounce">
              <div className="text-6xl font-bold mb-2 animate-pulse">
                {timeLeft.seconds}
              </div>
              <div className="text-lg font-medium opacity-90">Seconds</div>
            </div>
          </div>

          <div className="mb-6 p-4 bg-white/50 rounded-xl">
            <p className="text-xl text-gray-700 font-medium">
              Current Time: {currentTime ?? ""}
            </p>
          </div>

          <p className="text-2xl text-purple-700 font-medium">
            Every second brings us closer to your special day! 💕
          </p>
        </div>
      </Card>
    </div>
  );
}
