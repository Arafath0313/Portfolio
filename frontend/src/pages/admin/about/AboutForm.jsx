import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminFormLayout from "../../../components/admin/AdminFormLayout";
import FormField from "../../../components/form/FormField";
import TextField from "../../../components/form/TextField";
import Textarea from "../../../components/form/Textarea";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import useFormWithValidation from "../../../hooks/useFormWithValidation";
import { aboutSchema } from "../../../schemas";
import aboutService from "../../../services/aboutService";
import { getApiError } from "../../../utils/apiHelpers";
import { notifySuccess } from "../../../utils/toast";

const defaultValues = {
  fullName: "",
  headline: "",
  bio: "",
  email: "",
  phone: "",
  location: "",
  address: "",
  profileImage: "",
  coverImage: "",
};

const AboutForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const { register, handleSubmit, reset, formState: { errors }, applyBackendErrors } =
    useFormWithValidation(aboutSchema, defaultValues);

  useEffect(() => {
    if (!isEdit) return;
    aboutService.getById(id).then((data) => reset(data)).catch(setLoadError).finally(() => setLoading(false));
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (isEdit) {
        await aboutService.update(id, data);
        notifySuccess("Profile updated successfully.");
      } else {
        await aboutService.create(data);
        notifySuccess("Profile created successfully.");
      }
      navigate("/admin/about");
    } catch (err) {
      applyBackendErrors(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex min-h-[40vh] items-center justify-center"><Loader size="lg" /></div>;
  if (loadError) return <ErrorState title="Failed to load" message={getApiError(loadError).message} onRetry={() => window.location.reload()} />;

  return (
    <AdminFormLayout title={isEdit ? "Edit Profile" : "Create Profile"} backTo="/admin/about" onSubmit={handleSubmit(onSubmit)} loading={submitting}>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Full Name" name="fullName" required error={errors.fullName}>
          <TextField id="fullName" error={errors.fullName} {...register("fullName")} />
        </FormField>
        <FormField label="Headline" name="headline" required error={errors.headline}>
          <TextField id="headline" error={errors.headline} {...register("headline")} />
        </FormField>
        <FormField label="Email" name="email" required error={errors.email}>
          <TextField id="email" type="email" error={errors.email} {...register("email")} />
        </FormField>
        <FormField label="Phone" name="phone" error={errors.phone}>
          <TextField id="phone" error={errors.phone} {...register("phone")} />
        </FormField>
        <FormField label="Location" name="location" error={errors.location}>
          <TextField id="location" error={errors.location} {...register("location")} />
        </FormField>
        <FormField label="Address" name="address" error={errors.address}>
          <TextField id="address" error={errors.address} {...register("address")} />
        </FormField>
        <FormField label="Profile Image URL" name="profileImage" error={errors.profileImage}>
          <TextField id="profileImage" error={errors.profileImage} {...register("profileImage")} />
        </FormField>
        <FormField label="Cover Image URL" name="coverImage" error={errors.coverImage}>
          <TextField id="coverImage" error={errors.coverImage} {...register("coverImage")} />
        </FormField>
        <div className="md:col-span-2">
          <FormField label="Bio" name="bio" required error={errors.bio}>
            <Textarea id="bio" rows={8} error={errors.bio} {...register("bio")} />
          </FormField>
        </div>
      </div>
    </AdminFormLayout>
  );
};

export default AboutForm;
