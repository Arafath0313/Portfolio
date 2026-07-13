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
import { siteSettingSchema } from "../../../schemas";
import siteSettingService from "../../../services/siteSettingService";
import { getApiError } from "../../../utils/apiHelpers";
import { notifySuccess } from "../../../utils/toast";

const defaultValues = {
  siteTitle: "",
  logoUrl: "",
  faviconUrl: "",
  contactEmail: "",
  contactPhone: "",
  address: "",
  seoTitle: "",
  seoDescription: "",
  footerText: "",
  active: true,
};

const SettingsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const { register, control, handleSubmit, reset, formState: { errors }, applyBackendErrors } =
    useFormWithValidation(siteSettingSchema, defaultValues);

  useEffect(() => {
    if (!isEdit) return;
    siteSettingService.getById(id).then((data) => reset(data)).catch(setLoadError).finally(() => setLoading(false));
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (isEdit) {
        await siteSettingService.update(id, data);
        notifySuccess("Settings updated successfully.");
      } else {
        await siteSettingService.create(data);
        notifySuccess("Settings created successfully.");
      }
      navigate("/admin/settings");
    } catch (err) {
      applyBackendErrors(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex min-h-[40vh] items-center justify-center"><Loader size="lg" /></div>;
  if (loadError) return <ErrorState title="Failed to load" message={getApiError(loadError).message} onRetry={() => window.location.reload()} />;

  return (
    <AdminFormLayout title={isEdit ? "Edit Site Settings" : "Create Site Settings"} backTo="/admin/settings" onSubmit={handleSubmit(onSubmit)} loading={submitting}>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Site Title" name="siteTitle" required error={errors.siteTitle}>
          <TextField id="siteTitle" error={errors.siteTitle} {...register("siteTitle")} />
        </FormField>
        <FormField label="Contact Email" name="contactEmail" required error={errors.contactEmail}>
          <TextField id="contactEmail" type="email" error={errors.contactEmail} {...register("contactEmail")} />
        </FormField>
        <FormField label="Contact Phone" name="contactPhone" error={errors.contactPhone}>
          <TextField id="contactPhone" error={errors.contactPhone} {...register("contactPhone")} />
        </FormField>
        <FormField label="Address" name="address" error={errors.address}>
          <TextField id="address" error={errors.address} {...register("address")} />
        </FormField>
        <FormField label="Logo URL" name="logoUrl" error={errors.logoUrl}>
          <TextField id="logoUrl" error={errors.logoUrl} {...register("logoUrl")} />
        </FormField>
        <FormField label="Favicon URL" name="faviconUrl" error={errors.faviconUrl}>
          <TextField id="faviconUrl" error={errors.faviconUrl} {...register("faviconUrl")} />
        </FormField>
        <FormField label="SEO Title" name="seoTitle" error={errors.seoTitle}>
          <TextField id="seoTitle" error={errors.seoTitle} {...register("seoTitle")} />
        </FormField>
        <div className="md:col-span-2">
          <FormField label="SEO Description" name="seoDescription" error={errors.seoDescription}>
            <Textarea id="seoDescription" rows={3} error={errors.seoDescription} {...register("seoDescription")} />
          </FormField>
        </div>
        <div className="md:col-span-2">
          <FormField label="Footer Text" name="footerText" error={errors.footerText}>
            <TextField id="footerText" error={errors.footerText} {...register("footerText")} />
          </FormField>
        </div>
        <FormSwitch control={control} name="active" label="Active" error={errors.active} />
      </div>
    </AdminFormLayout>
  );
};

export default SettingsForm;
