'use client';

import Link from 'next/link';
import { Heart, MapPin, User, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="hidden sm:inline font-bold text-lg text-primary">LoveEats</span>
          </Link>

          {/* Location */}
          <div className="hidden md:flex items-center gap-2 text-sm text-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Ha Noi Capital</span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/search">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-foreground hover:text-primary"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Orders</span>
              </Button>
            </Link>
            <Link href="/profile">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-foreground hover:text-primary"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Account</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
