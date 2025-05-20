
import React from "react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "default";
}

export function StarRating({ rating, size = "default" }: StarRatingProps) {
  const sizeClass = size === "sm" ? "text-sm" : "";
  
  return (
    <div className={`flex ${sizeClass}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? "text-yellow-400" : "text-gray-400"}>
          {star <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export function CategoryStarRating({ 
  rating, 
  label 
}: { 
  rating: number; 
  label: string;
}) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm text-yellow-400">
        {"★".repeat(rating)}{"☆".repeat(5 - rating)}
      </div>
    </div>
  );
}
