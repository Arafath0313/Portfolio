import Skeleton from "../common/Skeleton";

export const HeroSkeleton = () => (
  <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
    <div className="grid gap-10 rounded-[2rem] border border-white/70 bg-white/90 p-8 dark:border-white/10 dark:bg-slate-900/80 lg:grid-cols-2">
      <div className="space-y-5">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-14 w-4/5" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-2/3" />
        <div className="flex gap-3">
          <Skeleton className="h-11 w-36 rounded-full" />
          <Skeleton className="h-11 w-32 rounded-full" />
        </div>
      </div>
      <Skeleton className="min-h-[18rem] rounded-[1.5rem]" />
    </div>
  </div>
);

export const CardGridSkeleton = ({ cards = 6, hasMedia = true }) => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: cards }).map((_, index) => (
      <div
        key={index}
        className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/90 p-6 dark:border-white/10 dark:bg-slate-900/80"
      >
        {hasMedia ? <Skeleton className="mb-5 aspect-[16/10] rounded-[1.25rem]" /> : null}
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-4 h-8 w-4/5" />
        <Skeleton className="mt-4 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-2/3" />
      </div>
    ))}
  </div>
);

export const StatsSkeleton = ({ cards = 4 }) => (
  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
    {Array.from({ length: cards }).map((_, index) => (
      <div
        key={index}
        className="rounded-[1.5rem] border border-white/70 bg-white/90 p-6 dark:border-white/10 dark:bg-slate-900/80"
      >
        <Skeleton className="h-10 w-24" />
        <Skeleton className="mt-4 h-4 w-28" />
        <Skeleton className="mt-4 h-4 w-full" />
      </div>
    ))}
  </div>
);

export const TimelineSkeleton = ({ items = 4 }) => (
  <div className="grid gap-5 lg:grid-cols-2">
    {Array.from({ length: items }).map((_, index) => (
      <div
        key={index}
        className="rounded-[1.5rem] border border-white/70 bg-white/90 p-6 dark:border-white/10 dark:bg-slate-900/80"
      >
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-4 h-7 w-3/4" />
        <Skeleton className="mt-4 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-2/3" />
      </div>
    ))}
  </div>
);

export const DetailSkeleton = () => (
  <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-4 rounded-[2rem] border border-white/70 bg-white/90 p-8 dark:border-white/10 dark:bg-slate-900/80">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
        <Skeleton className="h-56 w-full rounded-[1.5rem]" />
      </div>
      <div className="space-y-4 rounded-[2rem] border border-white/70 bg-white/90 p-8 dark:border-white/10 dark:bg-slate-900/80">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  </div>
);
