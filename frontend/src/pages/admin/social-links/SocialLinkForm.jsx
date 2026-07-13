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
import { socialLinkSchema } from "../../../schemas";
import socialLinkService from "../../../services/socialLinkService";
import { SOCIAL_PLATFORMS } from "../../../constants/enums";
import { getApiError } from "../../../utils/apiHelpers";
import { notifySuccess } from "../../../utils/toast";

const defaultValues = { platform: "GITHUB", url: "", icon: "", displayOrder: 0, active: true };

const SocialLinkForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const { register, control, handleSubmit, reset, formState: { errors }, applyBackendErrors } =
    useFormWithValidation(socialLinkSchema, defaultValues);

  useEffect(() => {
    if (!isEdit) return;
    socialLinkService.getById(id).then((data) => reset(data)).catch(setLoadError).finally(() => setLoading(false));
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (isEdit) {
        await socialLinkService.update(id, data);
        notifySuccess("Social link updated successfully.");
      } else {
        await socialLinkService.create(data);
        notifySuccess("Social link created successfully.");
      }
      navigate("/admin/social-links");
    } catch (err) {
      applyBackendErrors(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex min-h-[40vh] items-center justify-center"><Loader size="lg" /></div>;
  if (loadError) return <ErrorState title="Failed to load" message={getApiError(loadError).message} onRetry={() => window.location.reload()} />;

  return (
    <AdminFormLayout title={isEdit ? "Edit Social Link" : "Create Social Link"} backTo="/admin/social-links" onSubmit={handleSubmit(onSubmit)} loading={submitting}>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Platform" name="platform" required error={errors.platform}>
          <Select id="platform" error={errors.platform} {...register("platform")}>
            {SOCIAL_PLATFORMS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </Select>
        </FormField>
        <FormField label="URL" name="url" required error={errors.url}>
          <TextField id="url" error={errors.url} {...register("url")} placeholder="https://..." />
        </FormField>
        <FormField label="Icon" name="icon" error={errors.icon}>
          <TextField id="icon" error={errors.icon} {...register("icon")} />
        </FormField>
        <FormField label="Display Order" name="displayOrder" required error={errors.displayOrder}>
          <TextField id="displayOrder" type="number" min="0" error={errors.displayOrder} {...register("displayOrder")} />
        </FormField>
        <FormSwitch control={control} name="active" label="Active" error={errors.active} />
      </div>
    </AdminFormLayout>
  );
};

export default SocialLinkForm;
