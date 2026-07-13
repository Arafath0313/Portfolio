import { motion } from "framer-motion";
import clsx from "clsx";
import { pageTransition } from "../../constants/motion";
import Breadcrumb from "./Breadcrumb";

const PageHero = ({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  actions,
  meta = [],
  aside,
  className = "",
}) => {
  return (
    <section className={clsx("relative overflow-hidden", className)}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
        {breadcrumbs.length ? <Breadcrumb items={breadcrumbs} className="mb-6" /> : null}

        <motion.div
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className={clsx(
            "grid gap-10 rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70",
            aside ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-center" : "max-w-4xl"
          )}
        >
          <div className="space-y-6">
            {eyebrow ? (
              <span className="inline-flex rounded-full border border-teal-200/70 bg-teal-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-teal-700 dark:border-teal-400/20 dark:bg-teal-400/10 dark:text-teal-200">
                {eyebrow}
              </span>
            ) : null}
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                {title}
              </h1>
              {description ? (
                <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                  {description}
                </p>
              ) : null}
            </div>
            {meta.length ? (
              <div className="flex flex-wrap gap-2">
                {meta.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>

          {aside ? <div>{aside}</div> : null}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
