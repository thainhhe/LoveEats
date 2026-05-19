'use client';

import { useState } from 'react';
import { Calendar, Clock, Users, MessageSquare, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { timeSlots } from '@/lib/data';
import { Restaurant } from '@/lib/types';

interface BookingModalProps {
  restaurant: Restaurant;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const specialRequests = [
  { id: 'window-seat', label: 'Window Seat', price: 0 },
  { id: 'candles', label: 'Candles & Flowers', price: 50000 },
  { id: 'champagne', label: 'Champagne Service', price: 100000 },
  { id: 'cake', label: 'Complimentary Dessert', price: 75000 },
];

export function BookingModal({
  restaurant,
  open,
  onOpenChange,
}: BookingModalProps) {
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleRequestChange = (id: string, checked: boolean) => {
    setSelectedRequests((prev) =>
      checked ? [...prev, id] : prev.filter((r) => r !== id)
    );
  };

  const calculateTotal = () => {
    const basePrice = guestCount * 50000;
    const addonsPrice = specialRequests
      .filter((r) => selectedRequests.includes(r.id))
      .reduce((sum, r) => sum + r.price, 0);
    return basePrice + addonsPrice;
  };

  const isComplete =
    bookingDate && bookingTime && guestCount > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span>💕</span>
            Book {restaurant.name}
          </DialogTitle>
          <DialogDescription>{restaurant.cuisine} Cuisine</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 max-h-[60vh] overflow-y-auto">
          {/* Date Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground font-semibold">
              <Calendar className="w-4 h-4 text-primary" />
              Reservation Date
            </Label>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              min={today}
              max={maxDateStr}
              className="w-full px-3 py-2 border border-border rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground font-semibold">
              <Clock className="w-4 h-4 text-primary" />
              Preferred Time
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && setBookingTime(slot.time)}
                  disabled={!slot.available}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    bookingTime === slot.time
                      ? 'bg-primary text-white'
                      : slot.available
                        ? 'border border-border text-foreground hover:border-primary'
                        : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>

          {/* Guest Count */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground font-semibold">
              <Users className="w-4 h-4 text-primary" />
              Number of Guests
            </Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
              >
                −
              </Button>
              <span className="w-12 text-center font-bold text-lg text-foreground">
                {guestCount}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGuestCount(guestCount + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground font-semibold">
              <MessageSquare className="w-4 h-4 text-primary" />
              Special Requests
            </Label>
            <div className="space-y-2">
              {specialRequests.map((request) => (
                <div key={request.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={request.id}
                    checked={selectedRequests.includes(request.id)}
                    onCheckedChange={(checked) =>
                      handleRequestChange(request.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={request.id}
                    className="flex items-center justify-between flex-1 cursor-pointer"
                  >
                    <span className="text-foreground">{request.label}</span>
                    {request.price > 0 && (
                      <span className="text-xs text-muted-foreground">
                        +{(request.price / 1000).toFixed(0)}k
                      </span>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          {isComplete && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-foreground">
                    <span>Base Price ({guestCount} guests)</span>
                    <span>{(guestCount * 50000 / 1000).toFixed(0)}k</span>
                  </div>
                  {selectedRequests.length > 0 && (
                    <div className="flex justify-between text-foreground">
                      <span>Add-ons</span>
                      <span>
                        {specialRequests
                          .filter((r) => selectedRequests.includes(r.id))
                          .reduce((sum, r) => sum + r.price, 0) / 1000}
                        k
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-base text-primary border-t border-primary/20 pt-2">
                    <span>Total</span>
                    <span>{(calculateTotal() / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-primary hover:bg-accent text-white"
            disabled={!isComplete}
          >
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
