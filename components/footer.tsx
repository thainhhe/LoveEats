'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logobrand.jfif" alt="Brand Logo" className="w-12 h-12 object-cover rounded-lg" />
            </div>
            <p className="text-sm opacity-80">
              Making romantic dining experiences more accessible to everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-3 text-sm md:text-base">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/" className="hover:opacity-100 transition">Home</Link></li>
              <li><Link href="/restaurants" className="hover:opacity-100 transition">Restaurants</Link></li>
              <li><Link href="/bookings" className="hover:opacity-100 transition">My Bookings</Link></li>
              <li><Link href="/offers" className="hover:opacity-100 transition">Offers</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold mb-3 text-sm md:text-base">Company</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/about" className="hover:opacity-100 transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:opacity-100 transition">Contact</Link></li>
              <li><Link href="/blog" className="hover:opacity-100 transition">Blog</Link></li>
              <li><Link href="/careers" className="hover:opacity-100 transition">Careers</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-3 text-sm md:text-base">Contact Us</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Email: hello@loveats.com</li>
              <li>Phone: 1900 1234</li>
              <li>Address: 123 Nguyen Hue, HCMC</li>
              <li className="pt-2 flex gap-3">
                <a href="#" className="hover:opacity-100 transition">FB</a>
                <a href="#" className="hover:opacity-100 transition">IG</a>
                <a href="#" className="hover:opacity-100 transition">TW</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 pt-6 text-center text-sm opacity-75">
          <p>
            &copy; {currentYear} LoveEats. All rights reserved. |{' '}
            <Link href="/privacy" className="hover:opacity-100 transition">Privacy Policy</Link>
            {' '}| {' '}
            <Link href="/terms" className="hover:opacity-100 transition">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
