import { useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import clsx from "clsx";

/**
 * SearchBar – minimal search input with icon and clear button.
 * @param {string} value – controlled input value
 * @param {Function} onChange – change handler (receives the string value)
 * @param {string} placeholder – input placeholder text
 * @param {string} className – additional Tailwind classes
 * @param {boolean} disabled – disables the input
 */
const SearchBar = ({
  value = "",
  onChange,
  placeholder = "Search...",
  className = "",
  disabled = false,
}) => {
  const inputRef = useRef(null);

  const handleClear = () => {
    onChange?.("");
    inputRef.current?.focus();
  };

  return (
    <div
      className={clsx(
        "relative flex items-center rounded-xl border border-slate-300 bg-white transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      <FiSearch className="absolute left-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full bg-transparent py-2 pl-9 pr-8 text-sm text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white dark:placeholder-slate-500"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2 rounded p-0.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
          aria-label="Clear search"
        >
          <FiX className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
