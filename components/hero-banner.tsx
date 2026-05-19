'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  showCountdown?: boolean;
  cta: string;
}

const slides: BannerSlide[] = [
  {
    id: 'valentine',
    title: 'Valentine Special',
    subtitle: 'Get 20% off romantic dinners',
    bgColor: 'bg-primary/10',
    textColor: 'text-primary',
    showCountdown: true,
    cta: 'Book Now',
  },
  {
    id: 'new-users',
    title: 'Welcome to LoveEats',
    subtitle: '50,000 VND off your first order',
    bgColor: 'bg-secondary/10',
    textColor: 'text-secondary',
    cta: 'Order Now',
  },
  {
    id: 'lunch-deal',
    title: 'Lunch Special',
    subtitle: 'Save 30% on orders 11AM-2PM',
    bgColor: 'bg-accent/10',
    textColor: 'text-accent',
    cta: 'See Deals',
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const futureDate = new Date(now.getTime() + 48 * 60 * 60 * 1000);
      
      const diff = futureDate.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };
    
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="w-full overflow-hidden bg-white">
      <div className={`${slide.bgColor} transition-colors duration-500 py-12 md:py-16`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            {/* Left Content */}
            <div className="flex-1 min-w-0">
              <h1 className={`${slide.textColor} text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-balance`}>
                {slide.title}
              </h1>
              <p className="text-foreground text-sm md:text-base mb-4 md:mb-6">
                {slide.subtitle}
              </p>
              
              {slide.showCountdown && (
                <div className="mb-4 md:mb-6 inline-block bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 md:px-6 md:py-3">
                  <p className="text-xs md:text-sm font-semibold text-primary">
                    Offer expires in: <span className="font-bold">{countdown}</span>
                  </p>
                </div>
              )}
              
              <Button className="bg-primary hover:bg-accent text-white">
                {slide.cta}
              </Button>
            </div>

            {/* Right Side - Controls and Dots */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 md:h-10 md:w-10"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              >
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              
              <div className="flex gap-1 md:gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 md:h-2.5 md:w-2.5 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-primary w-6 md:w-8'
                        : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 md:h-10 md:w-10"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              >
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
