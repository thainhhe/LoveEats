export function RestaurantCardSkeleton() {
  return (
    <div className="h-full rounded-lg overflow-hidden border border-border animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 md:h-56 bg-muted" />

      {/* Content skeleton */}
      <div className="p-4 md:p-5 space-y-3">
        <div className="space-y-2">
          <div className="h-5 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>

        <div className="flex gap-2 pt-2">
          <div className="h-4 bg-muted rounded w-12" />
          <div className="h-4 bg-muted rounded w-12" />
        </div>

        <div className="flex gap-3">
          <div className="h-4 bg-muted rounded w-1/3" />
          <div className="h-4 bg-muted rounded w-1/3" />
        </div>

        <div className="flex gap-1 pt-2">
          <div className="h-6 bg-muted rounded-full w-12" />
          <div className="h-6 bg-muted rounded-full w-12" />
        </div>

        <div className="h-9 bg-muted rounded w-full mt-3" />
      </div>
    </div>
  );
}
