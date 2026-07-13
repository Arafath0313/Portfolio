import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/layout/AdminSidebar";
import AdminNavbar from "../components/layout/AdminNavbar";

/**
 * AdminLayout
 * Shell for the admin panel: Sidebar (desktop/mobile) + Navbar + Content area.
 * - Desktop: persistent collapsible sidebar (left) + scrollable content
 * - Mobile: off-canvas drawer sidebar controlled by navbar hamburger menu
 */
const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Sidebar */}
      <AdminSidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onCollapse={() => setSidebarCollapsed((prev) => !prev)}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <AdminNavbar
          onMobileMenuClick={() => setMobileSidebarOpen((prev) => !prev)}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
