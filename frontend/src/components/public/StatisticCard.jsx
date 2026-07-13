const StatisticCard = ({ stat }) => {
  const Icon = stat?.icon;

  return (
    <article className="rounded-[1.5rem] border border-white/70 bg-white/90 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {stat?.value}
          </p>
          <h3 className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {stat?.label}
          </h3>
          {stat?.description ? (
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {stat.description}
            </p>
          ) : null}
        </div>
        {Icon ? (
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-700 dark:text-teal-300">
            <Icon className="h-5 w-5" />
          </span>
        ) : null}
      </div>
    </article>
  );
};

export default StatisticCard;
