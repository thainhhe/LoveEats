'use client';

import { categories } from '@/lib/data';
import { Button } from './ui/button';

interface CategoryNavProps {
  selectedCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
}

export function CategoryNav({ selectedCategory, onSelectCategory }: CategoryNavProps) {
  return (
    <div className="w-full bg-white border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className={`flex gap-2 whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary text-white hover:bg-accent'
                  : 'border-border text-foreground hover:border-primary hover:text-primary'
              }`}
              onClick={() => onSelectCategory?.(category.id)}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="text-sm md:text-base">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
