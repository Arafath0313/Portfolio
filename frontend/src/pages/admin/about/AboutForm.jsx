import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminFormLayout from "../../../components/admin/AdminFormLayout";
import FormField from "../../../components/form/FormField";
import TextField from "../../../components/form/TextField";
import Textarea from "../../../components/form/Textarea";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import ImageUploader from "../../../components/upload/ImageUploader";
import useFormWithValidation from "../../../hooks/useFormWithValidation";
import { aboutSchema } from "../../../schemas";
import aboutService from "../../../services/aboutService";
import { getApiError } from "../../../utils/apiHelpers";
import { notifySuccess, notifyError } from "../../../utils/toast";

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
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors }, applyBackendErrors } =
    useFormWithValidation(aboutSchema, defaultValues);

  const profileImageUrl = watch("profileImage");
  const coverImageUrl = watch("coverImage");

  useEffect(() => {
    if (!isEdit) return;
    aboutService.getById(id).then((data) => reset(data)).catch(setLoadError).finally(() => setLoading(false));
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      let savedId = id;
      if (isEdit) {
        await aboutService.update(id, data);
        notifySuccess("Profile updated successfully.");
      } else {
        const created = await aboutService.create(data);
        savedId = created.id;
        notifySuccess("Profile created successfully.");
      }

      let imagesUploaded = false;
      if (selectedProfileImage) {
        await aboutService.uploadProfileImage(savedId, selectedProfileImage);
        imagesUploaded = true;
      }
      if (selectedCoverImage) {
        await aboutService.uploadCoverImage(savedId, selectedCoverImage);
        imagesUploaded = true;
      }
      
      if (imagesUploaded) {
        notifySuccess("Images uploaded successfully.");
      }

      navigate("/admin/about");
    } catch (err) {
      applyBackendErrors(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleProfileImageSelect = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      notifyError("File size must be less than 5MB.");
      throw new Error("File size exceeded");
    }
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      notifyError("Invalid file type. Only JPG, PNG, and WEBP are allowed.");
      throw new Error("Invalid file type");
    }
    setSelectedProfileImage(file);
    return Promise.resolve();
  };

  const handleProfileImageRemove = () => {
    setSelectedProfileImage(null);
    setValue("profileImage", "");
  };

  const handleCoverImageSelect = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      notifyError("File size must be less than 5MB.");
      throw new Error("File size exceeded");
    }
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      notifyError("Invalid file type. Only JPG, PNG, and WEBP are allowed.");
      throw new Error("Invalid file type");
    }
    setSelectedCoverImage(file);
    return Promise.resolve();
  };

  const handleCoverImageRemove = () => {
    setSelectedCoverImage(null);
    setValue("coverImage", "");
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
        <div className="md:col-span-2">
          <FormField label="Bio" name="bio" required error={errors.bio}>
            <Textarea id="bio" rows={8} error={errors.bio} {...register("bio")} />
          </FormField>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6 dark:border-slate-700 mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Profile Image</h3>
          <ImageUploader
            value={profileImageUrl}
            onUpload={handleProfileImageSelect}
            onRemove={handleProfileImageRemove}
          />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Cover Image</h3>
          <ImageUploader
            value={coverImageUrl}
            onUpload={handleCoverImageSelect}
            onRemove={handleCoverImageRemove}
          />
        </div>
      </div>
    </AdminFormLayout>
  );
};

export default AboutForm;
