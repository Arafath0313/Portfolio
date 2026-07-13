import clsx from "clsx";

const Label = ({
  htmlFor,
  children,
  required = false,
  className = "",
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300",
        className
      )}
    >
      {children}

      {required && (
        <span className="ml-1 text-red-500">*</span>
      )}
    </label>
  );
};

export default Label;