// src/components/splash/TitleSection.jsx
export default function TitleSection({ fadeIn }) {
  return (
    <div className="text-center mb-12 sm:mb-16 px-2">
      <h1 className={`text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-1 sm:mb-2 tracking-tight leading-none transform transition-all duration-1000 hover:scale-105 ${
        !fadeIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        Resep
      </h1>
      <h2 className={`text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent -mt-2 sm:-mt-3 tracking-wide transform transition-all duration-1000 hover:scale-105 ${
        !fadeIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`} style={{ transitionDelay: '200ms' }}>
        Nusantara
      </h2>

      <div className={`relative mt-4 sm:mt-6 mb-6 sm:mb-8 transition-all duration-1000 ${
        !fadeIn ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
      }`} style={{ transitionDelay: '400ms' }}>
        <div className="w-20 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto rounded-full animate-pulse" />
        <div className="w-14 sm:w-16 h-0.5 bg-gradient-to-r from-blue-300 to-indigo-400 mx-auto mt-1 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '500ms' }} />
        <div className="w-6 sm:w-8 h-0.5 bg-blue-200 mx-auto mt-1 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <p className={`text-slate-600 text-sm xs:text-base sm:text-lg font-medium leading-relaxed max-w-xs mx-auto transform transition-all duration-1000 hover:text-slate-700 ${
        !fadeIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`} style={{ transitionDelay: '600ms' }}>
        Warisan Kuliner Indonesia<br />
        <span className="text-xs xs:text-sm font-normal text-slate-500">Tradisi Rasa Nusantara</span>
      </p>
    </div>
  );
}