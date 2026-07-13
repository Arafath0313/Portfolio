import clsx from "clsx";

const Checkbox = ({ checked, onChange, disabled = false, label, id }) => (
  <label
    htmlFor={id}
    className={clsx(
      "inline-flex cursor-pointer items-center gap-2",
      disabled && "cursor-not-allowed opacity-60"
    )}
  >
    <input
      id={id}
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.checked)}
      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600"
    />
    {label && <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>}
  </label>
);

export default Checkbox;
