import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminFormLayout from "../../../components/admin/AdminFormLayout";
import FormField from "../../../components/form/FormField";
import TextField from "../../../components/form/TextField";
import Textarea from "../../../components/form/Textarea";
import FormSwitch from "../../../components/form/FormSwitch";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import useFormWithValidation from "../../../hooks/useFormWithValidation";
import { youtubeSchema } from "../../../schemas";
import youtubeService from "../../../services/youtubeService";
import { getApiError } from "../../../utils/apiHelpers";
import { notifySuccess } from "../../../utils/toast";

const defaultValues = {
  title: "",
  videoId: "",
  thumbnailUrl: "",
  description: "",
  publishedAt: "",
  displayOrder: 0,
  featured: false,
  active: true,
};

const YouTubeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const { register, control, handleSubmit, reset, formState: { errors }, applyBackendErrors } =
    useFormWithValidation(youtubeSchema, defaultValues);

  useEffect(() => {
    if (!isEdit) return;
    youtubeService.getById(id).then((data) => reset(data)).catch(setLoadError).finally(() => setLoading(false));
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (isEdit) {
        await youtubeService.update(id, data);
        notifySuccess("Video updated successfully.");
      } else {
        await youtubeService.create(data);
        notifySuccess("Video created successfully.");
      }
      navigate("/admin/youtube");
    } catch (err) {
      applyBackendErrors(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex min-h-[40vh] items-center justify-center"><Loader size="lg" /></div>;
  if (loadError) return <ErrorState title="Failed to load" message={getApiError(loadError).message} onRetry={() => window.location.reload()} />;

  return (
    <AdminFormLayout title={isEdit ? "Edit Video" : "Add Video"} backTo="/admin/youtube" onSubmit={handleSubmit(onSubmit)} loading={submitting}>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Title" name="title" required error={errors.title}>
          <TextField id="title" error={errors.title} {...register("title")} />
        </FormField>
        <FormField label="Video ID" name="videoId" required error={errors.videoId} hint="YouTube video ID from the URL">
          <TextField id="videoId" error={errors.videoId} {...register("videoId")} placeholder="dQw4w9WgXcQ" />
        </FormField>
        <FormField label="Thumbnail URL" name="thumbnailUrl" error={errors.thumbnailUrl}>
          <TextField id="thumbnailUrl" error={errors.thumbnailUrl} {...register("thumbnailUrl")} />
        </FormField>
        <FormField label="Published Date" name="publishedAt" error={errors.publishedAt}>
          <TextField id="publishedAt" type="date" error={errors.publishedAt} {...register("publishedAt")} />
        </FormField>
        <FormField label="Display Order" name="displayOrder" required error={errors.displayOrder}>
          <TextField id="displayOrder" type="number" min="0" error={errors.displayOrder} {...register("displayOrder")} />
        </FormField>
        <div className="md:col-span-2">
          <FormField label="Description" name="description" error={errors.description}>
            <Textarea id="description" error={errors.description} {...register("description")} />
          </FormField>
        </div>
        <FormSwitch control={control} name="featured" label="Featured" error={errors.featured} />
        <FormSwitch control={control} name="active" label="Active" error={errors.active} />
      </div>
    </AdminFormLayout>
  );
};

export default YouTubeForm;
