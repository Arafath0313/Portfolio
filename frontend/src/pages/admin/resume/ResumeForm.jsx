import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminFormLayout from "../../../components/admin/AdminFormLayout";
import FormField from "../../../components/form/FormField";
import TextField from "../../../components/form/TextField";
import Select from "../../../components/form/Select";
import FormSwitch from "../../../components/form/FormSwitch";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import useFormWithValidation from "../../../hooks/useFormWithValidation";
import { resumeSchema } from "../../../schemas";
import resumeService from "../../../services/resumeService";
import { FILE_TYPES } from "../../../constants/enums";
import { getApiError } from "../../../utils/apiHelpers";
import { notifySuccess } from "../../../utils/toast";

const ResumeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const { register, control, handleSubmit, reset, formState: { errors }, applyBackendErrors } =
    useFormWithValidation(resumeSchema, {});

  useEffect(() => {
    resumeService.getById(id).then((data) => reset(data)).catch(setLoadError).finally(() => setLoading(false));
  }, [id, reset]);

  const onSubmit = async (data) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await resumeService.update(id, data);
      notifySuccess("Resume metadata updated successfully.");
      navigate("/admin/resume");
    } catch (err) {
      applyBackendErrors(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex min-h-[40vh] items-center justify-center"><Loader size="lg" /></div>;
  if (loadError) return <ErrorState title="Failed to load" message={getApiError(loadError).message} onRetry={() => window.location.reload()} />;

  return (
    <AdminFormLayout title="Edit Resume Metadata" backTo="/admin/resume" onSubmit={handleSubmit(onSubmit)} loading={submitting}>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="File Name" name="fileName" required error={errors.fileName}>
          <TextField id="fileName" error={errors.fileName} {...register("fileName")} />
        </FormField>
        <FormField label="File URL" name="fileUrl" required error={errors.fileUrl}>
          <TextField id="fileUrl" error={errors.fileUrl} {...register("fileUrl")} />
        </FormField>
        <FormField label="File Type" name="fileType" required error={errors.fileType}>
          <Select id="fileType" error={errors.fileType} {...register("fileType")}>
            {FILE_TYPES.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </Select>
        </FormField>
        <FormField label="File Size (bytes)" name="fileSize" required error={errors.fileSize}>
          <TextField id="fileSize" type="number" error={errors.fileSize} {...register("fileSize")} />
        </FormField>
        <FormField label="Version" name="version" error={errors.version}>
          <TextField id="version" error={errors.version} {...register("version")} />
        </FormField>
        <FormSwitch control={control} name="active" label="Active" error={errors.active} />
      </div>
    </AdminFormLayout>
  );
};

export default ResumeForm;
