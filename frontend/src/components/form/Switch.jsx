import clsx from "clsx";

const Switch = ({ checked, onChange, disabled = false, label, id }) => (
  <label
    htmlFor={id}
    className={clsx(
      "inline-flex cursor-pointer items-center gap-3",
      disabled && "cursor-not-allowed opacity-60"
    )}
  >
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={clsx(
        "relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"
      )}
    >
      <span
        className={clsx(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform mt-0.5",
          checked ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
    {label && <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>}
  </label>
);

export default Switch;
