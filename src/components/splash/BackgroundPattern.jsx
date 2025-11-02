// src/components/splash/BackgroundPattern.jsx
import { useMemo } from 'react';

export default function BackgroundPattern({ fadeOut }) {
  const patternDataUri = useMemo(() => {
    const svg = `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#3B82F6" fill-opacity="0.05"><rect x="0" y="0" width="20" height="20"/><rect x="20" y="20" width="20" height="20"/></g></g></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

  return (
    <div
      className={`absolute inset-0 opacity-30 transition-opacity duration-800 ${
        fadeOut ? 'opacity-0' : ''
      }`}
      style={{
        backgroundImage: patternDataUri,
        backgroundRepeat: 'repeat',
      }}
      aria-hidden
    />
  );
}