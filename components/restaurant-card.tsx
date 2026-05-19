'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Star, MapPin, Clock } from 'lucide-react';
import { Restaurant } from '@/lib/types';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface RestaurantCardProps {
  restaurant: Restaurant;
  featured?: boolean;
}

interface Tilt {
  rotateX: number;
  rotateY: number;
}

export function RestaurantCard({ restaurant, featured }: RestaurantCardProps) {
  const [tilt, setTilt] = useState<Tilt>({ rotateX: 0, rotateY: 0 });
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

    setTilt({ rotateX: -y, rotateY: x });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <div
        className="h-full"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Card
          className="h-full overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
          }}
        >
          <CardContent className="p-0">
            {/* Image Container */}
            <div className="relative h-48 md:h-56 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden group">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {featured && (
                <div className="absolute top-3 right-3 z-10 bg-primary text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                  ✨ Featured
                </div>
              )}
            </div>

          {/* Content */}
            <div className="p-4 md:p-5 space-y-3">
              <div>
                <h3 className="font-bold text-base md:text-lg text-foreground line-clamp-1">
                  {restaurant.name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">{restaurant.cuisine}</p>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <span className="font-semibold text-sm text-foreground">{restaurant.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">({restaurant.reviewCount})</span>
              </div>

              {/* Info Row */}
              <div className="flex flex-wrap gap-3 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Min: {(restaurant.minOrder / 1000).toFixed(0)}k</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {restaurant.tags.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-secondary/20 text-secondary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Book Button */}
              <Button className="w-full bg-primary hover:bg-accent text-white text-sm">
                Book Table
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
