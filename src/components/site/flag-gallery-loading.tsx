import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface FlagGalleryLoadingProps {
  className?: string
  count?: number
}

export function FlagGalleryLoading({ className, count = 8 }: FlagGalleryLoadingProps) {
  return (
    <div
      role="status"
      aria-label="Loading flag previews"
      className={cn("overflow-hidden border bg-card", className)}
    >
      <span className="sr-only">Loading flag previews</span>
      <div className="grid min-h-17 gap-px bg-border lg:grid-cols-[minmax(250px,1fr)_12rem_12rem_12rem]">
        <div className="bg-background p-3"><Skeleton className="h-9" /></div>
        <div className="bg-background p-3"><Skeleton className="h-9" /></div>
        <div className="bg-background p-3"><Skeleton className="h-9" /></div>
        <div className="bg-background p-3"><Skeleton className="h-9" /></div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="border-e border-t bg-background">
            <div className="grid aspect-[4/3] place-items-center bg-muted/35 p-8">
              <Skeleton className="aspect-[4/3] w-2/3" />
            </div>
            <div className="border-t p-4">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="mt-2 h-3 w-1/2" />
            </div>
            <div className="h-13 border-t bg-card" />
          </div>
        ))}
      </div>
    </div>
  )
}
