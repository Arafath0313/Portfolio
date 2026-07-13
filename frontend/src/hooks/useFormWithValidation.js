import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getApiError } from "../utils/apiHelpers";
import { notifyError } from "../utils/toast";

const useFormWithValidation = (schema, defaultValues = {}) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const applyBackendErrors = useCallback(
    (error) => {
      const { message, errors } = getApiError(error);
      errors.forEach((err) => {
        const fieldMatch = err.match(/^(\w+)/);
        if (fieldMatch) {
          const field = fieldMatch[1].charAt(0).toLowerCase() + fieldMatch[1].slice(1);
          form.setError(field, { type: "server", message: err });
        }
      });
      notifyError(message);
    },
    [form]
  );

  return { ...form, applyBackendErrors };
};

export default useFormWithValidation;
