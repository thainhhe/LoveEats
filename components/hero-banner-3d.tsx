'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroSlides } from '@/lib/data';

interface ParallaxOffset {
  x: number;
  y: number;
}

export function HeroBanner3D() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Countdown timer for demo (48 hours from now)
  useEffect(() => {
    const targetTime = new Date().getTime() + 48 * 60 * 60 * 1000;
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

    setParallaxOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index % heroSlides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const slide = heroSlides[currentSlide];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background images with Ken Burns effect */}
      {heroSlides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            className="object-cover"
            priority={index === 0}
            style={{
              transform: index === currentSlide 
                ? `scale(1.05) translate(${parallaxOffset.x * 0.3}px, ${parallaxOffset.y * 0.3}px)`
                : 'scale(1)',
              transition: 'transform 0.3s ease-out',
            }}
          />
        </div>
      ))}

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float 6s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4"
        style={{
          transform: `perspective(1000px) rotateX(${parallaxOffset.y * 0.05}deg) rotateY(${parallaxOffset.x * 0.05}deg)`,
        }}
      >
        <div className="text-center space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            {slide.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 drop-shadow-md max-w-2xl">
            {slide.subtitle}
          </p>

          {/* Countdown banner */}
          <div className="inline-block bg-primary/90 backdrop-blur-md text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-lg">
            Valentine Special: {timeLeft}
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-primary hover:bg-accent text-white mt-4 md:mt-6 shadow-lg hover:shadow-xl transition-all"
          >
            Book Now
          </Button>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 transition-all rounded-full ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 w-2 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            opacity: 0;
            transform: translateY(100vh) translateX(0);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-100vh) translateX(100px);
          }
        }
      `}</style>
    </div>
  );
}
