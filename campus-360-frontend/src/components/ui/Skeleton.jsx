import { cn } from "../../utils/cn";

export const Skeleton = ({ className, ...props }) => (
  <div
    className={cn("animate-pulse rounded-xl bg-slate-200/80", className)}
    aria-hidden="true"
    {...props}
  />
);

export const StatCardSkeleton = ({ className }) => (
  <div className={cn("rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm", className)}>
    <Skeleton className="h-4 w-24" />
    <Skeleton className="mt-3 h-9 w-16" />
    <Skeleton className="mt-2 h-4 w-32" />
  </div>
);

export const TableSkeleton = ({ rows = 5, cols = 4 }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
    <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
      <div className="flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
    </div>
    <div className="divide-y divide-slate-100">
      {Array.from({ length: rows }).map((_, row) => (
        <div key={row} className="flex gap-4 px-4 py-4">
          {Array.from({ length: cols }).map((_, col) => (
            <Skeleton key={col} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const CardGridSkeleton = ({ count = 6 }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="mt-3 h-4 w-1/2" />
        <Skeleton className="mt-4 h-16 w-full" />
        <Skeleton className="mt-4 h-9 w-28" />
      </div>
    ))}
  </div>
);

export const PageHeaderSkeleton = ({ className }) => (
  <div
    className={cn(
      "rounded-2xl border border-slate-200/80 bg-white/90 px-6 py-5 shadow-sm",
      className,
    )}
    aria-hidden="true"
  >
    <Skeleton className="h-3 w-24" />
    <Skeleton className="mt-3 h-8 w-64 max-w-full" />
    <Skeleton className="mt-2 h-4 w-96 max-w-full" />
  </div>
);

export const ListSkeleton = ({ rows = 5 }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
    <div className="divide-y divide-slate-100">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-4 px-6 py-4">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-56" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
      ))}
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-6" aria-busy="true" aria-label="Loading dashboard">
    <PageHeaderSkeleton />
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="mt-2 h-4 w-64" />
        <Skeleton className="mt-6 h-48 w-full" />
      </div>
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="mt-2 h-4 w-64" />
        <Skeleton className="mt-6 h-48 w-full" />
      </div>
    </div>
  </div>
);

export default Skeleton;
