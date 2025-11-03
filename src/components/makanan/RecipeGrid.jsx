import { Clock, Star, ChefHat, Share2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import FavoriteButton from '../common/FavoriteButton';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Fungsi helper untuk toast kecil
const showToast = (message) => {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.className =
    'fixed bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm px-4 py-2 rounded-full shadow-lg animate-fadeIn z-[9999]';
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('animate-fadeOut');
    setTimeout(() => toast.remove(), 500);
  }, 2000);
};

// Fungsi untuk menangani share link
const handleShare = async (e, recipe) => {
  e.stopPropagation();
  e.preventDefault();

  const shareUrl = `${window.location.origin}/makanan/${recipe.id}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: recipe.name,
        text: `Cek resep lezat "${recipe.name}" di Resep Nusantara! 🍽️`,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      showToast('✅ Link resep disalin ke clipboard!');
    }
  } catch (error) {
    console.warn('Gagal membagikan:', error);
    showToast('⚠️ Gagal membagikan link.');
  }
};

export default function RecipeGrid({ recipes, onRecipeClick }) {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, recipes.length);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setTimeout(() => {
            setVisibleCards((prev) => new Set(prev).add(index));
          }, (index % 3) * 150);
        }
      });
    }, { threshold: 0.1 });

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, [recipes]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      {recipes.map((recipe, index) => (
        <div
          key={recipe.id}
          ref={(el) => (cardRefs.current[index] = el)}
          className={`group transform transition-all duration-700 ${
            visibleCards.has(index)
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          <div
            onClick={() => onRecipeClick && onRecipeClick(recipe.id)}
            className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl shadow-blue-500/5 hover:shadow-blue-500/15 transition-all duration-500 cursor-pointer group-hover:scale-105 group-hover:bg-white/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* ✅ Lazy Loaded Image */}
            <div className="relative h-32 md:h-56 overflow-hidden">
              <LazyLoadImage
                src={recipe.image_url}
                alt={recipe.name}
                effect="blur"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

              {/* Favorite & Share Buttons */}
              <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                <FavoriteButton recipeId={recipe.id} size="sm" />
                <button
                  onClick={(e) => handleShare(e, recipe)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/90 hover:bg-white text-slate-700 hover:text-blue-500 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
                  title="Bagikan resep"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Info Card */}
            <div className="relative z-10 p-4 md:p-8">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <span className="text-xs font-semibold text-blue-700 bg-blue-100/90 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                  Makanan
                </span>
                {recipe.average_rating > 0 && (
                  <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-current" />
                    <span className="text-xs md:text-sm font-semibold text-slate-700">
                      {recipe.average_rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 text-base md:text-xl group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                {recipe.name}
              </h3>

              <div className="flex items-center justify-between text-xs md:text-sm text-slate-600">
                <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                  <Clock className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="font-medium">{recipe.prep_time} mnt</span>
                </div>
                <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                  <ChefHat className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="font-medium capitalize">
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {recipes.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-500">
            Makanan tidak ditemukan. Coba kata kunci lain.
          </p>
        </div>
      )}
    </div>
  );
}
