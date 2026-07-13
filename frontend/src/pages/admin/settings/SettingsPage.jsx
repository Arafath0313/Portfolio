import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiPlus } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import StatusChip from "../../../components/ui/StatusChip";
import ImageUploader from "../../../components/upload/ImageUploader";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import EmptyState from "../../../components/common/EmptyState";
import AdminPageHeader from "../../../components/admin/AdminPageHeader";
import siteSettingService from "../../../services/siteSettingService";
import { formatDateTime, getApiError } from "../../../utils/apiHelpers";
import { notifySuccess } from "../../../utils/toast";

const SettingsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await siteSettingService.get();
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

  const handleLogoUpload = async (file, onProgress) => {
    const result = await siteSettingService.uploadLogo(file, onProgress);
    notifySuccess("Logo uploaded successfully.");
    setData((prev) => ({ ...prev, logoUrl: result.url }));
  };

  const handleFaviconUpload = async (file, onProgress) => {
    const result = await siteSettingService.uploadFavicon(file, onProgress);
    notifySuccess("Favicon uploaded successfully.");
    setData((prev) => ({ ...prev, faviconUrl: result.url }));
  };

  if (loading) return <div className="flex min-h-[40vh] items-center justify-center"><Loader size="lg" /></div>;
  if (error) return <ErrorState title="Failed to load" message={getApiError(error).message} onRetry={load} />;

  if (!data) {
    return (
      <div>
        <AdminPageHeader title="Site Settings" description="Configure global site settings." />
        <EmptyState title="No settings configured" description="Create site settings to configure your portfolio." />
        <div className="mt-4 flex justify-center">
          <Link to="/admin/settings/create"><Button><FiPlus className="mr-1.5 h-4 w-4" />Create Settings</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Site Settings"
        description="Global configuration for your portfolio site."
        onRefresh={load}
        actions={
          <Link to={`/admin/settings/${data.id}/edit`}>
            <Button size="sm"><FiEdit2 className="mr-1.5 h-4 w-4" />Edit Settings</Button>
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">General</h3>
          <dl className="space-y-3 text-sm">
            <div><dt className="text-slate-500">Site Title</dt><dd className="font-medium">{data.siteTitle}</dd></div>
            <div><dt className="text-slate-500">Contact Email</dt><dd className="font-medium">{data.contactEmail}</dd></div>
            <div><dt className="text-slate-500">Contact Phone</dt><dd className="font-medium">{data.contactPhone || "—"}</dd></div>
            <div><dt className="text-slate-500">Address</dt><dd className="font-medium">{data.address || "—"}</dd></div>
            <div><dt className="text-slate-500">Footer Text</dt><dd className="font-medium">{data.footerText || "—"}</dd></div>
            <div><StatusChip active={data.active} /></div>
          </dl>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">SEO</h3>
          <dl className="space-y-3 text-sm">
            <div><dt className="text-slate-500">SEO Title</dt><dd className="font-medium">{data.seoTitle || "—"}</dd></div>
            <div><dt className="text-slate-500">SEO Description</dt><dd className="font-medium">{data.seoDescription || "—"}</dd></div>
          </dl>
          <p className="mt-4 text-xs text-slate-400">Updated {formatDateTime(data.updatedAt)}</p>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">Logo</h3>
          <ImageUploader value={data.logoUrl} onUpload={handleLogoUpload} previewClassName="h-24 w-48" />
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">Favicon</h3>
          <ImageUploader value={data.faviconUrl} onUpload={handleFaviconUpload} previewClassName="h-16 w-16" accept="image/jpeg,image/png,image/webp,image/x-icon" />
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
