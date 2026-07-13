import { FiInbox } from "react-icons/fi";
import { motion } from "framer-motion";
import Button from "../ui/Button";

/**
 * EmptyState – displayed when a list or dataset has no items.
 * @param {React.ReactNode} icon – custom icon (default: FiInbox)
 * @param {string} title – heading text
 * @param {string} description – supporting description
 * @param {string} actionLabel – label for the CTA button
 * @param {Function} onAction – CTA button click handler
 */
const EmptyState = ({
  icon: Icon = FiInbox,
  title = "No data found",
  description = "There is nothing to display here yet.",
  actionLabel,
  onAction,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 px-6 py-16 text-center dark:border-slate-700/50 dark:bg-slate-900/30"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
        <Icon className="h-8 w-8 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mb-6 max-w-sm text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;
