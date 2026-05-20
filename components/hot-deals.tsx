'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { restaurants } from '@/lib/data';
import { Restaurant } from '@/lib/types';

export function HotDeals() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [deals, setDeals] = useState<Restaurant[]>([]);

  useEffect(() => {
    const categoriesList = ['Hẹn hò vỉa hè', 'Hẹn hò sang trọng'];
    let selectedDeals: Restaurant[] = [];
    
    categoriesList.forEach(category => {
      const items = restaurants.filter(r => r.cuisine === category);
      const shuffled = [...items].sort(() => 0.5 - Math.random());
      selectedDeals = [...selectedDeals, ...shuffled.slice(0, 3)];
    });
    
    setDeals(selectedDeals);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('deals-container');
    if (!container) return;

    const scrollAmount = 300;
    const newPosition =
      direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;

    container.scrollLeft = newPosition;
    setScrollPosition(newPosition);
  };

  return (
    <section className="py-8 md:py-12 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Ưu đãi ngay hôm nay 🔥
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Limited time offers you won&apos;t want to miss
          </p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 hidden md:flex"
            onClick={() => handleScroll('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Carousel */}
          <div
            id="deals-container"
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {deals.map((deal) => (
              <div key={deal.id} className="flex-shrink-0 w-full sm:w-80">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-0">
                    {/* Background Image */}
                    <div className="h-32 relative overflow-hidden bg-muted">
                      <Image src={deal.image} alt={deal.name} fill className="object-cover" />
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-5">
                      <h3 className="font-bold text-lg text-foreground mb-1">
                        {deal.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {deal.specials?.[0] || 'Great offer available'}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <p className="text-muted-foreground">Rating</p>
                          <p className="font-bold text-foreground">{deal.rating} ⭐</p>
                        </div>
                        <Button className="bg-primary hover:bg-accent text-white">
                          Nhận ưu đãi
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 hidden md:flex"
            onClick={() => handleScroll('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
