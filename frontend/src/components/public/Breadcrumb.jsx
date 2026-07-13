import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import clsx from "clsx";
import ROUTES from "../../constants/routes";

const Breadcrumb = ({ items = [], className = "", includeHome = true }) => {
  const trail = includeHome ? [{ label: "Home", to: ROUTES.HOME }, ...items] : items;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <FiChevronRight className="h-4 w-4" aria-hidden="true" /> : null}
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="transition hover:text-slate-950 dark:hover:text-white"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={clsx(isLast && "font-medium text-slate-900 dark:text-white")}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
