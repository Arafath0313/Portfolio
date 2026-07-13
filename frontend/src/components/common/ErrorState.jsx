import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import { motion } from "framer-motion";
import Button from "../ui/Button";

/**
 * ErrorState – displayed when a data fetch or operation fails.
 * @param {string} title – error heading
 * @param {string} message – error description
 * @param {Function} onRetry – retry button handler
 */
const ErrorState = ({
  title = "Something went wrong",
  message = "An error occurred while loading data. Please try again.",
  onRetry,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/80 px-6 py-16 text-center shadow-sm dark:border-red-900/30 dark:bg-red-950/20"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 shadow-sm ring-1 ring-red-200 dark:bg-red-900/40 dark:ring-red-900/60">
        <FiAlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mb-6 max-w-sm text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry}>
          <FiRefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default ErrorState;
