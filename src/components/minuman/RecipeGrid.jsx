// src/components/minuman/RecipeGrid.jsx
import { Clock, Star, ChefHat, Share2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import FavoriteButton from '../common/FavoriteButton';

// Fungsi untuk menangani share
const handleShare = (e, recipe) => {
  e.stopPropagation();
  e.preventDefault();

  const shareUrl = `${window.location.origin}?recipe=${recipe.id}&category=minuman`;

  if (navigator.share) {
    navigator.share({
      title: recipe.name,
      text: `Cek resep segar "${recipe.name}" di Resep Nusantara!`,
      url: shareUrl,
    }).catch((error) => console.log('Error sharing:', error));
  } else {
    navigator.clipboard.writeText(shareUrl)
      .then(() => alert('Link resep disalin ke clipboard!'))
      .catch((err) => {
        console.error('Gagal menyalin: ', err);
        alert('Gagal menyalin link.');
      });
  }
};

// LazyLoadImage Component
function LazyLoadImage({ src, alt, className }) {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      className="relative w-full h-full bg-gray-200 overflow-hidden"
    >
      {isVisible && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <span className="text-gray-400 text-sm">Memuat...</span>
        </div>
      )}
    </div>
  );
}

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
            setVisibleCards(prev => new Set(prev).add(index));
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
          ref={el => cardRefs.current[index] = el}
          className={`group transform transition-all duration-700 ${
            visibleCards.has(index)
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          <div
            onClick={() => onRecipeClick && onRecipeClick(recipe.id)}
            className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl shadow-green-500/5 hover:shadow-green-500/15 transition-all duration-500 cursor-pointer group-hover:scale-105 group-hover:bg-white/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Lazy Load Gambar */}
            <div className="relative h-32 md:h-56 overflow-hidden">
              <LazyLoadImage
                src={recipe.image_url}
                alt={recipe.name}
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

            <div className="relative z-10 p-4 md:p-8">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <span className="text-xs font-semibold text-green-700 bg-green-100/90 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                  Minuman
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
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 text-base md:text-xl group-hover:text-green-600 transition-colors duration-200 line-clamp-2">
                {recipe.name}
              </h3>
              <div className="flex items-center justify-between text-xs md:text-sm text-slate-600">
                <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                  <Clock className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="font-medium">{recipe.prep_time} mnt</span>
                </div>
                <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                  <ChefHat className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="font-medium capitalize">{recipe.difficulty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
