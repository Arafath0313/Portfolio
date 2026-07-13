import { forwardRef } from "react";
import clsx from "clsx";
import Label from "./Label";

const Select = forwardRef(({
  id,
  name,
  value,
  disabled = false,
  error = false,
  className = "",
  label,
  options = [],
  ...props
}, ref) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && <Label htmlFor={id || name}>{label}</Label>}
      <select
        ref={ref}
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        className={clsx(
          "w-full rounded-xl border px-4 py-2.5 text-sm transition-all duration-300",
          "bg-white text-slate-900 shadow-sm",
          "dark:bg-slate-800/50 dark:text-white",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
          error
            ? "border-red-500 focus-visible:ring-red-500 focus:border-red-500"
            : "border-slate-300 focus:border-teal-500 focus-visible:ring-teal-500/30 dark:border-slate-700 dark:focus:border-teal-400 dark:focus-visible:ring-teal-400/30",
          disabled && "cursor-not-allowed opacity-60",
          "hover:border-slate-400 dark:hover:border-slate-600",
          className
        )}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      {typeof error === "string" && (
        <p className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1">{error}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;
