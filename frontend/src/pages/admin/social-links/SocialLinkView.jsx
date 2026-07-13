import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiEdit2, FiExternalLink } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import StatusChip from "../../../components/ui/StatusChip";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import socialLinkService from "../../../services/socialLinkService";
import { SOCIAL_PLATFORMS, getEnumLabel } from "../../../constants/enums";
import { formatDateTime, getApiError } from "../../../utils/apiHelpers";

const SocialLinkView = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    socialLinkService.getById(id).then(setData).catch(setError).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex min-h-[40vh] items-center justify-center"><Loader size="lg" /></div>;
  if (error) return <ErrorState title="Not found" message={getApiError(error).message} onRetry={() => window.location.reload()} />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link to="/admin/social-links" className="text-sm text-slate-500">← Back</Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{getEnumLabel(SOCIAL_PLATFORMS, data.platform)}</h1>
        </div>
        <Link to={`/admin/social-links/${id}/edit`}><Button size="sm"><FiEdit2 className="mr-1.5 h-4 w-4" />Edit</Button></Link>
      </div>
      <Card className="p-6 space-y-3 text-sm">
        <div><span className="text-slate-500">URL:</span>{" "}
          <a href={data.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">
            {data.url} <FiExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <div><span className="text-slate-500">Order:</span> {data.displayOrder}</div>
        <div><StatusChip active={data.active} /></div>
        <div className="text-xs text-slate-400">Updated {formatDateTime(data.updatedAt)}</div>
      </Card>
    </div>
  );
};

export default SocialLinkView;
