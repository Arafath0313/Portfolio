import clsx from "clsx";

/**
 * Loader component – displays a spinning ring indicator.
 * @param {string} size – "sm" | "md" | "lg" | "xl"
 * @param {string} className – additional Tailwind classes
 */
const Loader = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-4",
    xl: "h-16 w-16 border-4",
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={clsx(
        "animate-spin rounded-full border-slate-200 border-t-teal-600 dark:border-slate-700 dark:border-t-teal-400",
        sizes[size],
        className
      )}
    />
  );
};

export default Loader;
