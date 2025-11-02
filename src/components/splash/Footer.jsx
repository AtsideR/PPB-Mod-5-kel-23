// src/components/splash/Footer.jsx
export default function Footer({ fadeOut, fadeIn }) {
  return (
    <>
      <div className={`absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-white/50 to-transparent backdrop-blur-sm border-t border-white/20 transition-opacity duration-800 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`} />
      
      <div className={`absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-center transition-all duration-1000 ${
        !fadeIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      } ${
        fadeOut ? 'opacity-0 translate-y-4' : ''
      }`} style={{ transitionDelay: '1000ms' }}>

        <div className="flex justify-center space-x-0.5 sm:space-x-1 mb-2 sm:mb-3">
          <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse" />
          <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '600ms' }} />
        </div>
        
        <p className="text-slate-500 text-xs xs:text-sm font-medium tracking-wide xs:tracking-widest mb-1.5 sm:mb-2 transform transition-all duration-500 hover:text-slate-600 hover:tracking-wider px-2">
          Versi 1.0 - © 2025 Resep Nusantara
        </p>
        
        <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto rounded-full animate-pulse opacity-80" />
        
        <div className="absolute -top-1.5 sm:-top-2 -left-3 sm:-left-4 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-blue-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '2s' }} />
        <div className="absolute -top-0.5 sm:-top-1 -right-3 sm:-right-4 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-indigo-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '2.5s' }} />
      </div>
    </>
  );
}