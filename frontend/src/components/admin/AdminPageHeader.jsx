import { Link } from "react-router-dom";
import { FiArrowLeft, FiPlus, FiRefreshCw } from "react-icons/fi";
import Button from "../ui/Button";

const AdminPageHeader = ({
  title,
  description,
  backTo,
  createTo,
  createLabel = "Create New",
  onRefresh,
  refreshing = false,
  actions,
}) => (
  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      {backTo && (
        <Link
          to={backTo}
          className="mb-2 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back
        </Link>
      )}
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
      {description && (
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      )}
    </div>
    <div className="flex flex-wrap items-center gap-2">
      {onRefresh && (
        <Button variant="outline" size="sm" onClick={onRefresh} loading={refreshing}>
          <FiRefreshCw className="mr-1.5 h-4 w-4" />
          Refresh
        </Button>
      )}
      {actions}
      {createTo && (
        <Link to={createTo}>
          <Button size="sm">
            <FiPlus className="mr-1.5 h-4 w-4" />
            {createLabel}
          </Button>
        </Link>
      )}
    </div>
  </div>
);

export default AdminPageHeader;
