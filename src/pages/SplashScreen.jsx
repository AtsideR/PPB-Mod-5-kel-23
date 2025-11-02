// src/pages/SplashScreen.jsx
import React, { useState, useEffect } from 'react';
import BackgroundPattern from '../components/splash/BackgroundPattern';
import FloatingElements from '../components/splash/FloatingElements';
import LogoContainer from '../components/splash/LogoContainer';
import TitleSection from '../components/splash/TitleSection';
import LoadingAnimation from '../components/splash/LoadingAnimation';
import Footer from '../components/splash/Footer';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 100);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              setIsVisible(false);
              setTimeout(() => {
                if (typeof onComplete === 'function') onComplete();
              }, 100);
            }, 600);
          }, 800);
          return 100;
        }
        const nextProgress = prev + 6;
        return nextProgress > 100 ? 100 : nextProgress;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 sm:px-6 transition-all duration-600 ease-out ${
        !fadeIn ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      } ${
        fadeOut ? 'opacity-0 scale-105' : ''
      }`}
    >
      
      <BackgroundPattern fadeOut={fadeOut} />
      <FloatingElements fadeOut={fadeOut} />
      
      <div className={`relative z-10 flex flex-col items-center justify-center max-w-xs sm:max-w-lg w-full transition-all duration-800 ${
        !fadeIn ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
      } ${
        fadeOut ? 'opacity-0 -translate-y-8' : ''
      }`}>
        
        <LogoContainer />
        <TitleSection fadeIn={fadeIn} />
        <LoadingAnimation fadeIn={fadeIn} progress={progress} />
        
      </div>

      <Footer fadeOut={fadeOut} fadeIn={fadeIn} />
    </div>
  );
}