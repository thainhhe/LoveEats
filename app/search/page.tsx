'use client';

import { useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { RestaurantCard } from '@/components/restaurant-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { restaurants } from '@/lib/data';

const cuisineOptions = [
  'Vietnamese',
  'Japanese',
  'Italian',
  'Korean',
  'Thai',
  'Fusion',
];

const sortOptions = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('rating');
  const [minRating, setMinRating] = useState(0);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  let filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCuisine =
      selectedCuisines.length === 0 ||
      selectedCuisines.includes(restaurant.cuisine);

    const matchesRating = restaurant.rating >= minRating;

    return matchesSearch && matchesCuisine && matchesRating;
  });

  // Sort restaurants
  if (sortBy === 'rating') {
    filteredRestaurants.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'price-low') {
    filteredRestaurants.sort((a, b) => a.minOrder - b.minOrder);
  } else if (sortBy === 'price-high') {
    filteredRestaurants.sort((a, b) => b.minOrder - a.minOrder);
  }

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCuisines([]);
    setSortBy('rating');
    setMinRating(0);
  };

  const hasActiveFilters =
    searchQuery || selectedCuisines.length > 0 || minRating > 0 || sortBy !== 'rating';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Search Header */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Search Restaurants
            </h1>

            {/* Search Bar */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, cuisine, or dish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 md:py-3 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="flex items-center gap-2 px-4"
                onClick={() => setFilterDialogOpen(true)}
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="bg-secondary/10 border-b border-border">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  Active filters:
                </span>
                {selectedCuisines.map((cuisine) => (
                  <span
                    key={cuisine}
                    className="px-3 py-1 bg-secondary text-white text-xs rounded-full flex items-center gap-1"
                  >
                    {cuisine}
                    <button
                      onClick={() => handleCuisineToggle(cuisine)}
                      className="ml-1 hover:opacity-80"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {minRating > 0 && (
                  <span className="px-3 py-1 bg-secondary text-white text-xs rounded-full flex items-center gap-1">
                    Rating: {minRating}+
                    <button
                      onClick={() => setMinRating(0)}
                      className="ml-1 hover:opacity-80"
                    >
                      ×
                    </button>
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-accent"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          {filteredRestaurants.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Found {filteredRestaurants.length} restaurant
                {filteredRestaurants.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                No restaurants found
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your search filters or exploring different
                cuisines.
              </p>
              <Button
                className="bg-primary hover:bg-accent text-white"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Filter Restaurants</DialogTitle>
            <DialogDescription>
              Refine your search with specific criteria
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Cuisine Filter */}
            <div className="space-y-3">
              <Label className="font-bold text-foreground">Cuisine Type</Label>
              <div className="space-y-2">
                {cuisineOptions.map((cuisine) => (
                  <div key={cuisine} className="flex items-center space-x-2">
                    <Checkbox
                      id={cuisine}
                      checked={selectedCuisines.includes(cuisine)}
                      onCheckedChange={() => handleCuisineToggle(cuisine)}
                    />
                    <Label
                      htmlFor={cuisine}
                      className="font-normal cursor-pointer text-foreground"
                    >
                      {cuisine}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-3">
              <Label className="font-bold text-foreground">Minimum Rating</Label>
              <div className="space-y-2">
                {[0, 4, 4.5, 4.7].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`rating-${rating}`}
                      name="rating"
                      value={rating}
                      checked={minRating === rating}
                      onChange={() => setMinRating(rating)}
                      className="cursor-pointer"
                    />
                    <Label
                      htmlFor={`rating-${rating}`}
                      className="font-normal cursor-pointer flex items-center gap-1 text-foreground"
                    >
                      {rating === 0 ? (
                        'All ratings'
                      ) : (
                        <>
                          <span>{rating}</span>
                          <Star className="w-4 h-4 fill-secondary text-secondary" />
                          <span className="text-xs text-muted-foreground">
                            & up
                          </span>
                        </>
                      )}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dialog Actions */}
          <div className="flex gap-2 pt-4 border-t border-border">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setFilterDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-accent text-white"
              onClick={() => setFilterDialogOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
