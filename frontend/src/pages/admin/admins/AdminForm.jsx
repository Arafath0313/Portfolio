import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminFormLayout from "../../../components/admin/AdminFormLayout";
import FormField from "../../../components/form/FormField";
import TextField from "../../../components/form/TextField";
import PasswordInput from "../../../components/ui/PasswordInput";
import Select from "../../../components/form/Select";
import FormSwitch from "../../../components/form/FormSwitch";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import useFormWithValidation from "../../../hooks/useFormWithValidation";
import { adminSchema } from "../../../schemas";
import adminService from "../../../services/adminService";
import { ADMIN_ROLES } from "../../../constants/enums";
import { getApiError } from "../../../utils/apiHelpers";
import { notifySuccess } from "../../../utils/toast";

const defaultValues = {
  username: "",
  email: "",
  password: "",
  role: "ADMIN",
  enabled: true,
};

const AdminForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const { register, control, handleSubmit, reset, formState: { errors }, applyBackendErrors } =
    useFormWithValidation(adminSchema, defaultValues);

  useEffect(() => {
    if (!isEdit) return;
    adminService
      .getById(id)
      .then((data) => reset({ ...data, password: "" }))
      .catch(setLoadError)
      .finally(() => setLoading(false));
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (isEdit) {
        if (!data.password) {
          applyBackendErrors({ response: { data: { message: "Password is required for updates.", errors: [] } } });
          return;
        }
        await adminService.update(id, data);
        notifySuccess("Admin updated successfully.");
      } else {
        await adminService.create(data);
        notifySuccess("Admin created successfully.");
      }
      navigate("/admin/admins");
    } catch (err) {
      applyBackendErrors(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex min-h-[40vh] items-center justify-center"><Loader size="lg" /></div>;
  if (loadError) return <ErrorState title="Failed to load" message={getApiError(loadError).message} onRetry={() => window.location.reload()} />;

  return (
    <AdminFormLayout title={isEdit ? "Edit Admin" : "Create Admin"} backTo="/admin/admins" onSubmit={handleSubmit(onSubmit)} loading={submitting}>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Username" name="username" required error={errors.username}>
          <TextField id="username" error={errors.username} {...register("username")} />
        </FormField>
        <FormField label="Email" name="email" required error={errors.email}>
          <TextField id="email" type="email" error={errors.email} {...register("email")} />
        </FormField>
        <FormField label="Password" name="password" required error={errors.password} hint={isEdit ? "Password is required on every update (backend requirement)." : undefined}>
          <PasswordInput id="password" error={errors.password} {...register("password")} />
        </FormField>
        <FormField label="Role" name="role" required error={errors.role}>
          <Select id="role" error={errors.role} {...register("role")}>
            {ADMIN_ROLES.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </Select>
        </FormField>
        <FormSwitch control={control} name="enabled" label="Enabled" error={errors.enabled} />
      </div>
    </AdminFormLayout>
  );
};

export default AdminForm;
