import { motion } from "framer-motion";
import { FiArrowLeft, FiCompass, FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";
import ROUTES from "../../constants/routes";
import { pageTransition } from "../../constants/motion";
import usePageSeo from "../../hooks/usePageSeo";

const NotFound = () => {
  usePageSeo({
    title: "Page Not Found",
    description: "The page you requested does not exist in this portfolio.",
    noIndex: true,
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 p-8 text-center shadow-[0_32px_90px_-45px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 sm:p-12"
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30">
          <FiCompass className="h-10 w-10" />
        </div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.34em] text-teal-700 dark:text-teal-300">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          That route fell off the map.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
          The page may have moved, the URL may be incorrect, or the content may no longer be available.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            <FiHome className="h-4 w-4" />
            Go home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white dark:hover:text-white"
          >
            <FiArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
