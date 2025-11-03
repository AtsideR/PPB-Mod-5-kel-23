// src/components/common/FavoriteButton.jsx
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useIsFavorited } from "../../hooks/useFavorites";

/**
 * FavoriteButton Component
 * Terhubung ke sistem favorit (ProfilePage)
 */
export default function FavoriteButton({
  recipeId,
  onToggle,
  showCount = false,
  initialCount = 0,
  size = "md",
}) {
  const { isFavorited, toggleFavorite, loading } = useIsFavorited(recipeId);

  const [favoriteCount, setFavoriteCount] = useState(initialCount);
  const [isAnimating, setIsAnimating] = useState(false);

  // Size variants
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  // Sinkronisasi jumlah favorit dari initialCount
  useEffect(() => {
    setFavoriteCount(initialCount);
  }, [initialCount]);

  const handleToggle = async (e) => {
    e.stopPropagation(); // Hindari trigger klik kartu

    if (loading) return;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    const result = await toggleFavorite(recipeId);
    if (result) {
      // Jika berhasil toggle, update jumlah
      setFavoriteCount((prev) => {
        if (isFavorited) return Math.max(0, prev - 1);
        else return prev + 1;
      });

      // Callback ke parent bila perlu
      if (onToggle) onToggle(recipeId, !isFavorited);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`
        ${sizes[size]} rounded-full flex items-center justify-center gap-1.5
        transition-all duration-200 
        ${
          isFavorited
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-white/90 hover:bg-white text-slate-700 hover:text-red-500"
        }
        backdrop-blur-sm shadow-md hover:shadow-lg
        ${isAnimating ? "scale-125" : "scale-100"}
        group
      `}
      title={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={`
          ${iconSizes[size]} 
          transition-all duration-200
          ${isFavorited ? "fill-current" : ""}
          ${isAnimating ? "animate-pulse" : ""}
        `}
      />
      {showCount && favoriteCount > 0 && (
        <span className="text-xs font-semibold">
          {favoriteCount > 999 ? "999+" : favoriteCount}
        </span>
      )}
    </button>
  );
}