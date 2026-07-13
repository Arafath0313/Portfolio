import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

const TimelineItem = ({ item }) => {
  return (
    <article className="relative rounded-[1.5rem] border border-white/70 bg-white/90 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80">
      <span className="absolute left-6 top-6 h-3 w-3 rounded-full bg-teal-500 shadow-[0_0_0_8px_rgba(20,184,166,0.14)]" />
      <div className="pl-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          <span>{item?.kind}</span>
          {item?.date ? <span>{formatDate(item.date)}</span> : null}
        </div>
        <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {item?.title}
        </h3>
        {item?.description ? (
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {item.description}
          </p>
        ) : null}
        {item?.href ? (
          <Link
            to={item.href}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition hover:text-teal-700 dark:text-white dark:hover:text-teal-300"
          >
            Explore
            <FiArrowUpRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </article>
  );
};

export default TimelineItem;
