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
import { projectSchema } from "../../../schemas";
import projectService from "../../../services/projectService";
import { PROJECT_STATUSES } from "../../../constants/enums";
import { getApiError, slugify } from "../../../utils/apiHelpers";
import { notifySuccess, notifyError } from "../../../utils/toast";

const defaultValues = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  technologies: "",
  githubUrl: "",
  liveDemoUrl: "",
  status: "PLANNING",
  featured: false,
  active: true,
  displayOrder: 0,
};

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [images, setImages] = useState([]);
  // Thumbnail: staged file for create mode; existing URL for edit mode
  const [pendingThumbnail, setPendingThumbnail] = useState(null);

  const { register, control, handleSubmit, reset, watch, setValue, formState: { errors }, applyBackendErrors } =
    useFormWithValidation(projectSchema, defaultValues);

  const title = watch("title");
  const thumbnailUrl = watch("thumbnailUrl");

  useEffect(() => {
    if (!isEdit && title) {
      setValue("slug", slugify(title));
    }
  }, [title, isEdit, setValue]);

  useEffect(() => {
    if (!isEdit) return;
    projectService
      .getById(id)
      .then((data) => {
        reset(data);
      })
      .catch((err) => setLoadError(err))
      .finally(() => setLoading(false));
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (isEdit) {
        await projectService.update(id, data);
        notifySuccess("Project updated successfully.");
        navigate("/admin/projects");
      } else {
        // Step 1: create the project record
        const created = await projectService.create(data);
        notifySuccess("Project created successfully.");

        // Step 2: upload thumbnail using the returned project ID
        if (pendingThumbnail) {
          await projectService.uploadThumbnail(created.id, pendingThumbnail);
          notifySuccess("Project thumbnail uploaded successfully.");
        }

        navigate(`/admin/projects/${created.id}/edit`);
      }
    } catch (err) {
      applyBackendErrors(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Validate and stage (create) or immediately upload (edit)
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
      // In edit mode: upload immediately and refresh the field
      const updated = await projectService.uploadThumbnail(id, file, onProgress);
      setValue("thumbnailUrl", updated.thumbnailUrl || "");
      notifySuccess("Project thumbnail uploaded successfully.");
    } else {
      // In create mode: stage the file — upload after the record exists
      setPendingThumbnail(file);
    }
  };

  const handleRemoveThumbnail = () => {
    setPendingThumbnail(null);
    setValue("thumbnailUrl", "");
  };

  const handleImageUpload = async (file, onProgress) => {
    const result = await projectService.uploadImage(id, file, "", images.length, onProgress);
    setImages((prev) => [...prev, result]);
    notifySuccess("Image uploaded successfully.");
  };

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
        title="Failed to load project"
        message={getApiError(loadError).message}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <AdminFormLayout
      title={isEdit ? "Edit Project" : "Create Project"}
      backTo="/admin/projects"
      onSubmit={handleSubmit(onSubmit)}
      loading={submitting}
      submitLabel={isEdit ? "Update Project" : "Create Project"}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Title" name="title" required error={errors.title}>
          <TextField id="title" error={errors.title} {...register("title")} />
        </FormField>

        <FormField label="Slug" name="slug" required error={errors.slug}>
          <TextField id="slug" error={errors.slug} {...register("slug")} />
        </FormField>

        <div className="md:col-span-2">
          <FormField label="Short Description" name="shortDescription" required error={errors.shortDescription}>
            <Textarea id="shortDescription" rows={2} error={errors.shortDescription} {...register("shortDescription")} />
          </FormField>
        </div>

        <div className="md:col-span-2">
          <FormField label="Description" name="description" required error={errors.description}>
            <Textarea id="description" rows={6} error={errors.description} {...register("description")} />
          </FormField>
        </div>

        <FormField label="Technologies" name="technologies" error={errors.technologies}>
          <TextField id="technologies" error={errors.technologies} placeholder="React, Spring Boot, MySQL" {...register("technologies")} />
        </FormField>

        <FormField label="Status" name="status" required error={errors.status}>
          <Select id="status" error={errors.status} {...register("status")}>
            {PROJECT_STATUSES.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </FormField>

        <FormField label="GitHub URL" name="githubUrl" error={errors.githubUrl}>
          <TextField id="githubUrl" error={errors.githubUrl} {...register("githubUrl")} />
        </FormField>

        <FormField label="Live Demo URL" name="liveDemoUrl" error={errors.liveDemoUrl}>
          <TextField id="liveDemoUrl" error={errors.liveDemoUrl} {...register("liveDemoUrl")} />
        </FormField>

        <FormField label="Display Order" name="displayOrder" required error={errors.displayOrder}>
          <TextField id="displayOrder" type="number" min="0" error={errors.displayOrder} {...register("displayOrder")} />
        </FormField>

        <div className="flex flex-col gap-4">
          <FormSwitch control={control} name="featured" label="Featured" error={errors.featured} />
          <FormSwitch control={control} name="active" label="Active" error={errors.active} />
        </div>
      </div>

      {/* ── Thumbnail ── */}
      <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-700">
        <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Project Thumbnail</h3>
        <ImageUploader
          value={pendingThumbnail ? null : thumbnailUrl}
          onUpload={handleThumbnailSelect}
          onRemove={handleRemoveThumbnail}
          label="Upload Thumbnail"
          previewClassName="h-48 w-full max-w-sm"
        />
        {!isEdit && pendingThumbnail && (
          <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
            Thumbnail staged — will be uploaded after the project is created.
          </p>
        )}
      </div>

      {/* ── Gallery images (edit mode only) ── */}
      {isEdit && (
        <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-700">
          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Project Gallery</h3>
          <ImageUploader label="Add Gallery Image" onUpload={handleImageUpload} />
          {images.length > 0 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((img) => (
                <div key={img.filename || img.url} className="relative">
                  <img
                    src={img.url?.startsWith("http") ? img.url : `http://localhost:8080${img.url}`}
                    alt=""
                    className="h-32 w-full rounded-xl object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </AdminFormLayout>
  );
};

export default ProjectForm;
