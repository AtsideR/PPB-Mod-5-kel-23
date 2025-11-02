// src/components/splash/LoadingAnimation.jsx
export default function LoadingAnimation({ fadeIn, progress }) {
  return (
    <div className={`w-full max-w-xs sm:max-w-sm transition-all duration-1000 ${
      !fadeIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
    }`} style={{ transitionDelay: '800ms' }}>
      <div className="relative mb-6 sm:mb-8">
        <div className="w-full h-3 sm:h-4 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl sm:rounded-2xl overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-xl sm:rounded-2xl transition-all duration-300 ease-out shadow-sm relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse opacity-50" />
            {progress < 100 && (
              <div className="absolute right-0 top-0 bottom-0 w-3 sm:w-4 bg-gradient-to-r from-transparent to-white/40 animate-pulse" />
            )}
          </div>
        </div>
       
        <div className="flex justify-between items-center mt-3 sm:mt-4">
          <span className="text-slate-600 text-xs xs:text-sm font-semibold">
            {progress < 100 ? 'Memuat aplikasi...' : 'Siap digunakan!'}
          </span>
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <span className="text-blue-600 text-xs xs:text-sm font-bold">{Math.min(progress, 100)}%</span>
            <div className={`w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-500 rounded-full ${
              progress < 100 ? 'animate-ping' : 'animate-pulse bg-green-500'
            }`} />
          </div>
        </div>
      </div>

      {/* Loading Dots */}
      <div className="flex justify-center space-x-2 sm:space-x-3">
        <div className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full shadow-md sm:shadow-lg transition-all duration-500 ${
          progress < 100 ? 'bg-blue-700 animate-bounce' : 'bg-green-400 animate-pulse'
        }`} style={{ animationDuration: '1s' }} />
        <div className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full shadow-md sm:shadow-lg transition-all duration-500 ${
          progress < 100 ? 'bg-blue-600 animate-bounce' : 'bg-green-500 animate-pulse'
        }`} style={{ animationDelay: '200ms', animationDuration: '1s' }} />
        <div className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full shadow-md sm:shadow-lg transition-all duration-500 ${
          progress < 100 ? 'bg-blue-500 animate-bounce' : 'bg-green-600 animate-pulse'
        }`} style={{ animationDelay: '400ms', animationDuration: '1s' }} />
        <div className={`w-2 sm:w-2 h-2 sm:h-2 rounded-full shadow-sm sm:shadow-md opacity-75 transition-all duration-500 ${
          progress < 100 ? 'bg-blue-400 animate-bounce' : 'bg-green-500 animate-pulse'
        }`} style={{ animationDelay: '600ms', animationDuration: '1.2s' }} />
        <div className={`w-2 sm:w-2 h-2 sm:h-2 rounded-full shadow-sm sm:shadow-md opacity-50 transition-all duration-500 ${
          progress < 100 ? 'bg-blue-300 animate-bounce' : 'bg-green-600 animate-pulse'
        }`} style={{ animationDelay: '800ms', animationDuration: '1.2s' }} />
      </div>
    </div>
  );
}