import { forwardRef } from "react";
import clsx from "clsx";

const Checkbox = forwardRef(({
  id,
  name,
  label,
  error = false,
  className = "",
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className={clsx("flex items-center gap-2", className)}>
        <input
          type="checkbox"
          ref={ref}
          id={id || name}
          name={name}
          className={clsx(
            "h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500/30 transition-all cursor-pointer",
            "dark:border-slate-600 dark:bg-slate-800 dark:ring-offset-slate-900 dark:checked:bg-teal-500 dark:focus:ring-teal-400/30",
            error && "border-red-500 focus:ring-red-500 text-red-600"
          )}
          {...props}
        />
        {label && (
          <label htmlFor={id || name} className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            {label}
          </label>
        )}
      </div>
      {typeof error === "string" && (
        <p className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1">{error}</p>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
