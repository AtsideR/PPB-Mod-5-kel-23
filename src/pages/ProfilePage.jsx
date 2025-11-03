import { useState, useRef, useEffect } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import userService from '../services/userService';
import reviewService from '../services/reviewService';
import { Camera, Edit3, Loader, Star, Clock, ChefHat, Heart } from 'lucide-react';
import ConfirmModal from '../components/modals/ConfirmModal';

// URL placeholder jika pengguna belum punya foto profil
const DEFAULT_AVATAR = 'https://avatar.vercel.sh/user.png?size=200';

// Komponen kecil untuk kartu resep (disederhanakan dari RecipeGrid)
function FavoriteRecipeCard({ recipe, onClick }) {
  const categoryColor = recipe.category === 'minuman' ? 'green' : 'blue';
  return (
    <div
      onClick={onClick}
      className={`group relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-3xl overflow-hidden shadow-lg shadow-${categoryColor}-500/5 hover:shadow-${categoryColor}-500/15 transition-all duration-500 cursor-pointer group-hover:scale-105`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image_url}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20" />
        <span
          className={`absolute top-3 left-3 text-xs font-semibold ${
            categoryColor === 'blue'
              ? 'text-blue-700 bg-blue-100/90'
              : 'text-green-700 bg-green-100/90'
          } px-3 py-1.5 rounded-full`}
        >
          {recipe.category}
        </span>
      </div>
      <div className="relative z-10 p-5">
        <h3 className="font-bold text-slate-800 text-lg mb-3 line-clamp-2 group-hover:text-blue-600">
          {recipe.name}
        </h3>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <div className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{recipe.prep_time} mnt</span>
          </div>
          <div className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full">
            <ChefHat className="w-4 h-4" />
            <span className="font-medium capitalize">{recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen utama Halaman Profil
export default function ProfilePage({ onRecipeClick }) {
  const [profile, setProfile] = useState(userService.getUserProfile());
  const [isEditingName, setIsEditingName] = useState(false);
  const [username, setUsername] = useState(profile.username);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const { favorites, loading: favLoading, error: favError } = useFavorites();

  // === Bagian Ulasan Saya ===
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setReviewsLoading(true);
        const data = await reviewService.getUserReviews(profile.userId);
        setReviews(data || []);
      } catch (err) {
        setReviewsError(err.message);
      } finally {
        setReviewsLoading(false);
      }
    }
    fetchReviews();
  }, [profile.userId]);

  // --- Handler untuk Fitur Profil ---
  const handleAvatarClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Format file harus .jpg, .jpeg, .png, atau .webp');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      const result = userService.updateAvatar(base64String);
      if (result.success) setProfile(result.data);
      else alert('Gagal memperbarui foto: ' + result.message);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleUsernameSave = () => {
    if (username.trim().length < 3) {
      alert('Nama pengguna minimal 3 karakter');
      return;
    }
    const result = userService.updateUsername(username);
    if (result.success) {
      setProfile(result.data);
      setIsEditingName(false);
    } else {
      alert('Gagal menyimpan nama: ' + result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* --- PROFIL PENGGUNA --- */}
        <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/40 mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative flex-shrink-0">
              <img
                src={profile.avatar || DEFAULT_AVATAR}
                alt="Foto Profil"
                className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
              />
              <button
                onClick={handleAvatarClick}
                disabled={isUploading}
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 transition-all hover:scale-110"
                title="Ganti Foto"
              >
                {isUploading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Camera className="w-5 h-5" />
                )}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/jpeg, image/png, image/webp"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan nama baru..."
                  />
                  <button
                    onClick={handleUsernameSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => setIsEditingName(false)}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300"
                  >
                    Batal
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <h1 className="text-3xl font-bold text-slate-800">
                    {profile.username}
                  </h1>
                  <button
                    onClick={() => {
                      setUsername(profile.username);
                      setIsEditingName(true);
                    }}
                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                    title="Edit Nama"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                </div>
              )}
              <p className="text-sm text-slate-500 mt-2 font-mono">ID: {profile.userId}</p>
            </div>
          </div>
        </div>

        {/* --- RESEP FAVORIT --- */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500" fill="currentColor" />
            Resep Favorit Saya
          </h2>

          {favLoading ? (
            <div className="text-center py-12">
              <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
              <p className="mt-4 text-slate-600">Memuat resep favorit...</p>
            </div>
          ) : favError ? (
            <div className="text-center py-12 bg-red-50 border border-red-200 rounded-2xl p-6">
              <p className="text-red-600 font-semibold">Terjadi Kesalahan</p>
              <p className="text-red-500">{favError}</p>
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/40">
              <h3 className="text-2xl font-semibold text-slate-700">Belum Ada Favorit</h3>
              <p className="text-slate-500 mt-2">Anda belum menambahkan resep apapun ke favorit.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {favorites.map((recipe) => (
                <FavoriteRecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => onRecipeClick(recipe.id, recipe.category)}
                />
              ))}
            </div>
          )}
        </div>

        {/* --- ULASAN SAYA --- */}
        <div className="max-w-7xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-500" fill="currentColor" />
            Ulasan Saya
          </h2>

          {reviewsLoading ? (
            <div className="text-center py-12">
              <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
              <p className="mt-4 text-slate-600">Memuat ulasan Anda...</p>
            </div>
          ) : reviewsError ? (
            <div className="text-center py-12 bg-red-50 border border-red-200 rounded-2xl p-6">
              <p className="text-red-600 font-semibold">Terjadi Kesalahan</p>
              <p className="text-red-500">{reviewsError}</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/40">
              <h3 className="text-2xl font-semibold text-slate-700">Belum Ada Ulasan</h3>
              <p className="text-slate-500 mt-2">
                Anda belum memberikan ulasan pada resep apapun.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/40 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-slate-800">
                      {review.recipe_name}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating ? 'fill-current' : 'stroke-current'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-slate-700 mb-3 italic">“{review.comment}”</p>
                  )}
                  <p className="text-sm text-slate-500">
                    {new Date(review.created_at).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
