import { Skeleton } from "@/components/ui/skeleton"

export default function HomeLoading() {
  return (
    <div className="flex min-h-[calc(100svh-12rem)] flex-col items-center justify-center gap-6">
      <div className="text-center">
        <Skeleton className="mx-auto h-7 w-24" />
        <Skeleton className="mx-auto mt-3 h-4 w-32" />
      </div>
      <div className="bg-card/40 w-full max-w-2xl rounded-lg border border-dashed p-6 md:p-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
        <div className="mt-6 flex w-full justify-center">
          <Skeleton className="h-11 w-44" />
        </div>
      </div>
    </div>
  )
}
