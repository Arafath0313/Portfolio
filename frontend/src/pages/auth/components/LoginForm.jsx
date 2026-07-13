import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Label from "../../../components/ui/Label";
import Input from "../../../components/ui/Input";
import PasswordInput from "../../../components/ui/PasswordInput";
import Button from "../../../components/ui/Button";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      await login({ username, password });
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      const message = error.response?.data?.message || "Invalid username or password";
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {apiError && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400 border border-red-200 dark:border-red-900/50">
          {apiError}
        </div>
      )}

      <div>
        <Label htmlFor="username" required>
          Username
        </Label>
        <Input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (errors.username) {
              setErrors((prev) => ({ ...prev, username: "" }));
            }
          }}
          placeholder="Enter your username"
          error={!!errors.username}
          disabled={isLoading}
        />
        {errors.username && (
          <p className="mt-1 text-xs text-red-500">{errors.username}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password" required>
          Password
        </Label>
        <PasswordInput
          id="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) {
              setErrors((prev) => ({ ...prev, password: "" }));
            }
          }}
          placeholder="Enter your password"
          error={!!errors.password}
          disabled={isLoading}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password}</p>
        )}
      </div>

      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="mt-2"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
