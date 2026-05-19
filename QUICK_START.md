# LoveEats - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run Development Server
```bash
pnpm dev
```

### 3. Open Browser
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📱 What You Can Do

### Homepage
- Browse featured restaurants
- View hot deals carousel
- Check Valentine special countdown
- Copy voucher codes
- Search or filter by cuisine

### Search & Filter
- Search by restaurant name or cuisine
- Filter by cuisine type
- Filter by minimum rating
- Sort by rating, price, or newest
- See real-time results

### Restaurant Pages
- View detailed restaurant info
- Read customer reviews
- Browse menu items
- See address and hours
- Book a table

### Booking Modal
- Pick a date (next 30 days)
- Select a time (9 slots available)
- Choose number of guests
- Add special requests:
  - Window Seat (free)
  - Candles & Flowers (50k)
  - Champagne Service (100k)
  - Complimentary Dessert (75k)
- See total price

### Booking Confirmation
- View confirmation number
- See reservation details
- Download confirmation
- Share booking with friends

---

## 📚 Key Pages

| URL | Purpose |
|-----|---------|
| `/` | Homepage with restaurant discovery |
| `/search` | Search and filter restaurants |
| `/restaurant/[id]` | Restaurant detail page |
| `/booking/confirmation` | Booking confirmation |

---

## 🎨 Customization

### Colors (in `app/globals.css`)
```css
--primary: oklch(0.45 0.2 334);      /* Deep Rose */
--secondary: oklch(0.65 0.15 60);    /* Warm Gold */
--accent: oklch(0.3 0.15 334);       /* Dark Plum */
```

### Restaurants (in `lib/data.ts`)
Add more restaurants to the `restaurants` array. Each restaurant needs:
- `id`, `name`, `cuisine`, `image`, `rating`, `reviewCount`
- `deliveryTime`, `minOrder`, `tags`, `description`
- `phone`, `address`, `hours`, `specials`

### Vouchers (in `lib/data.ts`)
Add vouchers to the `vouchers` array:
- `id`, `code`, `title`, `description`
- `discount`, `validity`, `icon`

---

## 🛠️ Build Commands

```bash
# Development
pnpm dev          # Start dev server on http://localhost:3000

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Linting
pnpm lint         # Run ESLint
```

---

## 📦 Project Structure

```
loveats/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles & colors
│   ├── restaurant/[id]/     # Restaurant detail page
│   ├── search/              # Search results page
│   └── booking/confirmation # Confirmation page
├── components/              # React components
│   ├── header.tsx
│   ├── hero-banner.tsx
│   ├── category-nav.tsx
│   ├── restaurant-card.tsx
│   ├── hot-deals.tsx
│   ├── voucher-strip.tsx
│   ├── booking-modal.tsx
│   ├── footer.tsx
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── data.ts             # Mock data (restaurants, vouchers)
│   ├── types.ts            # TypeScript interfaces
│   └── utils.ts            # Utility functions
├── README.md               # Full documentation
├── SETUP_GITHUB.md         # GitHub setup instructions
└── package.json
```

---

## 🔧 Add Features

### Add a New Page
1. Create file: `app/new-page/page.tsx`
2. Use existing components
3. Import Header and Footer

### Add a New Component
1. Create file: `components/my-component.tsx`
2. Make it a Client Component (`'use client'`)
3. Import and use in pages

### Add More Restaurants
Edit `lib/data.ts`:
```typescript
export const restaurants: Restaurant[] = [
  {
    id: 'my-restaurant',
    name: 'My Restaurant',
    cuisine: 'Vietnamese',
    // ... other fields
  },
];
```

### Modify Colors
Edit `app/globals.css`:
```css
:root {
  --primary: oklch(0.45 0.2 334);  /* Change this */
  --secondary: oklch(0.65 0.15 60);
  --accent: oklch(0.3 0.15 334);
}
```

---

## 🚀 Deploy

### To Vercel (Easiest)
1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Select your GitHub repo
4. Click Deploy
5. Done! Your app is live

### To Other Platforms
The app works on any Node.js 18+ platform:
- Netlify
- Railway
- Render
- AWS
- DigitalOcean

---

## 📊 Sample Data

**6 Restaurants:**
- Saigon Kitchen (Vietnamese) - 4.8★
- Edo Japan (Japanese) - 4.7★
- Bella Italia (Italian) - 4.6★
- Korean BBQ House (Korean) - 4.9★
- Pad Thai Paradise (Thai) - 4.5★
- Sunset Fusion (Fusion) - 4.4★

**8 Categories:**
Vietnamese, Japanese, Italian, Korean, Thai, Fusion, Dessert, Coffee

**4 Vouchers:**
Valentine (20%), Welcome (50k), Lunch (30%), Delivery (Free)

---

## ❓ Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
pnpm dev --port 3001
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules
pnpm install
```

### TypeScript Errors
```bash
# Check TypeScript
pnpm tsc --noEmit
```

---

## 📖 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [React](https://react.dev)

---

## 💡 Tips

- Use `'use client'` at the top of components that use hooks
- Import shadcn components from `@/components/ui`
- Styles use Tailwind CSS with custom design tokens
- Icons come from lucide-react
- Responsive classes: `md:` (768px), `lg:` (1280px)

---

**Happy coding! 🎉**

Questions? See [README.md](./README.md) for full documentation.
