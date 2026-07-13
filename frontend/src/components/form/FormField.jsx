import clsx from "clsx";
import Label from "../ui/Label";

const FormField = ({
  label,
  name,
  error,
  required,
  children,
  hint,
  className,
}) => {
  const errorMessage =
    typeof error === "string" ? error : error?.message;

  return (
    <div className={clsx("space-y-1.5", className)}>
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </Label>
      )}

      {children}

      {hint && !errorMessage && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {hint}
        </p>
      )}

      {errorMessage && (
        <p className="text-xs text-red-500" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormField;