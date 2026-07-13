import { forwardRef } from "react";
import clsx from "clsx";
import Label from "./Label";

const Input = forwardRef(({
  type = "text",
  id,
  name,
  value,
  placeholder = "",
  disabled = false,
  error = false,
  className = "",
  label,
  ...props
}, ref) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && <Label htmlFor={id || name}>{label}</Label>}
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          "w-full rounded-xl border px-4 py-2.5 text-sm transition-all duration-300",
          "bg-white text-slate-900 placeholder-slate-400 shadow-sm",
          "dark:bg-slate-800/50 dark:text-white dark:placeholder-slate-500",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
          error
            ? "border-red-500 focus-visible:ring-red-500 focus:border-red-500"
            : "border-slate-300 focus:border-teal-500 focus-visible:ring-teal-500/30 dark:border-slate-700 dark:focus:border-teal-400 dark:focus-visible:ring-teal-400/30",
          disabled && "cursor-not-allowed opacity-60",
          "hover:border-slate-400 dark:hover:border-slate-600",
          className
        )}
        {...props}
      />
      {typeof error === "string" && (
        <p className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;