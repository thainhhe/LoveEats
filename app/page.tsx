'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { HeroBanner3D } from '@/components/hero-banner-3d';
import { CategoryNav } from '@/components/category-nav';
import { HotDeals } from '@/components/hot-deals';
import { RestaurantCard } from '@/components/restaurant-card';
import { VoucherStrip } from '@/components/voucher-strip';
import { Footer } from '@/components/footer';
import { BookingModal } from '@/components/booking-modal';
// 👇 Nhớ import thêm categories
import { restaurants, categories } from '@/lib/data'; 
import { Restaurant } from '@/lib/types';

export default function Home() {
  // 👇 Đổi giá trị mặc định thành 'street-food'
  const [selectedCategory, setSelectedCategory] = useState<string>('street-food');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // 👇 Lấy ra object danh mục đang được chọn (để lấy được tên tiếng Việt)
  const activeCategory = categories.find(c => c.id === selectedCategory);

  // 👇 Lọc nhà hàng theo tên danh mục (cuisine === name)
  const filteredRestaurants = restaurants.filter(
    (r) => r.cuisine === activeCategory?.name
  );

  const featuredRestaurants = restaurants.slice(0, 2);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner */}
        <div className="px-4 md:px-6 lg:px-8 py-6">
          <HeroBanner3D />
        </div>

        {/* Category Navigation */}
        <CategoryNav
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Hot Deals */}
        <HotDeals />

        {/* Featured Restaurants Section */}
        <section className="py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Featured Restaurants
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Our top-rated romantic dining destinations
              </p>
            </div>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {featuredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  featured
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <button className="px-6 py-3 bg-primary hover:bg-accent text-white font-semibold rounded-lg transition-colors duration-200">
                View All Restaurants
              </button>
            </div>
          </div>
        </section>

        {/* All Restaurants Grid */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {/* 👇 Hiển thị tên danh mục đang chọn */}
                {activeCategory?.name || 'Restaurants'} 
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Browse available dining options
              </p>
            </div>

            {/* 👇 Hiển thị các nhà hàng đã được filter, thay vì remainingRestaurants */}
            {filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-border">
                <p className="text-lg font-medium text-foreground mb-2">Chưa có nhà hàng nào</p>
                <p className="text-muted-foreground">Chúng tôi đang cập nhật thêm các địa điểm cho mục này!</p>
              </div>
            )}
          </div>
        </section>

        {/* Vouchers */}
        <VoucherStrip />

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-accent">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready for a Romantic Dinner?
            </h2>
            <p className="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
              Reserve your perfect table now and create unforgettable memories with your special someone.
            </p>
            <button className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-muted transition-colors duration-200">
              Explore More Restaurants
            </button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Booking Modal */}
      {selectedRestaurant && (
        <BookingModal
          restaurant={selectedRestaurant}
          open={bookingModalOpen}
          onOpenChange={setBookingModalOpen}
        />
      )}
    </div>
  );
}