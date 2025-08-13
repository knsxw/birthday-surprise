"use client";

import { Heart } from "lucide-react";

interface HeartPhotoFrameProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function HeartPhotoFrame({
  src,
  alt,
  size = "md",
  className = "",
}: HeartPhotoFrameProps) {
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-40 h-40",
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Heart frame background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Heart
          className="w-full h-full text-pink-400 fill-pink-400 drop-shadow-lg"
          strokeWidth={1.5}
        />
      </div>

      {/* Photo inside heart */}
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md">
          <img
            src={src || "/placeholder.svg"}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Sparkle effects */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-300 rounded-full animate-pulse delay-500"></div>
    </div>
  );
}
