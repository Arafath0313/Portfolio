import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminFormLayout from "../../../components/admin/AdminFormLayout";
import FormField from "../../../components/form/FormField";
import TextField from "../../../components/form/TextField";
import FormSwitch from "../../../components/form/FormSwitch";
import ImageUploader from "../../../components/upload/ImageUploader";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import useFormWithValidation from "../../../hooks/useFormWithValidation";
import { certificationSchema } from "../../../schemas";
import certificationService from "../../../services/certificationService";
import { getApiError } from "../../../utils/apiHelpers";
import { notifySuccess, notifyError } from "../../../utils/toast";

const defaultValues = {
  title: "",
  issuer: "",
  issueDate: "",
  expiryDate: "",
  credentialId: "",
  credentialUrl: "",
  imageUrl: "",
  displayOrder: 0,
  active: true,
};

const CertificationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { register, control, handleSubmit, reset, setValue, watch, formState: { errors }, applyBackendErrors } =
    useFormWithValidation(certificationSchema, defaultValues);

  const imageUrl = watch("imageUrl");

  useEffect(() => {
    if (!isEdit) return;
    certificationService
      .getById(id)
      .then((data) => reset(data))
      .catch((err) => setLoadError(err))
      .finally(() => setLoading(false));
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      let savedId = id;
      if (isEdit) {
        await certificationService.update(id, data);
        notifySuccess("Certification updated successfully.");
      } else {
        const created = await certificationService.create(data);
        savedId = created.id;
        notifySuccess("Certification created successfully.");
      }

      if (selectedFile) {
        await certificationService.uploadImage(savedId, selectedFile);
        notifySuccess("Certificate image uploaded successfully.");
      }

      navigate("/admin/certifications");
    } catch (err) {
      applyBackendErrors(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageSelect = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      notifyError("File size must be less than 5MB.");
      throw new Error("File size exceeded");
    }
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      notifyError("Invalid file type. Only JPG, PNG, and WEBP are allowed.");
      throw new Error("Invalid file type");
    }

    setSelectedFile(file);
    return Promise.resolve(); // ImageUploader expects a promise
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setValue("imageUrl", "");
  };

  if (loading) {
    return <div className="flex min-h-[40vh] items-center justify-center"><Loader size="lg" /></div>;
  }

  if (loadError) {
    return <ErrorState title="Failed to load" message={getApiError(loadError).message} onRetry={() => window.location.reload()} />;
  }

  return (
    <AdminFormLayout
      title={isEdit ? "Edit Certification" : "Create Certification"}
      backTo="/admin/certifications"
      onSubmit={handleSubmit(onSubmit)}
      loading={submitting}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Title" name="title" required error={errors.title}>
          <TextField id="title" error={errors.title} {...register("title")} />
        </FormField>
        <FormField label="Organization" name="issuer" required error={errors.issuer}>
          <TextField id="issuer" error={errors.issuer} {...register("issuer")} />
        </FormField>
        <FormField label="Issue Date" name="issueDate" required error={errors.issueDate}>
          <TextField id="issueDate" type="date" error={errors.issueDate} {...register("issueDate")} />
        </FormField>
        <FormField label="Expiry Date" name="expiryDate" error={errors.expiryDate}>
          <TextField id="expiryDate" type="date" error={errors.expiryDate} {...register("expiryDate")} />
        </FormField>
        <FormField label="Credential ID" name="credentialId" error={errors.credentialId}>
          <TextField id="credentialId" error={errors.credentialId} {...register("credentialId")} />
        </FormField>
        <FormField label="Credential URL" name="credentialUrl" error={errors.credentialUrl}>
          <TextField id="credentialUrl" error={errors.credentialUrl} {...register("credentialUrl")} />
        </FormField>
        <FormField label="Display Order" name="displayOrder" required error={errors.displayOrder}>
          <TextField id="displayOrder" type="number" min="0" error={errors.displayOrder} {...register("displayOrder")} />
        </FormField>
        <FormSwitch control={control} name="active" label="Active" error={errors.active} />
      </div>

      <div className="border-t border-slate-200 pt-6 dark:border-slate-700 mt-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Certificate Image</h3>
        <ImageUploader
          value={imageUrl}
          onUpload={handleImageSelect}
          onRemove={handleRemoveImage}
        />
      </div>
    </AdminFormLayout>
  );
};

export default CertificationForm;
