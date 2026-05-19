'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, MapPin, Clock, Phone } from 'lucide-react';
import { Header } from '@/components/header';
import { RestaurantDetailHero } from '@/components/restaurant-detail-hero';
import { BookingModal } from '@/components/booking-modal';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { restaurants } from '@/lib/data';
import { Restaurant } from '@/lib/types';

interface RestaurantDetailPageProps {
  params: {
    id: string;
  };
}

const reviews = [
  {
    id: 1,
    author: 'Nguyễn Minh Anh',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Amazing dinner for our anniversary! The service was impeccable and the food was delicious.',
  },
  {
    id: 2,
    author: 'Trần Thị Linh',
    rating: 4,
    date: '1 month ago',
    comment: 'Great ambiance and friendly staff. Food was good but a bit pricey.',
  },
  {
    id: 3,
    author: 'Phạm Quốc Anh',
    rating: 5,
    date: '2 months ago',
    comment: 'Perfect place for a romantic date. Highly recommended!',
  },
];

const menuCategories = [
  {
    name: 'Appetizers',
    items: [
      'Spring Rolls - 120k',
      'Dumpling Sampler - 150k',
      'Shrimp Toast - 140k',
    ],
  },
  {
    name: 'Main Courses',
    items: [
      'Premium Pho - 180k',
      'Grilled Salmon - 250k',
      'Special Ramen Bowl - 220k',
    ],
  },
  {
    name: 'Desserts',
    items: [
      'Mango Sticky Rice - 90k',
      'Tiramisu - 85k',
      'Green Tea Cheesecake - 95k',
    ],
  },
];

export default function RestaurantDetailPage({
  params,
}: RestaurantDetailPageProps) {
  const restaurant = restaurants.find((r) => r.id === params.id);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Restaurant not found
            </h1>
            <Link href="/">
              <Button className="bg-primary hover:bg-accent text-white">
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Parallax Hero */}
        <RestaurantDetailHero restaurant={restaurant} />

        {/* Key Info */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-8 md:py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Hours</p>
                  <p className="font-semibold text-foreground">
                    {restaurant.hours}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-semibold text-foreground text-sm">
                    {restaurant.address}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-semibold text-foreground text-sm">
                    {restaurant.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                className="flex-1 bg-primary hover:bg-accent text-white"
                onClick={() => setBookingModalOpen(true)}
              >
                Book a Table
              </Button>
              <Button variant="outline" className="flex-1">
                Call Restaurant
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <section className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
            <p className="text-foreground leading-relaxed">
              {restaurant.description}
            </p>
          </div>
        </section>

        {/* Menu */}
        <section className="bg-muted/30">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Menu</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {menuCategories.map((category) => (
                <Card key={category.name}>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg text-foreground mb-4">
                      {category.name}
                    </h3>
                    <ul className="space-y-3">
                      {category.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between text-sm text-foreground"
                        >
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Customer Reviews
            </h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-foreground">
                          {review.author}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {review.date}
                        </p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-secondary text-secondary'
                                : 'text-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-foreground text-sm">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="bg-gradient-to-r from-primary to-accent py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Dine Here?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Book your table now and enjoy a wonderful dining experience at{' '}
              {restaurant.name}
            </p>
            <Button
              className="bg-white text-primary hover:bg-secondary"
              onClick={() => setBookingModalOpen(true)}
            >
              Reserve Your Table
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Booking Modal */}
      <BookingModal
        restaurant={restaurant}
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
      />
    </div>
  );
}
