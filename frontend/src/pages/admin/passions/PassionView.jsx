import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiEdit2, FiExternalLink } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import StatusChip from "../../../components/ui/StatusChip";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import passionService from "../../../services/passionService";
import { PASSION_CATEGORIES, CONTENT_PLATFORMS, getEnumLabel } from "../../../constants/enums";
import { formatDateTime, getApiError } from "../../../utils/apiHelpers";

const DetailRow = ({ label, value }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-slate-100 dark:border-slate-700 last:border-0">
    <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</dt>
    <dd className="mt-1 text-sm text-slate-900 dark:text-white sm:col-span-2 sm:mt-0">{value ?? "—"}</dd>
  </div>
);

const PassionView = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    passionService
      .getById(id)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Passion not found"
        message={getApiError(error).message}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link to="/admin/passions" className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400">
            ← Back to Passions
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{data.title}</h1>
        </div>
        <Link to={`/admin/passions/${id}/edit`}>
          <Button size="sm">
            <FiEdit2 className="mr-1.5 h-4 w-4" />
            Edit
          </Button>
        </Link>
      </div>

      <Card className="p-6">
        <dl>
          <DetailRow label="Category" value={getEnumLabel(PASSION_CATEGORIES, data.category)} />
          <DetailRow label="Platform" value={getEnumLabel(CONTENT_PLATFORMS, data.contentPlatform)} />
          <DetailRow label="Display Order" value={data.displayOrder} />
          <DetailRow label="Active Status" value={<StatusChip active={data.active} />} />
          <DetailRow label="Featured in Category" value={data.featured ? "Yes" : "No"} />
          <DetailRow label="Featured on Home" value={data.featuredHome ? "Yes" : "No"} />
          
          <DetailRow 
            label="External URL" 
            value={data.externalUrl ? (
              <a href={data.externalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2">
                {data.externalUrl} <FiExternalLink />
              </a>
            ) : "—"} 
          />
          
          <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-slate-100 dark:border-slate-700 last:border-0">
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Description</dt>
            <dd className="mt-1 text-sm text-slate-900 dark:text-white sm:col-span-2 sm:mt-0 whitespace-pre-wrap">{data.description || "—"}</dd>
          </div>

          <DetailRow label="Created" value={formatDateTime(data.createdAt)} />
          <DetailRow label="Updated" value={formatDateTime(data.updatedAt)} />
        </dl>
        
        {data.thumbnail && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Thumbnail</h3>
            <img src={data.thumbnail?.startsWith("http") ? data.thumbnail : `http://localhost:8080${data.thumbnail}`} alt="Thumbnail" className="max-w-md rounded-xl border border-slate-200 dark:border-slate-700" />
          </div>
        )}
      </Card>
    </div>
  );
};

export default PassionView;
