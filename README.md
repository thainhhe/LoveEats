# LoveEats - Romantic Restaurant Booking Platform

A modern web application for discovering and booking romantic restaurants in Ho Chi Minh City. Built with Next.js 16, React 19, Tailwind CSS, and shadcn/ui components.

## Features

- **Home Page**: Hero banner with auto-sliding promotions, hot deals carousel, featured restaurants grid, and voucher offers
- **Restaurant Discovery**: Browse all restaurants with filtering by cuisine and rating
- **Search & Filter**: Advanced search with cuisine filtering, rating filters, and multiple sort options
- **Restaurant Details**: Comprehensive restaurant pages with menu, reviews, and booking information
- **Booking System**: Interactive booking modal with date/time selection, guest count stepper, and special requests with pricing
- **Booking Confirmation**: Detailed confirmation page with reservation details and next steps
- **Responsive Design**: Mobile-first design optimized for 375px, 768px, and 1280px viewports
- **Valentine Campaign**: Special countdown timer and Valentine's Day promotions

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Components**: shadcn/ui with Radix UI
- **Styling**: Tailwind CSS 4.2 with custom design tokens
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Date Handling**: date-fns and react-day-picker
- **Typography**: Geist font family

## Project Structure

```
app/
├── layout.tsx              # Root layout with metadata
├── globals.css             # Global styles and design tokens
├── page.tsx                # Home page
├── restaurant/[id]/page.tsx # Restaurant detail page
├── search/page.tsx         # Search results page
└── booking/
    └── confirmation/page.tsx # Booking confirmation page

components/
├── header.tsx              # Navigation header
├── hero-banner.tsx         # Auto-sliding banner with countdown
├── category-nav.tsx        # Cuisine category navigation
├── restaurant-card.tsx     # Restaurant card component
├── hot-deals.tsx          # Hot deals carousel
├── voucher-strip.tsx      # Voucher display section
├── booking-modal.tsx      # Booking form modal
├── footer.tsx             # Footer with links
└── ui/                    # shadcn/ui components

lib/
├── data.ts                # Mock restaurant and voucher data
└── types.ts               # TypeScript type definitions
```

## Design System

### Colors
- **Primary**: Deep Rose (#C0396B) - Main brand color
- **Secondary**: Warm Gold (#D4A843) - Accent and ratings
- **Accent**: Dark Plum (#2D1B33) - Footer and secondary actions
- **Neutral**: Soft Pink (#F9EEF3) - Background and light elements

### Typography
- **Headings**: Geist (font-sans)
- **Body**: Geist (font-sans)
- **Monospace**: Geist Mono (font-mono)

## Getting Started

### Prerequisites
- Node.js 18+ or pnpm 8+
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/loveats.git
cd loveats
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## Key Components

### Hero Banner
- Auto-rotating slides every 5 seconds
- Demo countdown timer (48 hours)
- Manual navigation with dots and arrows
- Responsive design with gradient overlays

### Booking Modal
- Date picker with past dates disabled (30-day window)
- Time slot selection with availability status
- Guest count stepper (1-10+ guests)
- Special requests with individual pricing:
  - Window Seat (free)
  - Candles & Flowers (50k)
  - Champagne Service (100k)
  - Complimentary Dessert (75k)
- Real-time price calculation

### Search & Filter
- Full-text search across restaurant names, cuisines, and tags
- Filter by cuisine type
- Filter by minimum rating (0, 4.0, 4.5, 4.7+)
- Sort options: Rating, Price (low-to-high), Price (high-to-low), Newest
- Active filter display with quick removal

### Restaurant Data
- 6 Vietnamese, Japanese, Italian, Korean, Thai, and Fusion restaurants
- Mock reviews and ratings
- Menu categories with sample items
- Special offers and promotions
- Contact information and hours

## Sample Data

The project includes hardcoded sample data for:
- **6 Restaurants**: Saigon Kitchen, Edo Japan, Bella Italia, Korean BBQ House, Pad Thai Paradise, Sunset Fusion
- **8 Cuisine Categories**: Vietnamese, Japanese, Italian, Korean, Thai, Fusion, Dessert, Coffee
- **4 Vouchers**: Valentine Special (20% off), Welcome Bonus (50k off), Lunch Combo (30% off), Free Delivery
- **9 Time Slots**: 11:00 AM to 9:00 PM with availability status

## Features Roadmap

- [ ] User authentication and profiles
- [ ] Booking history and management
- [ ] Real-time availability integration
- [ ] Payment processing
- [ ] Email confirmation sending
- [ ] Admin dashboard for restaurants
- [ ] Rating and review system
- [ ] Wishlist/favorites
- [ ] Social sharing integration

## Deployment

### Deploy to Vercel

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit: LoveEats platform"
git push origin main
```

2. Import the repository in Vercel:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your GitHub repository
   - Deploy with default settings

### Deploy to Other Platforms

The Next.js 16 app can be deployed to any platform supporting Node.js 18+.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- **Static Generation**: Homepage and most pages use static generation
- **Dynamic Routes**: Restaurant detail pages render on-demand
- **Image Optimization**: Using Tailwind CSS gradients for placeholder images
- **Bundle Size**: ~200KB gzipped (with all dependencies)

## Accessibility

- Semantic HTML with proper heading hierarchy
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly with alt text
- Focus indicators on interactive elements
- Color contrast compliant (WCAG AA)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For support, email hello@loveats.com or open an issue on GitHub.

## Changelog

### v1.0.0 (Initial Release)
- Homepage with hero banner and restaurant discovery
- Restaurant search and filtering
- Restaurant detail pages
- Interactive booking modal
- Booking confirmation page
- Responsive design for mobile and desktop
- Valentine's Day campaign features
