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
import { skillSchema } from "../../../schemas";
import skillService from "../../../services/skillService";
import { SKILL_CATEGORIES, SKILL_LEVELS } from "../../../constants/enums";
import { getApiError } from "../../../utils/apiHelpers";
import { notifySuccess } from "../../../utils/toast";

const defaultValues = {
  name: "",
  category: "FRONTEND",
  level: "INTERMEDIATE",
  icon: "",
  displayOrder: 0,
  active: true,
};

const SkillForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const { register, control, handleSubmit, reset, formState: { errors }, applyBackendErrors } =
    useFormWithValidation(skillSchema, defaultValues);

  useEffect(() => {
    if (!isEdit) return;
    skillService
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
        await skillService.update(id, data);
        notifySuccess("Skill updated successfully.");
      } else {
        await skillService.create(data);
        notifySuccess("Skill created successfully.");
      }
      navigate("/admin/skills");
    } catch (err) {
      applyBackendErrors(err);
    } finally {
      setSubmitting(false);
    }
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
        title="Failed to load skill"
        message={getApiError(loadError).message}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <AdminFormLayout
      title={isEdit ? "Edit Skill" : "Create Skill"}
      backTo="/admin/skills"
      onSubmit={handleSubmit(onSubmit)}
      loading={submitting}
      submitLabel={isEdit ? "Update Skill" : "Create Skill"}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Name" name="name" required error={errors.name}>
          <TextField id="name" error={errors.name} {...register("name")} />
        </FormField>

        <FormField label="Icon URL" name="icon" error={errors.icon}>
          <TextField id="icon" error={errors.icon} {...register("icon")} placeholder="Optional icon URL" />
        </FormField>

        <FormField label="Category" name="category" required error={errors.category}>
          <Select id="category" error={errors.category} {...register("category")}>
            {SKILL_CATEGORIES.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </FormField>

        <FormField label="Level" name="level" required error={errors.level}>
          <Select id="level" error={errors.level} {...register("level")}>
            {SKILL_LEVELS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </FormField>

        <FormField label="Display Order" name="displayOrder" required error={errors.displayOrder}>
          <TextField id="displayOrder" type="number" min="0" error={errors.displayOrder} {...register("displayOrder")} />
        </FormField>

        <FormSwitch control={control} name="active" label="Active" error={errors.active} />
      </div>
    </AdminFormLayout>
  );
};

export default SkillForm;
