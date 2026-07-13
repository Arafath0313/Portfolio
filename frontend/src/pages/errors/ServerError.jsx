import { Link } from "react-router-dom";
import { FiServer, FiHome, FiRefreshCw } from "react-icons/fi";

const ServerError = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 dark:bg-slate-900">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
          <FiServer className="h-12 w-12 text-red-600 dark:text-red-400" />
        </div>

        {/* Code */}
        <p className="text-7xl font-black text-red-500 dark:text-red-400 select-none">
          500
        </p>

        <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
          Internal Server Error
        </h1>
        <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
          Our servers encountered an unexpected problem. We're working to fix it.
          Please try again later or return to the home page.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <FiRefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <FiHome className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
