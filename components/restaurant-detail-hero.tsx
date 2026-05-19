'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Restaurant } from '@/lib/types';

interface RestaurantDetailHeroProps {
  restaurant: Restaurant;
}

export function RestaurantDetailHero({ restaurant }: RestaurantDetailHeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrollY(offset);
      setIsSticky(offset > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Parallax Hero Section */}
      <div className="relative h-[500px] md:h-[600px] bg-black overflow-hidden">
        {/* Parallax Background Image */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-background" />

        {/* Floating Back Button (Top-left) */}
        <div className="absolute top-6 left-6 z-20">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Floating Share Button (Top-right) */}
        <div className="absolute top-6 right-6 z-20">
          <Button
            size="icon"
            className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md"
            onClick={() => alert('Share functionality')}
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Content Card (Floating) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-t-3xl shadow-2xl p-6 md:p-8">
            <div className="space-y-4">
              {/* Title and Cuisine */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  {restaurant.name}
                </h1>
                <p className="text-lg text-secondary font-semibold mt-2">
                  {restaurant.cuisine}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 flex-wrap pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(restaurant.rating)
                            ? 'fill-secondary text-secondary'
                            : 'text-border'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-lg">{restaurant.rating}</span>
                  <span className="text-muted-foreground">
                    ({restaurant.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Info Bar (appears on scroll) */}
      {isSticky && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg text-foreground">{restaurant.name}</h2>
              <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-secondary text-secondary" />
                <span className="font-semibold text-sm">{restaurant.rating}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
