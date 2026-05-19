'use client';

import Link from 'next/link';
import { CheckCircle, Download, Share2, MapPin, Clock, Users, CreditCard } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function BookingConfirmationPage() {
  const bookingDetails = {
    confirmationId: 'BK-2025-001234',
    restaurantName: 'Korean BBQ House',
    cuisine: 'Korean',
    date: 'February 14, 2025',
    time: '7:00 PM',
    guests: 2,
    totalAmount: 250000,
    address: '321 Vo Van Tan, District 3, HCMC',
    phone: '028 3333 4444',
  };

  const handleDownloadConfirmation = () => {
    alert('Download confirmation functionality');
  };

  const handleShare = () => {
    alert('Share booking functionality');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-primary to-accent py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Booking Confirmed!
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Your reservation has been successfully booked. We&apos;ve sent a confirmation email to your inbox.
            </p>
          </div>
        </div>

        {/* Confirmation Details */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Confirmation ID */}
          <div className="mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    Confirmation Number
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-primary font-mono">
                    {bookingDetails.confirmationId}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Save this number for your records
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Restaurant Info */}
            <Card className="lg:col-span-2">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Reservation Details
                </h2>

                {/* Restaurant Name */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {bookingDetails.restaurantName}
                      </h3>
                      <p className="text-muted-foreground">
                        {bookingDetails.cuisine} Cuisine
                      </p>
                    </div>
                    <span className="text-3xl">🍽️</span>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Reservation Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="font-semibold text-foreground">
                        {bookingDetails.date}
                      </p>
                      <p className="text-sm text-foreground">
                        {bookingDetails.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Number of Guests</p>
                      <p className="font-semibold text-foreground text-lg">
                        {bookingDetails.guests} {bookingDetails.guests === 1 ? 'Guest' : 'Guests'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:col-span-2">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold text-foreground">
                        {bookingDetails.address}
                      </p>
                      <p className="text-sm text-foreground mt-1">
                        Phone: {bookingDetails.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Summary */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg text-foreground mb-4">
                  Booking Summary
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base Price</span>
                    <span className="font-semibold text-foreground">
                      {(bookingDetails.totalAmount * 0.7 / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Add-ons</span>
                    <span className="font-semibold text-foreground">
                      {(bookingDetails.totalAmount * 0.3 / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between">
                  <span className="font-bold text-foreground">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">
                    {(bookingDetails.totalAmount / 1000).toFixed(0)}k
                  </span>
                </div>

                <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Payment will be settled on the day of visit
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Important Information */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg text-foreground mb-4">
                Important Information
              </h3>
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Please arrive 10-15 minutes before your reservation time
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    If you need to cancel or modify your booking, please do so at
                    least 24 hours in advance
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    For special requests or dietary requirements, please contact the
                    restaurant directly
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    A confirmation email has been sent to your registered email
                    address
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button
              className="flex-1 bg-primary hover:bg-accent text-white gap-2"
              onClick={handleDownloadConfirmation}
            >
              <Download className="w-4 h-4" />
              Download Confirmation
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
              Share Booking
            </Button>
          </div>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg text-foreground mb-4">
                What&apos;s Next?
              </h3>
              <ol className="space-y-3 text-sm text-foreground">
                <li className="flex gap-3">
                  <span className="font-bold text-primary min-w-6">1.</span>
                  <span>
                    Check your email for the booking confirmation and restaurant
                    details
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary min-w-6">2.</span>
                  <span>
                    Make a note of the confirmation number in case you need to contact
                    the restaurant
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary min-w-6">3.</span>
                  <span>
                    Explore the restaurant&apos;s menu and arrive a few minutes early
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary min-w-6">4.</span>
                  <span>
                    Enjoy your romantic dinner and rate your experience afterwards
                  </span>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1">
              <Button className="w-full bg-primary hover:bg-accent text-white">
                Back to Home
              </Button>
            </Link>
            <Link href="/bookings" className="flex-1">
              <Button variant="outline" className="w-full">
                View My Bookings
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
