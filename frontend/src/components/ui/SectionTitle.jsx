import clsx from "clsx";

const alignment = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

const SectionTitle = ({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) => {
  return (
    <div className={clsx("flex flex-col gap-3", alignment[align] ?? alignment.left, className)}>
      {eyebrow ? (
        <span className="inline-flex rounded-full border border-teal-200/70 bg-teal-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-teal-700 dark:border-teal-400/20 dark:bg-teal-400/10 dark:text-teal-200">
          {eyebrow}
        </span>
      ) : null}
      {title ? (
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default SectionTitle;
