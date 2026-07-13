import { forwardRef, useState } from "react";
import clsx from "clsx";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Input from "./Input";

const PasswordInput = forwardRef(({
  id,
  name,
  value,
  placeholder = "Enter your password",
  disabled = false,
  error = false,
  className = "",
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        ref={ref}
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        className={clsx("pr-12", className)}
        {...props}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      >
        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;