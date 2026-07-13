import { FiLock } from "react-icons/fi";

const LoginHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center pb-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
        <FiLock className="h-6 w-6" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Admin Portal
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Sign in to manage your portfolio content, messages, and settings.
      </p>
    </div>
  );
};

export default LoginHeader;
