import { NavLink } from "react-router-dom";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import clsx from "clsx";
import SIDEBAR_ITEMS from "../../constants/navigation";
import environment from "../../config/environment";

/**
 * AdminSidebar
 * - Desktop: collapsible (full labels ↔ icons only)
 * - Mobile: off-canvas drawer controlled by parent
 * @param {boolean} collapsed – desktop collapsed state
 * @param {boolean} mobileOpen – mobile drawer open state
 * @param {Function} onCollapse – toggle desktop collapse
 * @param {Function} onMobileClose – close mobile drawer
 */
const AdminSidebar = ({ collapsed, mobileOpen, onCollapse, onMobileClose }) => {
  const sidebarContent = (
    <nav className="flex h-full flex-col">
      {/* Logo / Brand */}
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
        {!collapsed && (
          <span className="truncate text-lg font-bold text-teal-600 dark:text-teal-400">
            {environment.APP_NAME}
          </span>
        )}
        {/* Desktop collapse toggle */}
        <button
          onClick={onCollapse}
          className="hidden lg:flex items-center justify-center rounded-xl p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <FiChevronRight className="h-5 w-5" />
          ) : (
            <FiChevronLeft className="h-5 w-5" />
          )}
        </button>
        {/* Mobile close button */}
        <button
          onClick={onMobileClose}
          className="flex lg:hidden items-center justify-center rounded-xl p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
          aria-label="Close sidebar"
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar">
        <ul className="space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onMobileClose}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    clsx(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-white",
                      collapsed && "justify-center px-2"
                    )
                  }
                >
                  <Icon
                    className={clsx(
                      "h-5 w-5 flex-shrink-0 transition-colors",
                      collapsed ? "mx-auto" : ""
                    )}
                  />
                  {!collapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-slate-200 px-4 py-4 dark:border-slate-800">
          <p className="text-xs font-medium tracking-wide text-slate-400 dark:text-slate-500 uppercase">
            Admin Dashboard
          </p>
        </div>
      )}
    </nav>
  );

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside
        className={clsx(
          "hidden lg:flex flex-col h-full border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* ── Mobile Overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile Drawer ── */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 transition-transform duration-300 ease-in-out lg:hidden",
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default AdminSidebar;
