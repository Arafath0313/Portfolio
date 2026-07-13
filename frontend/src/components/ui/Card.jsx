import clsx from "clsx";

const Card = ({
  children,
  className = "",
  hoverable = false,
}) => {
  return (
    <div
      className={clsx(
        "rounded-2xl bg-white shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800",
        "transition-all duration-300",
        hoverable && "hover:shadow-xl hover:-translate-y-1 hover:border-teal-500/30 dark:hover:border-teal-400/30",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;