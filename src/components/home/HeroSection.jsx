// src/components/home/HeroSection.jsx
import { ChefHat, Play, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen md:min-h-[85vh] flex items-center">
        
      <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-12 w-32 h-32 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-8 w-24 h-24 bg-gradient-to-r from-cyan-200/30 to-blue-200/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2.5s' }} />
      <div className="absolute bottom-1/4 left-16 w-20 h-20 bg-gradient-to-r from-indigo-200/25 to-blue-200/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-blue-300/15 to-purple-300/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />

      <div className="md:hidden relative z-10 w-full px-4 py-8 text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-medium text-slate-800 mb-2">
            Selamat datang di
          </h2>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 transform -skew-y-1 rounded-lg opacity-80"></div>
            <h1 className="relative text-2xl font-bold text-slate-800 px-4 py-2">
              Resep Nusantara
            </h1>
          </div>
          <p className="text-slate-600 text-base mb-4 mt-4">Warisan Kuliner Indonesia</p>
          <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
            Temukan ribuan resep autentik dari seluruh Nusantara. Dari masakan tradisional hingga kreasi modern.
          </p>
        </div>

        <div className="mb-8 max-w-xs mx-auto">
          <div className="space-y-3">
            {/* Top Image - Mobile Grid */}
            <div className="relative group">
              <div className="bg-white/15 backdrop-blur-2xl border border-white/25 rounded-2xl overflow-hidden shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105">
                <div className="w-full h-40 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Featured Recipe"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Images - Mobile Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative group">
                <div className="bg-white/15 backdrop-blur-2xl border border-white/25 rounded-2xl overflow-hidden shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-500 hover:scale-105">
                  <div className="w-full h-20 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=150&fit=crop&crop=center"
                      alt="Featured Recipe 2"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="bg-white/15 backdrop-blur-2xl border border-white/25 rounded-2xl overflow-hidden shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105">
                  <div className="w-full h-20 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=150&fit=crop&crop=center"
                      alt="Featured Drink"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3 max-w-xs mx-auto">
          <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm">
            <ChefHat className="w-4 h-4" />
            <span>Jelajahi Resep</span>
          </button>
          <button className="bg-white/25 backdrop-blur-xl border border-white/40 text-slate-700 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm">
            <Play className="w-4 h-4" />
            <span>Video Tutorial</span>
          </button>
        </div>
      </div>

      <div className="hidden md:block relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mb-10">
              <h2 className="text-5xl lg:text-6xl font-medium text-slate-800 mb-4">
                Selamat datang di
              </h2>
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 transform -skew-y-1 rounded-xl opacity-80"></div>
                <h1 className="relative text-5xl lg:text-6xl font-semibold text-slate-800 px-6 py-3 whitespace-nowrap">
                  Resep Nusantara
                </h1>
              </div>
              <p className="text-2xl text-slate-600 mb-8">Warisan Kuliner Indonesia</p>
              <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
                Temukan ribuan resep autentik dari seluruh Nusantara. Dari masakan tradisional hingga kreasi modern yang menggugah selera.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-10 py-5 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 text-lg">
                <ChefHat className="w-6 h-6" />
                <span>Jelajahi Resep</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white/25 backdrop-blur-xl border border-white/40 text-slate-700 px-10 py-5 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 text-lg">
                <Play className="w-6 h-6" />
                <span>Video Tutorial</span>
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative max-w-2xl mx-auto lg:max-w-2xl">
            <div className="space-y-6">
              <div className="relative group">
                <div className="bg-white/15 backdrop-blur-2xl border border-white/25 rounded-3xl overflow-hidden shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105">
                  <div className="w-full h-80 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Featured Recipe"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Images */}
              <div className="grid grid-cols-2 gap-6">
                <div className="relative group">
                  <div className="bg-white/15 backdrop-blur-2xl border border-white/25 rounded-3xl overflow-hidden shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-500 hover:scale-105">
                    <div className="w-full h-40 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop&crop=center"
                        alt="Featured Recipe 2"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="bg-white/15 backdrop-blur-2xl border border-white/25 rounded-3xl overflow-hidden shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105">
                    <div className="w-full h-40 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=250&fit=crop&crop=center"
                        alt="Featured Drink"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}