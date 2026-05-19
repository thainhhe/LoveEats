'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Clock, Phone } from 'lucide-react';
import { Header } from '@/components/header';
import { RestaurantDetailHero } from '@/components/restaurant-detail-hero';
import { BookingModal } from '@/components/booking-modal';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { restaurants, menuCategories } from '@/lib/data';

interface RestaurantDetailPageProps {
  params: Promise<{
    id: string;
  }>;
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

export default function RestaurantDetailPage({
  params,
}: RestaurantDetailPageProps) {
  const { id } = use(params);
  const restaurant = restaurants.find((r) => r.id === id);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('appetizers');

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

        {/* Photo Gallery */}
        <section className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 gap-2 h-64 md:h-80">
  {/* Ảnh 1: Bên trái */}
  <div className="relative rounded-l-xl overflow-hidden group cursor-pointer">
    <Image 
      src={restaurant.gallery?.[0] ?? restaurant.image} 
      fill 
      className="object-cover group-hover:scale-105 transition-transform duration-500" 
      alt="gallery-0" 
    />
  </div>

  {/* Ảnh 2: Bên phải kèm nút Xem tất cả */}
  <div className="relative rounded-r-xl overflow-hidden group cursor-pointer">
    <Image 
      src={restaurant.gallery?.[1] ?? restaurant.image} 
      fill 
      className="object-cover group-hover:scale-105 transition-transform duration-500" 
      alt="gallery-1" 
    />
    
  </div>
</div>
          </div>
        </section>

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

        {/* Specials/Offers badge strip */}
        {restaurant.specials && restaurant.specials.length > 0 && (
          <div className="bg-primary/5 border-y border-primary/10">
            <div className="container mx-auto px-4 py-4">
              <div className="flex gap-3 overflow-x-auto pb-1">
                {restaurant.specials.map((special, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-primary/20 rounded-full px-4 py-2 whitespace-nowrap flex-shrink-0">
                    <span className="text-primary text-xs">🎁</span>
                    <span className="text-sm text-foreground font-medium">{special}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Menu section */}
        

        {/* Reviews */}
        <section className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Customer Reviews
            </h2>

            {/* Rating summary */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-muted/50 rounded-xl">
              <div className="text-center">
                <p className="text-5xl font-bold text-foreground">{restaurant.rating}</p>
                <div className="flex gap-0.5 justify-center my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(restaurant.rating) ? 'fill-secondary text-secondary' : 'text-border'}`} />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{restaurant.reviewCount} reviews</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5,4,3,2,1].map((star) => (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-3 text-muted-foreground">{star}</span>
                    <Star className="w-3 h-3 fill-secondary text-secondary" />
                    <div className="flex-1 bg-border rounded-full h-1.5">
                      <div className="bg-secondary h-1.5 rounded-full"
                        style={{ width: star === 5 ? '65%' : star === 4 ? '20%' : star === 3 ? '10%' : '5%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-3">
                      {/* Avatar with initials */}
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold text-sm">
                          {review.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div className="flex-1">
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