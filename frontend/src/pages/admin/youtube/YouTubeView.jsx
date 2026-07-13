import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import StatusChip from "../../../components/ui/StatusChip";
import Badge from "../../../components/ui/Badge";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import youtubeService from "../../../services/youtubeService";
import { formatDate, formatDateTime, getApiError } from "../../../utils/apiHelpers";

const YouTubeView = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    youtubeService.getById(id).then(setData).catch(setError).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex min-h-[40vh] items-center justify-center"><Loader size="lg" /></div>;
  if (error) return <ErrorState title="Not found" message={getApiError(error).message} onRetry={() => window.location.reload()} />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link to="/admin/youtube" className="text-sm text-slate-500">← Back</Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{data.title}</h1>
        </div>
        <Link to={`/admin/youtube/${id}/edit`}><Button size="sm"><FiEdit2 className="mr-1.5 h-4 w-4" />Edit</Button></Link>
      </div>
      <Card className="p-6 space-y-4">
        <div className="flex gap-2">
          {data.featured && <Badge variant="primary">Featured</Badge>}
          <StatusChip active={data.active} />
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-xl">
          <iframe
            title={data.title}
            src={`https://www.youtube.com/embed/${data.videoId}`}
            className="h-full w-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
        {data.description && <p className="text-slate-600 dark:text-slate-300">{data.description}</p>}
        <p className="text-sm text-slate-500">Published {formatDate(data.publishedAt)} · Updated {formatDateTime(data.updatedAt)}</p>
      </Card>
    </div>
  );
};

export default YouTubeView;
