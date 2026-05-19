export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  minOrder: number;
  tags: string[];
  description: string;
  phone: string;
  address: string;
  hours: string;
  specials?: string[];
  menu?: MenuCategory[];
  heroImage?: string;
}

export interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: string;
  validity: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface BookingRequest {
  restaurantId: string;
  restaurantName: string;
  date: Date;
  time: string;
  guests: number;
  specialRequests: string[];
  totalPrice: number;
}
