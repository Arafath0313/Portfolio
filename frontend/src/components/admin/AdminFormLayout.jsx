import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Card from "../ui/Card";

const AdminFormLayout = ({
  title,
  backTo,
  onSubmit,
  loading,
  submitLabel = "Save",
  children,
}) => (
  <div>
    <div className="mb-6">
      {backTo && (
        <Link
          to={backTo}
          className="mb-2 inline-block text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400"
        >
          ← Back to list
        </Link>
      )}
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
    </div>

    <Card className="p-6">
      <form onSubmit={onSubmit} className="space-y-6">
        {children}
        <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-700 sm:flex-row sm:justify-end">
          <Link to={backTo}>
            <Button type="button" variant="outline" fullWidth className="sm:w-auto">
              Cancel
            </Button>
          </Link>
          <Button type="submit" loading={loading} fullWidth className="sm:w-auto">
            {submitLabel}
          </Button>
        </div>
      </form>
    </Card>
  </div>
);

export default AdminFormLayout;
