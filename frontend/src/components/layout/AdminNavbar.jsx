import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiUser, FiSettings, FiLogOut, FiChevronDown } from "react-icons/fi";
import ThemeToggle from "../common/ThemeToggle";
import useAuth from "../../hooks/useAuth";
import useOutsideClick from "../../hooks/useOutsideClick";
import environment from "../../config/environment";

/**
 * AdminNavbar – top navigation bar for the admin panel.
 * @param {Function} onMobileMenuClick – open/close mobile sidebar
 */
const AdminNavbar = ({ onMobileMenuClick }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => setDropdownOpen(false));

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900 transition-colors">
      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMobileMenuClick}
          className="inline-flex items-center justify-center rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-all lg:hidden"
          aria-label="Open sidebar"
        >
          <FiMenu className="h-5 w-5" />
        </button>
        <span className="hidden text-lg font-semibold text-slate-800 dark:text-white sm:block">
          {environment.APP_NAME}
        </span>
      </div>

      {/* Right: ThemeToggle + User Avatar */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-all"
            aria-label="User menu"
            aria-expanded={dropdownOpen}
          >
            {/* Avatar circle */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-sm font-semibold text-white shadow-sm">
              A
            </div>
            <FiChevronDown
              className={`hidden h-4 w-4 transition-transform duration-300 sm:block ${
                dropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-2xl border border-slate-200 bg-white shadow-xl animate-in fade-in zoom-in-95 dark:border-slate-700 dark:bg-slate-800">
              {/* Admin info */}
              <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Administrator
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  admin@portfolio.dev
                </p>
              </div>

              <div className="py-1">
                <Link
                  to="/admin/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <FiSettings className="h-4 w-4 flex-shrink-0" />
                  Settings
                </Link>
                <Link
                  to="/admin/admins"
                  onClick={() => setDropdownOpen(false)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <FiUser className="h-4 w-4 flex-shrink-0" />
                  Profile
                </Link>
              </div>

              <div className="border-t border-slate-100 py-1 dark:border-slate-700">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors"
                >
                  <FiLogOut className="h-4 w-4 flex-shrink-0" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
