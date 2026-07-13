import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiPlus, FiUser } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import EmptyState from "../../../components/common/EmptyState";
import AdminPageHeader from "../../../components/admin/AdminPageHeader";
import aboutService from "../../../services/aboutService";
import { buildMediaUrl, formatDateTime, getApiError } from "../../../utils/apiHelpers";

const AboutPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await aboutService.get();
      setData(result);
    } catch (err) {
      if (err.response?.status === 404) setData(null);
      else setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

/* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <div className="flex min-h-[40vh] items-center justify-center"><Loader size="lg" /></div>;
  if (error) return <ErrorState title="Failed to load" message={getApiError(error).message} onRetry={load} />;

  if (!data) {
    return (
      <div>
        <AdminPageHeader title="About Me" description="Manage your profile information." />
        <EmptyState
          title="No profile yet"
          description="Create your about profile to get started."
        />
        <div className="mt-4 flex justify-center">
          <Link to="/admin/about/create">
            <Button><FiPlus className="mr-1.5 h-4 w-4" />Create Profile</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="About Me"
        description="Your portfolio profile information."
        onRefresh={load}
        actions={
          <Link to={`/admin/about/${data.id}/edit`}>
            <Button size="sm"><FiEdit2 className="mr-1.5 h-4 w-4" />Edit Profile</Button>
          </Link>
        }
      />
      <Card className="p-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          {data.profileImage ? (
            <img src={buildMediaUrl(data.profileImage)} alt={data.fullName} className="h-32 w-32 rounded-full object-cover" />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700">
              <FiUser className="h-12 w-12 text-slate-400" />
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{data.fullName}</h2>
            <p className="text-blue-600 dark:text-blue-400">{data.headline}</p>
            <p className="mt-4 text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{data.bio}</p>
          </div>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 text-sm">
          <div><dt className="text-slate-500">Email</dt><dd className="font-medium">{data.email}</dd></div>
          <div><dt className="text-slate-500">Phone</dt><dd className="font-medium">{data.phone || "—"}</dd></div>
          <div><dt className="text-slate-500">Location</dt><dd className="font-medium">{data.location || "—"}</dd></div>
          <div><dt className="text-slate-500">Address</dt><dd className="font-medium">{data.address || "—"}</dd></div>
        </dl>
        <p className="mt-4 text-xs text-slate-400">Updated {formatDateTime(data.updatedAt)}</p>
      </Card>
    </div>
  );
};

export default AboutPage;
