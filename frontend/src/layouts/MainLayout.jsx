import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fbf8f2_0%,#f7faf9_42%,#ffffff_100%)] text-slate-900 dark:bg-[linear-gradient(180deg,#07131a_0%,#081b25_36%,#0f172a_100%)] dark:text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-slate-950 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white dark:focus:bg-white dark:focus:text-slate-950"
      >
        Skip to content
      </a>

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(13,148,136,0.18),transparent_38%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.16),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.14),transparent_34%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_24%)]" />
      <div className="pointer-events-none absolute left-1/2 top-40 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl dark:bg-sky-500/10" />

      <Navbar />
      <main id="main-content" className="relative flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
