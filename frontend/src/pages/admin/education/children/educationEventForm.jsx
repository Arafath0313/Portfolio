import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";

import educationEventService from "../../../../services/educationEventService";
import { educationEventSchema } from "../../../../schemas";
import { EDUCATION_EVENT_TYPES } from "../../../../constants/enums";

import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import Textarea from "../../../../components/ui/Textarea";
import Select from "../../../../components/ui/Select";
import Checkbox from "../../../../components/ui/Checkbox";
import Loader from "../../../../components/common/Loader";

const EducationEventForm = () => {
  const { id: educationId, childId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(childId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    resolver: zodResolver(educationEventSchema),
    defaultValues: {
      educationId: Number(educationId),
      active: true,
      displayOrder: 0,
    },
  });

  useEffect(() => {
    if (isEditMode) {
      educationEventService.getById(childId).then((data) => {
        reset(data);
      }).catch(() => {
        toast.error("Failed to fetch details.");
        navigate(`/admin/education/${educationId}/events`);
      });
    }
  }, [childId, isEditMode, reset, navigate, educationId]);

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await educationEventService.update(childId, data);
        toast.success("Updated successfully.");
      } else {
        await educationEventService.create(data);
        toast.success("Created successfully.");
      }
      navigate(`/admin/education/${educationId}/events`);
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
            to={`/admin/education/${educationId}/events`}
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <FiArrowLeft className="mr-1.5 h-4 w-4" />
            Back to events
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {isEditMode ? "Edit Record" : "Add Record"}
          </h1>
        </div>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input label="Title *" {...register("title")} error={errors.title?.message} />
     <Input label="Event Date *" type="date" {...register("eventDate")} error={errors.eventDate?.message} />
     <Select label="Event Type *" {...register("eventType")} options={EDUCATION_EVENT_TYPES} error={errors.eventType?.message} />
     <Input label="Image URL" {...register("image")} error={errors.image?.message} />
     <Input label="External URL" {...register("externalUrl")} error={errors.externalUrl?.message} />
     <Checkbox label="Featured" {...register("featured")} error={errors.featured?.message} />
     <div className="sm:col-span-2">
        <Textarea label="Description *" rows={4} {...register("description")} error={errors.description?.message} />
     </div>
            <Input
              label="Display Order"
              type="number"
              {...register("displayOrder")}
              error={errors.displayOrder?.message}
            />
          </div>

          <Checkbox
            label="Active (Visible to public)"
            {...register("active")}
            error={errors.active?.message}
          />

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-6 dark:border-slate-700">
            <Link to={`/admin/education/${educationId}/events`}>
              <Button type="button" variant="secondary">Cancel</Button>
            </Link>
            <Button type="submit" isLoading={isSubmitting}>
              <FiSave className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EducationEventForm;