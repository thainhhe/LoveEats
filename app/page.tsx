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
import { restaurants, categories } from '@/lib/data'; 
import { Restaurant } from '@/lib/types';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('street-food');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Tìm danh mục đang được chọn để lấy tên tiếng Việt
  const activeCategory = categories.find(c => c.id === selectedCategory);

  // Lọc nhà hàng theo danh mục
  const filteredRestaurants = restaurants.filter(
    (r) => r.cuisine === activeCategory?.name
  );

  // Lấy 2 nhà hàng đầu tiên làm nhà hàng nổi bật
  const featuredRestaurants = restaurants.slice(0, 2);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Banner chính */}
        <div className="px-4 md:px-6 lg:px-8 py-6">
          <HeroBanner3D />
        </div>

        {/* Thanh điều hướng danh mục */}
        <CategoryNav
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Ưu đãi hot */}
        <HotDeals />

        {/* Khu vực Nhà hàng Nổi bật */}
        <section className="py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Nhà hàng nổi bật
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Những địa điểm hẹn hò lãng mạn được đánh giá cao nhất từ khách hàng
              </p>
            </div>

            {/* Grid 2 cột */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {featuredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  featured
                />
              ))}
            </div>

            {/* Nút Xem tất cả */}
            <div className="text-center">
              <button className="px-6 py-3 bg-primary hover:bg-accent text-white font-semibold rounded-lg transition-colors duration-200">
                Xem tất cả nhà hàng
              </button>
            </div>
          </div>
        </section>

        {/* Khu vực Lọc toàn bộ nhà hàng theo Tab */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Danh sách: {activeCategory?.name || 'Nhà hàng'}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Khám phá các lựa chọn không gian ẩm thực phù hợp với bạn
              </p>
            </div>

            {/* Hiển thị danh sách sau khi lọc */}
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
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-lg font-medium text-foreground mb-2">Chưa có nhà hàng nào</p>
                <p className="text-muted-foreground">Chúng tôi đang cập nhật thêm các địa điểm tuyệt vời cho mục này!</p>
              </div>
            )}
          </div>
        </section>

        {/* Ưu đãi Vouchers */}
        <VoucherStrip />

        {/* Kêu gọi Đặt bàn (CTA) */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-accent">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Sẵn sàng cho một bữa tối lãng mạn?
            </h2>
            <p className="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
              Đặt ngay một bàn ăn hoàn hảo tại không gian mong muốn và tạo nên những kỷ niệm khó quên cùng người thương.
            </p>
            <button className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-muted transition-colors duration-200">
              Khám phá thêm không gian
            </button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal Đặt Bàn */}
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