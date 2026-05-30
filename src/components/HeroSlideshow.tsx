'use client';

import { useState, useEffect } from 'react';

const slides = [
  // Slide 1: Corporate Staffing & Labor Supply (Business/engineering team)
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
  // Slide 2: Commercial Real Estate & Infrastructure (Modern glass skyscrapers)
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
  // Slide 3: Heavy Logistics & Supply Chain (Global shipping & logistics)
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80"
];

export function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950 pointer-events-none">
      {/* Slideshow Images */}
      {slides.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Industrial Slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out z-0 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Ultra-Premium Blur & Overlay System (Z-10 to stay above images but below text) */}
      <div className="absolute inset-0 z-10 bg-slate-950/75 mix-blend-multiply"></div>
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6))]"></div>
      <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </div>
  );
}
