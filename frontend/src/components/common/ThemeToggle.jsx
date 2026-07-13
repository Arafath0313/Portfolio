import { FiSun, FiMoon } from "react-icons/fi";
import useTheme from "../../hooks/useTheme";

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors duration-200 ${className}`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <FiSun className="h-5 w-5 text-yellow-400 transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <FiMoon className="h-5 w-5 text-slate-700 transition-transform duration-300 rotate-0 scale-100" />
      )}
    </button>
  );
};

export default ThemeToggle;
