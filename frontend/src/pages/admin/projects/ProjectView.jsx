import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiEdit2, FiExternalLink } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import StatusChip from "../../../components/ui/StatusChip";
import Badge from "../../../components/ui/Badge";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import projectService from "../../../services/projectService";
import { PROJECT_STATUSES, getEnumLabel } from "../../../constants/enums";
import { buildMediaUrl, formatDateTime, getApiError } from "../../../utils/apiHelpers";

const DetailRow = ({ label, value }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-slate-100 dark:border-slate-700 last:border-0">
    <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</dt>
    <dd className="mt-1 text-sm text-slate-900 dark:text-white sm:col-span-2 sm:mt-0">{value ?? "—"}</dd>
  </div>
);

const ProjectView = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    projectService
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
        title="Project not found"
        message={getApiError(error).message}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link to="/admin/projects" className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400">
            ← Back to Projects
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{data.title}</h1>
        </div>
        <Link to={`/admin/projects/${id}/edit`}>
          <Button size="sm">
            <FiEdit2 className="mr-1.5 h-4 w-4" />
            Edit
          </Button>
        </Link>
      </div>

      <Card className="p-6">
        {data.thumbnailUrl && (
          <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
            <img
              src={buildMediaUrl(data.thumbnailUrl)}
              alt={data.title}
              className="h-56 w-full object-contain bg-slate-50 dark:bg-slate-800/50"
            />
          </div>
        )}
        <dl>
          <DetailRow label="Slug" value={data.slug} />
          <DetailRow label="Short Description" value={data.shortDescription} />
          <DetailRow label="Description" value={<p className="whitespace-pre-wrap">{data.description}</p>} />
          <DetailRow label="Technologies" value={data.technologies} />
          <DetailRow label="Status" value={getEnumLabel(PROJECT_STATUSES, data.status)} />
          <DetailRow label="Featured" value={data.featured ? <Badge variant="primary">Yes</Badge> : <Badge>No</Badge>} />
          <DetailRow label="Active" value={<StatusChip active={data.active} />} />
          <DetailRow label="Display Order" value={data.displayOrder} />
          <DetailRow
            label="GitHub"
            value={
              data.githubUrl ? (
                <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                  {data.githubUrl} <FiExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : "—"
            }
          />
          <DetailRow
            label="Live Demo"
            value={
              data.liveDemoUrl ? (
                <a href={data.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                  {data.liveDemoUrl} <FiExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : "—"
            }
          />
          <DetailRow label="Created" value={formatDateTime(data.createdAt)} />
          <DetailRow label="Updated" value={formatDateTime(data.updatedAt)} />
        </dl>
      </Card>
    </div>
  );
};

export default ProjectView;
