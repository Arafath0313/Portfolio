import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";

import educationService from "../../../services/educationService";
import { educationSchema } from "../../../schemas";
import { STUDY_MODES, EDUCATION_STATUSES } from "../../../constants/enums";

import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Textarea from "../../../components/ui/Textarea";
import Select from "../../../components/ui/Select";
import Checkbox from "../../../components/ui/Checkbox";
import Loader from "../../../components/common/Loader";

const EducationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      universityName: "",
      universityLogo: "",
      universityWebsite: "",
      degree: "",
      faculty: "",
      department: "",
      enrollmentYear: new Date().getFullYear(),
      expectedGraduationYear: "",
      currentAcademicYear: "",
      currentSemester: "",
      studyMode: "FULL_TIME",
      gpa: "",
      status: "IN_PROGRESS",
      academicSummary: "",
      active: true,
      displayOrder: 0,
    },
  });

  useEffect(() => {
    if (isEditMode) {
      educationService.getById(id).then((data) => {
        reset(data);
      }).catch(() => {
        toast.error("Failed to fetch education details.");
        navigate("/admin/education");
      });
    }
  }, [id, isEditMode, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await educationService.update(id, data);
        toast.success("Education updated successfully.");
      } else {
        await educationService.create(data);
        toast.success("Education created successfully.");
      }
      navigate("/admin/education");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  if (isEditMode && isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            to="/admin/education"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <FiArrowLeft className="mr-1.5 h-4 w-4" />
            Back to Education
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {isEditMode ? "Edit Education" : "Add Education"}
          </h1>
        </div>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="University Name *"
              {...register("universityName")}
              error={errors.universityName?.message}
            />
            <Input
              label="Degree *"
              {...register("degree")}
              error={errors.degree?.message}
            />
            <Input
              label="University Website URL"
              {...register("universityWebsite")}
              error={errors.universityWebsite?.message}
            />
            <Input
              label="University Logo URL"
              {...register("universityLogo")}
              error={errors.universityLogo?.message}
            />
            <Input
              label="Faculty"
              {...register("faculty")}
              error={errors.faculty?.message}
            />
            <Input
              label="Department"
              {...register("department")}
              error={errors.department?.message}
            />
            <Input
              label="Enrollment Year *"
              type="number"
              {...register("enrollmentYear")}
              error={errors.enrollmentYear?.message}
            />
            <Input
              label="Expected Graduation Year"
              type="number"
              {...register("expectedGraduationYear")}
              error={errors.expectedGraduationYear?.message}
            />
            <Select
              label="Study Mode *"
              {...register("studyMode")}
              options={STUDY_MODES}
              error={errors.studyMode?.message}
            />
            <Select
              label="Status *"
              {...register("status")}
              options={EDUCATION_STATUSES}
              error={errors.status?.message}
            />
            <Input
              label="Current Academic Year (e.g. Year 3)"
              {...register("currentAcademicYear")}
              error={errors.currentAcademicYear?.message}
            />
            <Input
              label="Current Semester (e.g. Semester 2)"
              {...register("currentSemester")}
              error={errors.currentSemester?.message}
            />
            <Input
              label="GPA"
              type="number"
              step="0.01"
              {...register("gpa")}
              error={errors.gpa?.message}
            />
            <Input
              label="Display Order"
              type="number"
              {...register("displayOrder")}
              error={errors.displayOrder?.message}
            />
          </div>

          <Textarea
            label="Academic Summary"
            rows={4}
            {...register("academicSummary")}
            error={errors.academicSummary?.message}
          />

          <Checkbox
            label="Active (Visible to public)"
            {...register("active")}
            error={errors.active?.message}
          />

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-6 dark:border-slate-700">
            <Link to="/admin/education">
              <Button type="button" variant="secondary">Cancel</Button>
            </Link>
            <Button type="submit" isLoading={isSubmitting}>
              <FiSave className="mr-2 h-4 w-4" />
              Save Education
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EducationForm;