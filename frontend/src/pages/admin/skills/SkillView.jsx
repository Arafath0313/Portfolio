import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import StatusChip from "../../../components/ui/StatusChip";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import skillService from "../../../services/skillService";
import { SKILL_CATEGORIES, SKILL_LEVELS, getEnumLabel } from "../../../constants/enums";
import { formatDateTime, getApiError } from "../../../utils/apiHelpers";

const DetailRow = ({ label, value }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-slate-100 dark:border-slate-700 last:border-0">
    <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</dt>
    <dd className="mt-1 text-sm text-slate-900 dark:text-white sm:col-span-2 sm:mt-0">{value ?? "—"}</dd>
  </div>
);

const SkillView = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    skillService
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
        title="Skill not found"
        message={getApiError(error).message}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link to="/admin/skills" className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400">
            ← Back to Skills
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{data.name}</h1>
        </div>
        <Link to={`/admin/skills/${id}/edit`}>
          <Button size="sm">
            <FiEdit2 className="mr-1.5 h-4 w-4" />
            Edit
          </Button>
        </Link>
      </div>

      <Card className="p-6">
        <dl>
          <DetailRow label="Category" value={getEnumLabel(SKILL_CATEGORIES, data.category)} />
          <DetailRow label="Level" value={getEnumLabel(SKILL_LEVELS, data.level)} />
          <DetailRow label="Display Order" value={data.displayOrder} />
          <DetailRow label="Status" value={<StatusChip active={data.active} />} />
          <DetailRow label="Icon" value={data.icon} />
          <DetailRow label="Created" value={formatDateTime(data.createdAt)} />
          <DetailRow label="Updated" value={formatDateTime(data.updatedAt)} />
        </dl>
      </Card>
    </div>
  );
};

export default SkillView;
