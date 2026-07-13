import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiEdit2, FiExternalLink } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import StatusChip from "../../../components/ui/StatusChip";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import certificationService from "../../../services/certificationService";
import { buildMediaUrl, formatDate, formatDateTime, getApiError } from "../../../utils/apiHelpers";

const CertificationView = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    certificationService.getById(id).then(setData).catch(setError).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex min-h-[40vh] items-center justify-center"><Loader size="lg" /></div>;
  if (error) return <ErrorState title="Not found" message={getApiError(error).message} onRetry={() => window.location.reload()} />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link to="/admin/certifications" className="text-sm text-slate-500">← Back</Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{data.title}</h1>
        </div>
        <Link to={`/admin/certifications/${id}/edit`}><Button size="sm"><FiEdit2 className="mr-1.5 h-4 w-4" />Edit</Button></Link>
      </div>
      <Card className="p-6">
        {data.imageUrl && (
          <img src={buildMediaUrl(data.imageUrl)} alt={data.title} className="mb-6 h-48 rounded-xl object-contain" />
        )}
        <dl className="space-y-3 text-sm">
          <div><span className="font-medium text-slate-500">Organization:</span> {data.issuer}</div>
          <div><span className="font-medium text-slate-500">Issue Date:</span> {formatDate(data.issueDate)}</div>
          <div><span className="font-medium text-slate-500">Expiry:</span> {formatDate(data.expiryDate)}</div>
          <div><span className="font-medium text-slate-500">Credential ID:</span> {data.credentialId || "—"}</div>
          {data.credentialUrl && (
            <div>
              <a href={data.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">
                View Credential <FiExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
          <div><StatusChip active={data.active} /></div>
          <div className="text-slate-400 text-xs">Updated {formatDateTime(data.updatedAt)}</div>
        </dl>
      </Card>
    </div>
  );
};

export default CertificationView;
