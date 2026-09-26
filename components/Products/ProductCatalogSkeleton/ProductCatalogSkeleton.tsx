import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_SIZE } from "@/lib/constants";

export default function ProductCatalogSkeleton() {
  const rows = Array.from({ length: PAGE_SIZE });

  return (
    <div
      role="status"
      aria-label="Loading products"
      className="w-full max-w-137.5 lg:max-w-none xl:max-w-2/3"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>

      <div className="lg:border lg:border-separators lg:rounded-custom-medium ">
        <div className="hidden lg:flex lg:items-center lg:gap-8 lg:justify-between lg:px-4 lg:py-3.5 lg:border-b lg:border-separators">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-8" />
        </div>

        {rows.map((_, i) => (
          <div
            key={i}
            className="hidden lg:flex lg:items-center lg:gap-8 lg:justify-between lg:px-4 lg:py-3.5 lg:border-b lg:border-separators"
          >
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16 rounded-full" />
            <Skeleton className="h-4 w-8" />
          </div>
        ))}

        <div className="lg:hidden space-y-4">
          {rows.map((_, i) => (
            <Skeleton key={i} className="h-35.5 w-full rounded-custom-big" />
          ))}
        </div>

        <div className="flex-col justify-center items-center gap-4 flex lg:items-center lg:flex-row lg:justify-between py-3">
          <Skeleton className="ml-4 h-4 w-28" />
          <Skeleton className="mr-4 h-9 w-48" />
        </div>
      </div>
    </div>
  );
}
