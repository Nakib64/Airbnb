import HotelSkeleton from "@/components/HotelSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function HotelsSkeletonSection() {
  return (
    <section className="px-4 md:px-12">
      {[1, 2, 3].map((row) => (
        <div key={row} className="space-y-4">
          {/* Title with fake buttons */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32 rounded-md" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-6 rounded-md" />
              <Skeleton className="h-6 w-6 rounded-md" />
            </div>
          </div>

          {/* Grid of hotel skeletons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <HotelSkeleton key={i} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
