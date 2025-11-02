// src/components/splash/FloatingElements.jsx
export default function FloatingElements({ fadeOut }) {
  return (
    <>
      <div className={`absolute top-16 sm:top-20 left-6 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-blue-200/30 rounded-full blur-2xl sm:blur-3xl animate-pulse transition-all duration-1000 ${
        fadeOut ? 'opacity-0 translate-y-4' : 'opacity-100'
      }`} />
      <div className={`absolute bottom-28 sm:bottom-32 right-8 sm:right-12 w-20 sm:w-24 h-20 sm:h-24 bg-blue-300/20 rounded-full blur-xl sm:blur-2xl animate-pulse transition-all duration-1000 ${
        fadeOut ? 'opacity-0 translate-y-4' : 'opacity-100'
      }`} style={{ animationDelay: '1s' }} />
      <div className={`absolute top-1/3 right-4 sm:right-8 w-12 sm:w-16 h-12 sm:h-16 bg-indigo-200/20 rounded-full blur-lg sm:blur-xl animate-pulse transition-all duration-1000 ${
        fadeOut ? 'opacity-0 translate-y-4' : 'opacity-100'
      }`} style={{ animationDelay: '2.5s' }} />
      <div className={`absolute bottom-1/4 left-4 sm:left-6 w-16 sm:w-20 h-16 sm:h-20 bg-blue-100/40 rounded-full blur-xl sm:blur-2xl animate-pulse transition-all duration-1000 ${
        fadeOut ? 'opacity-0 translate-y-4' : 'opacity-100'
      }`} style={{ animationDelay: '3s' }} />
    </>
  );
}