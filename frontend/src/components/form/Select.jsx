import { forwardRef } from "react";
import clsx from "clsx";

const Select = forwardRef(
  ({ error = false, children, className = "", ...props }, ref) => (
    <select
      ref={ref}
      className={clsx(
        "w-full rounded-xl border px-4 py-2 text-sm transition-colors duration-200",
        "bg-white text-slate-900 dark:bg-slate-800 dark:text-white",
        "focus:outline-none focus:ring-2",
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-slate-300 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-600",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);

Select.displayName = "Select";

export default Select;
