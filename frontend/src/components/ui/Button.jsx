import { forwardRef } from "react";
import clsx from "clsx";
import Loader from "../common/Loader";

const Button = forwardRef(
  (
    {
      children,
      type = "button",
      variant = "primary",
      size = "md",
      fullWidth = false,
      disabled = false,
      loading = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:-translate-y-0.5 active:scale-[0.98]";

    const variants = {
      primary:
        "bg-teal-600 text-white hover:bg-teal-700 shadow-md hover:shadow-lg dark:bg-teal-500 dark:hover:bg-teal-600",

      secondary:
        "bg-slate-800 text-white hover:bg-slate-900 shadow-md hover:shadow-lg dark:bg-slate-700 dark:hover:bg-slate-600",

      success:
        "bg-green-600 text-white hover:bg-green-700 shadow-sm",

      danger:
        "bg-red-600 text-white hover:bg-red-700 shadow-sm",

      outline:
        "border-2 border-slate-200 bg-transparent text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:border-slate-600",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={clsx(
          baseClasses,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader size="sm" className="border-t-current" />
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;