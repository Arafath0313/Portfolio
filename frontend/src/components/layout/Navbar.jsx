import { useEffect, useState } from "react";
import { FiArrowUpRight, FiDownload, FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import ThemeToggle from "../common/ThemeToggle";
import ROUTES from "../../constants/routes";
import { useAppContext } from "../../contexts/AppContext";
import { buildMediaUrl } from "../../utils/apiHelpers";

const NAV_LINKS = [
  { label: "Home", path: ROUTES.HOME },
  { label: "About", path: ROUTES.ABOUT },
  { label: "Education", path: ROUTES.EDUCATION },
  { label: "Projects", path: ROUTES.PROJECTS },
  { label: "Beyond Coding", path: ROUTES.BEYOND_CODING },
  { label: "Certifications", path: ROUTES.CERTIFICATIONS },
  { label: "Videos", path: ROUTES.VIDEOS },
  { label: "Contact", path: ROUTES.CONTACT },
];

const linkClasses = ({ isActive }) =>
  clsx(
    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
    isActive
      ? "bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950"
      : "text-slate-600 hover:bg-white/80 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
  );

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { brandName, siteSettings } = useAppContext();

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/30 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to={ROUTES.HOME} className="flex items-center gap-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500">
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-teal-500 via-cyan-500 to-amber-400 shadow-lg shadow-teal-500/20 dark:border-white/10">
            {siteSettings?.logoUrl ? (
              <img
                src={buildMediaUrl(siteSettings.logoUrl)}
                alt={brandName}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm font-black uppercase tracking-[0.24em] text-white">
                {String(brandName || "P").slice(0, 2)}
              </span>
            )}
          </span>
          <span className="hidden sm:block">
            <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 dark:text-teal-300">
              Portfolio
            </span>
            <span className="block text-base font-semibold text-slate-950 dark:text-white">
              {brandName}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.path} to={link.path} end={link.path === ROUTES.HOME} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="rounded-full border border-slate-200/80 bg-white/70 p-2.5 shadow-sm hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10" />

          <Link
            to={ROUTES.RESUME}
            className="hidden items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 md:inline-flex"
          >
            <FiDownload className="h-4 w-4" />
            Resume
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex rounded-full border border-slate-200/80 bg-white/70 p-2.5 text-slate-700 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-slate-200/80 bg-white/95 px-4 py-4 shadow-2xl shadow-slate-200/40 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 dark:shadow-none lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.path} to={link.path} end={link.path === ROUTES.HOME} className={linkClasses}>
                {link.label}
              </NavLink>
            ))}
            <Link
              to={ROUTES.RESUME}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950"
            >
              <FiArrowUpRight className="h-4 w-4" />
              View Resume
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
