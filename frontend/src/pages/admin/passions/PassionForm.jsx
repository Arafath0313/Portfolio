import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminFormLayout from "../../../components/admin/AdminFormLayout";
import FormField from "../../../components/form/FormField";
import TextField from "../../../components/form/TextField";
import Textarea from "../../../components/form/Textarea";
import Select from "../../../components/form/Select";
import FormSwitch from "../../../components/form/FormSwitch";
import ImageUploader from "../../../components/upload/ImageUploader";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import useFormWithValidation from "../../../hooks/useFormWithValidation";
import { passionSchema } from "../../../schemas";
import passionService from "../../../services/passionService";
import { PASSION_CATEGORIES, CONTENT_PLATFORMS } from "../../../constants/enums";
import { getApiError } from "../../../utils/apiHelpers";
import { notifySuccess, notifyError } from "../../../utils/toast";

const defaultValues = {
  title: "",
  description: "",
  category: "CONTENT_CREATION",
  contentPlatform: "NONE",
  thumbnail: "",
  externalUrl: "",
  featured: false,
  featuredHome: false,
  active: true,
  displayOrder: 0,
};

const PassionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [pendingThumbnail, setPendingThumbnail] = useState(null);

  const { register, control, handleSubmit, reset, watch, formState: { errors }, applyBackendErrors, setValue } =
    useFormWithValidation(passionSchema, defaultValues);

  useEffect(() => {
    if (!isEdit) return;
    passionService
      .getById(id)
      .then((data) => reset(data))
      .catch((err) => setLoadError(err))
      .finally(() => setLoading(false));
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (isEdit) {
        await passionService.update(id, data);
        notifySuccess("Passion updated successfully.");
        navigate("/admin/passions");
      } else {
        const created = await passionService.create(data);
        notifySuccess("Passion created successfully.");
        if (pendingThumbnail) {
          await passionService.uploadThumbnail(created.id, pendingThumbnail);
          notifySuccess("Thumbnail uploaded successfully.");
        }
        navigate(`/admin/passions/${created.id}/edit`);
      }
    } catch (err) {
      applyBackendErrors(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleThumbnailSelect = async (file, onProgress) => {
    if (file.size > 5 * 1024 * 1024) {
      notifyError("File size must be less than 5MB.");
      throw new Error("File size exceeded");
    }
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      notifyError("Invalid file type. Only JPG, PNG, and WebP are allowed.");
      throw new Error("Invalid file type");
    }

    if (isEdit) {
      const result = await passionService.uploadThumbnail(id, file, onProgress);
      setValue("thumbnail", result.url);
      notifySuccess("Thumbnail uploaded successfully.");
    } else {
      setPendingThumbnail(file);
    }
  };

  const handleRemoveThumbnail = () => {
    setPendingThumbnail(null);
    setValue("thumbnail", "");
  };

  const currentThumbnail = watch("thumbnail");

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (loadError) {
    return (
      <ErrorState
        title="Failed to load passion"
        message={getApiError(loadError).message}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <AdminFormLayout
      title={isEdit ? "Edit Passion" : "Create Passion"}
      backTo="/admin/passions"
      onSubmit={handleSubmit(onSubmit)}
      loading={submitting}
      submitLabel={isEdit ? "Update Passion" : "Create Passion"}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <FormField label="Title" name="title" required error={errors.title}>
            <TextField id="title" error={errors.title} {...register("title")} />
          </FormField>
        </div>

        <div className="md:col-span-2">
          <FormField label="Description" name="description" error={errors.description}>
            <Textarea id="description" rows={5} error={errors.description} {...register("description")} />
          </FormField>
        </div>

        <div className="md:col-span-2">
          <FormField label="External URL" name="externalUrl" error={errors.externalUrl}>
            <TextField id="externalUrl" error={errors.externalUrl} {...register("externalUrl")} />
          </FormField>
        </div>

        <FormField label="Category" name="category" required error={errors.category}>
          <Select id="category" error={errors.category} {...register("category")}>
            {PASSION_CATEGORIES.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </FormField>

        <FormField label="Platform" name="contentPlatform" required error={errors.contentPlatform}>
          <Select id="contentPlatform" error={errors.contentPlatform} {...register("contentPlatform")}>
            {CONTENT_PLATFORMS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </FormField>

        <FormField label="Display Order" name="displayOrder" required error={errors.displayOrder}>
          <TextField id="displayOrder" type="number" min="0" error={errors.displayOrder} {...register("displayOrder")} />
        </FormField>

        <div className="flex flex-col gap-4">
          <FormSwitch control={control} name="featured" label="Featured in Category" error={errors.featured} />
          <FormSwitch control={control} name="featuredHome" label="Featured on Home" error={errors.featuredHome} />
          <FormSwitch control={control} name="active" label="Active" error={errors.active} />
        </div>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-700">
        <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Thumbnail</h3>
        <ImageUploader 
          value={pendingThumbnail ? null : currentThumbnail}
          onUpload={handleThumbnailSelect} 
          onRemove={handleRemoveThumbnail}
          label="Upload Thumbnail" 
          previewClassName="h-48 w-full max-w-sm"
        />
        {!isEdit && pendingThumbnail && (
          <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
            Thumbnail staged — will be uploaded after the passion is created.
          </p>
        )}
      </div>
    </AdminFormLayout>
  );
};

export default PassionForm;
