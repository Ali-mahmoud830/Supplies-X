'use client';

import { useState, useEffect } from 'react';

const slides = [
  // Slide 1: Corporate Staffing & Labor Supply
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2000&auto=format&fit=crop",
  // Slide 2: Commercial Real Estate & Spaces
  "https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?q=80&w=2000&auto=format&fit=crop",
  // Slide 3: General Logistics & High-Value Supply
  "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2000&auto=format&fit=crop"
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
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
      {/* Slideshow Images */}
      {slides.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Industrial Slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Ultra-Premium Blur & Overlay System */}
      {/* 1. Precise backdrop tint layer */}
      <div className="absolute inset-0 bg-slate-950/75 mix-blend-multiply"></div>
      
      {/* 2. Soft radial-gradient mask for cinematic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6))]"></div>
      
      {/* 3. Bottom fade for smooth transition to next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </div>
  );
}
