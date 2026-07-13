import clsx from "clsx";

const Skeleton = ({ className, variant = "rect" }) => (
  <div
    className={clsx(
      "animate-pulse bg-slate-200 dark:bg-slate-700",
      variant === "circle" && "rounded-full",
      variant === "rect" && "rounded-xl",
      variant === "text" && "rounded h-4",
      className
    )}
  />
);

export const TableSkeleton = ({ rows = 5, cols = 4 }) => (
  <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
    <Skeleton className="h-10 w-full" />
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4">
        {Array.from({ length: cols }).map((_, j) => (
          <Skeleton key={j} className="h-8 flex-1" />
        ))}
      </div>
    ))}
  </div>
);

export const CardSkeleton = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800 space-y-4">
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

export default Skeleton;
