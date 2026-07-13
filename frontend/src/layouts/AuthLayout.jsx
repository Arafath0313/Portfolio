import { Outlet } from "react-router-dom";
import ThemeToggle from "../components/common/ThemeToggle";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      {/* Theme Toggle - top right */}
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;