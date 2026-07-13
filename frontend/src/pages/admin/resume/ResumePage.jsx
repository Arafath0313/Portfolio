import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import FileUploader from "../../../components/upload/FileUploader";
import StatusChip from "../../../components/ui/StatusChip";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import EmptyState from "../../../components/common/EmptyState";
import AdminPageHeader from "../../../components/admin/AdminPageHeader";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import resumeService from "../../../services/resumeService";
import aboutService from "../../../services/aboutService";
import { buildMediaUrl, formatDateTime, formatFileSize, getApiError } from "../../../utils/apiHelpers";
import { notifyError, notifySuccess } from "../../../utils/toast";
import useConfirmation from "../../../hooks/useConfirmation";

const ResumePage = () => {
  const [data, setData] = useState(null);
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const confirmation = useConfirmation();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [resume, aboutData] = await Promise.all([
        resumeService.get().catch(() => null),
        aboutService.get().catch(() => null),
      ]);
      setData(resume);
      setAbout(aboutData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

/* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    load();
  }, [load]);

  const handleUpload = async (file, onProgress) => {
    if (!about?.id) {
      notifyError("Please create an About profile before uploading a resume.");
      return;
    }
    const result = await resumeService.upload(about.id, file, "1.0", onProgress);
    notifySuccess("Resume uploaded successfully.");
    await load();
    return result;
  };

  const handleDelete = async () => {
    const confirmed = await confirmation.confirm({
      title: "Delete Resume?",
      message: "This action cannot be undone.",
    });
    if (!confirmed || !data) return;

    confirmation.setLoading(true);
    try {
      await resumeService.remove(data.id);
      notifySuccess("Resume deleted successfully.");
      setData(null);
    } catch (err) {
      notifyError(getApiError(err).message);
    } finally {
      confirmation.setLoading(false);
    }
  };

  if (loading) return <div className="flex min-h-[40vh] items-center justify-center"><Loader size="lg" /></div>;
  if (error) return <ErrorState title="Failed to load" message={getApiError(error).message} onRetry={load} />;

  return (
    <div>
      <AdminPageHeader title="Resume" description="Upload and manage your resume PDF." onRefresh={load} />

      {!about && (
        <div className="mb-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800 dark:border-yellow-900/50 dark:bg-yellow-950/20 dark:text-yellow-300">
          You need an About profile before uploading a resume.{" "}
          <Link to="/admin/about/create" className="font-medium underline">Create profile</Link>
        </div>
      )}

      {!data ? (
        <Card className="p-6">
          <EmptyState title="No resume uploaded" description="Upload your resume PDF to make it available on your portfolio." />
          {about && (
            <div className="mt-6">
              <FileUploader onUpload={handleUpload} label="Upload Resume PDF" />
            </div>
          )}
        </Card>
      ) : (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Current Resume</h2>
            <Link to={`/admin/resume/${data.id}/edit`}>
              <Button size="sm" variant="outline"><FiEdit2 className="mr-1.5 h-4 w-4" />Edit Metadata</Button>
            </Link>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2 text-sm">
            <div><dt className="text-slate-500">File Name</dt><dd className="font-medium">{data.fileName}</dd></div>
            <div><dt className="text-slate-500">File Type</dt><dd className="font-medium">{data.fileType}</dd></div>
            <div><dt className="text-slate-500">File Size</dt><dd className="font-medium">{formatFileSize(data.fileSize)}</dd></div>
            <div><dt className="text-slate-500">Version</dt><dd className="font-medium">{data.version || "—"}</dd></div>
            <div><dt className="text-slate-500">Status</dt><dd><StatusChip active={data.active} /></dd></div>
            <div><dt className="text-slate-500">Updated</dt><dd className="font-medium">{formatDateTime(data.updatedAt)}</dd></div>
          </dl>

          <FileUploader
            fileName={data.fileName}
            fileUrl={data.fileUrl}
            fileSize={data.fileSize}
            onUpload={handleUpload}
            onRemove={handleDelete}
          />

          {data.fileUrl && (
            <a href={buildMediaUrl(data.fileUrl)} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">Preview / Download PDF</Button>
            </a>
          )}
        </Card>
      )}

      <ConfirmDialog
        isOpen={confirmation.isOpen}
        title={confirmation.title}
        message={confirmation.message}
        loading={confirmation.loading}
        onConfirm={confirmation.handleConfirm}
        onCancel={confirmation.handleCancel}
      />
    </div>
  );
};

export default ResumePage;
