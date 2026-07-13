import { forwardRef } from "react";
import clsx from "clsx";

const Textarea = forwardRef(
  ({ error = false, rows = 4, className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={clsx(
        "w-full rounded-xl border px-4 py-2 text-sm transition-colors duration-200",
        "bg-white text-slate-900 placeholder-slate-400",
        "dark:bg-slate-800 dark:text-white dark:placeholder-slate-500",
        "focus:outline-none focus:ring-2 resize-y min-h-[100px]",
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-slate-300 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-600",
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";

export default Textarea;
