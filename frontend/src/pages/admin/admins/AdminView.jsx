import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import StatusChip from "../../../components/ui/StatusChip";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import adminService from "../../../services/adminService";
import { formatDateTime, getApiError } from "../../../utils/apiHelpers";

const AdminView = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    adminService.getById(id).then(setData).catch(setError).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex min-h-[40vh] items-center justify-center"><Loader size="lg" /></div>;
  if (error) return <ErrorState title="Not found" message={getApiError(error).message} onRetry={() => window.location.reload()} />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link to="/admin/admins" className="text-sm text-slate-500">← Back</Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{data.username}</h1>
        </div>
        <Link to={`/admin/admins/${id}/edit`}><Button size="sm"><FiEdit2 className="mr-1.5 h-4 w-4" />Edit</Button></Link>
      </div>
      <Card className="p-6 space-y-3 text-sm">
        <div><span className="text-slate-500">Email:</span> {data.email}</div>
        <div><Badge variant="purple">{data.role}</Badge></div>
        <div><StatusChip active={data.enabled} /></div>
        <div><span className="text-slate-500">Last Login:</span> {formatDateTime(data.lastLogin)}</div>
        <div className="text-xs text-slate-400">Created {formatDateTime(data.createdAt)}</div>
      </Card>
    </div>
  );
};

export default AdminView;
