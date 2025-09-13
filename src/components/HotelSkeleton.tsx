import { Skeleton } from "./ui/skeleton";

export default function HotelSkeleton() {
  return (
    <div className="relative rounded-xl overflow-hidden transition-all duration-300">
      {/* Square image skeleton */}
      <div className="relative w-full aspect-square ">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>

      {/* Info skeleton */}
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4 rounded-md" />
        <Skeleton className="h-3 w-1/2 rounded-md" />
        <Skeleton className="h-4 w-1/4 mt-2 rounded-md" />
      </div>
    </div>
  )
}


