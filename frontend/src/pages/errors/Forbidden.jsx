import { Link } from "react-router-dom";
import { FiShield, FiHome, FiArrowLeft } from "react-icons/fi";

const Forbidden = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 dark:bg-slate-900">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950/40">
          <FiShield className="h-12 w-12 text-orange-600 dark:text-orange-400" />
        </div>

        {/* Code */}
        <p className="text-7xl font-black text-orange-500 dark:text-orange-400 select-none">
          403
        </p>

        <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
          Access Forbidden
        </h1>
        <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
          You don't have permission to access this page. Please contact the
          administrator if you believe this is a mistake.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-orange-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <FiHome className="h-4 w-4" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <FiArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
