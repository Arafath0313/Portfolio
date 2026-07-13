import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiMail, FiTrash2 } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import contactMessageService from "../../../services/contactMessageService";
import { CONTACT_STATUSES, getEnumLabel } from "../../../constants/enums";
import { formatDateTime, getApiError } from "../../../utils/apiHelpers";
import { notifyError, notifySuccess } from "../../../utils/toast";
import useConfirmation from "../../../hooks/useConfirmation";

const MessageView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const confirmation = useConfirmation();

  useEffect(() => {
    contactMessageService.getById(id).then(setData).catch(setError).finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    const confirmed = await confirmation.confirm({
      title: "Delete Message?",
      message: "This action cannot be undone.",
    });
    if (!confirmed) return;

    confirmation.setLoading(true);
    try {
      await contactMessageService.remove(id);
      notifySuccess("Message deleted successfully.");
      navigate("/admin/messages");
    } catch (err) {
      notifyError(getApiError(err).message);
    } finally {
      confirmation.setLoading(false);
    }
  };

  if (loading) return <div className="flex min-h-[40vh] items-center justify-center"><Loader size="lg" /></div>;
  if (error) return <ErrorState title="Not found" message={getApiError(error).message} onRetry={() => window.location.reload()} />;

  const statusVariant = data.status === "NEW" ? "primary" : data.status === "REPLIED" ? "success" : "default";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link to="/admin/messages" className="text-sm text-slate-500">← Back to Messages</Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{data.subject}</h1>
        </div>
        <Button variant="danger" size="sm" onClick={handleDelete}>
          <FiTrash2 className="mr-1.5 h-4 w-4" />Delete
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6 flex flex-wrap gap-2">
          <Badge variant={statusVariant}>{getEnumLabel(CONTACT_STATUSES, data.status)}</Badge>
          {data.replied && <Badge variant="success">Replied</Badge>}
        </div>

        <dl className="grid gap-4 sm:grid-cols-2 text-sm mb-6">
          <div><dt className="text-slate-500">From</dt><dd className="font-medium">{data.name}</dd></div>
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd>
              <a href={`mailto:${data.email}`} className="font-medium text-blue-600 hover:underline inline-flex items-center gap-1">
                <FiMail className="h-3.5 w-3.5" />{data.email}
              </a>
            </dd>
          </div>
          {data.phone && <div><dt className="text-slate-500">Phone</dt><dd className="font-medium">{data.phone}</dd></div>}
          <div><dt className="text-slate-500">Received</dt><dd className="font-medium">{formatDateTime(data.receivedAt)}</dd></div>
        </dl>

        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50">
          <p className="whitespace-pre-wrap text-slate-800 dark:text-slate-200">{data.message}</p>
        </div>

        {data.status === "NEW" && (
          <p className="mt-4 text-xs text-yellow-600 dark:text-yellow-400">
            Note: The backend does not expose status update fields. Mark-as-read must be added server-side.
          </p>
        )}
      </Card>

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

export default MessageView;
