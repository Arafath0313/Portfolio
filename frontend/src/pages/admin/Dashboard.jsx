import { useEffect, useRef, useState } from "react";
import {
  FiArrowRight,
  FiBriefcase,
  FiBookOpen,
  FiMail,
  FiPlusCircle,
  FiYoutube,
  FiFolder,
  FiMessageSquare,
  FiHeart,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import DASHBOARD_CARDS from "../../constants/dashboard";
import dashboardService from "../../services/dashboardService";
import authStorage from "../../utils/authStorage";
import { formatDateTime } from "../../utils/apiHelpers";
import { CardSkeleton } from "../../components/common/Skeleton";

/* ─── Decode username from JWT without external library ─── */
const getAdminUsername = () => {
  try {
    const token = authStorage.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub || null;
  } catch {
    return null;
  }
};

/* ─── Count-up animation hook ─── */
const useCountUp = (target, duration = 900) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (target == null || target === 0) {
      setCount(0);
      return;
    }
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return count;
};

/* ─── Stat Card ─── */
const StatCard = ({ card, value, loading, error }) => {
  const Icon = card.icon;
  const animated = useCountUp(loading ? 0 : (value ?? 0));

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${card.bgColor} ${card.borderColor}`}
    >
      {/* subtle shine on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {card.title}
          </p>
          {loading || (error && !value) ? (
            <p className={`mt-1.5 text-5xl font-bold tabular-nums ${card.textColor}`}>—</p>
          ) : (
            <p className={`mt-1.5 text-5xl font-bold tabular-nums ${card.textColor}`}>
              {animated}
            </p>
          )}
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110 ${card.bgColor}`}
        >
          <Icon className={`h-6 w-6 ${card.textColor}`} />
        </div>
      </div>
    </div>
  );
};

/* ─── Quick Action Card ─── */
const QuickAction = ({ label, to, icon: Icon, color, description }) => (
  <Link
    to={to}
    className={`group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-transparent hover:shadow-xl active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 ${color}`}
  >
    <div className="flex items-center justify-between">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition-all duration-200 group-hover:scale-110 group-hover:bg-current/10 dark:bg-slate-700">
        <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
      </div>
      <FiArrowRight className="h-4 w-4 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
    </div>
    <div>
      <p className="font-semibold">{label}</p>
      {description && (
        <p className="mt-0.5 text-xs font-normal text-slate-500 dark:text-slate-400">{description}</p>
      )}
    </div>
  </Link>
);

/* ─── Empty Panel State ─── */
const EmptyPanel = ({ icon: Icon, title, description, to, actionLabel }) => (
  <div className="flex h-full flex-col items-center justify-center py-10 text-center">
    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700">
      <Icon className="h-6 w-6 text-slate-400 dark:text-slate-500" />
    </div>
    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{title}</p>
    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{description}</p>
    {to && (
      <Link
        to={to}
        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-teal-700"
      >
        {actionLabel}
      </Link>
    )}
  </div>
);

/* ─── Recent Activity Panel ─── */
const ActivityPanel = ({ title, viewAll, children, loading }) => (
  <section className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-700">
      <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h2>
      <Link to={viewAll} className="text-xs font-medium text-teal-600 hover:underline dark:text-teal-400">
        View all
      </Link>
    </div>
    <div className="flex-1 p-4">
      {loading ? <CardSkeleton /> : children}
    </div>
  </section>
);

/* ─── Quick Actions config ─── */
const QUICK_ACTIONS = [
  {
    label: "New Project",
    to: "/admin/projects/create",
    icon: FiBriefcase,
    color: "hover:text-blue-600 dark:hover:text-blue-400",
    description: "Add a portfolio project",
  },
  {
    label: "New Passion",
    to: "/admin/passions/create",
    icon: FiBookOpen,
    color: "hover:text-green-600 dark:hover:text-green-400",
    description: "Share a new passion",
  },
  {
    label: "View Messages",
    to: "/admin/messages",
    icon: FiMail,
    color: "hover:text-purple-600 dark:hover:text-purple-400",
    description: "Read inquiries",
  },
  {
    label: "Add Certification",
    to: "/admin/certifications/create",
    icon: FiPlusCircle,
    color: "hover:text-orange-600 dark:hover:text-orange-400",
    description: "Upload a credential",
  },
  {
    label: "Add YouTube Video",
    to: "/admin/youtube/create",
    icon: FiYoutube,
    color: "hover:text-red-600 dark:hover:text-red-400",
    description: "Link a video",
  },
];

/* ─── Dashboard ─── */
const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentMessages, setRecentMessages] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentPassions, setRecentPassions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsError, setStatsError] = useState(false);

  const adminUsername = getAdminUsername();
  const adminName = adminUsername 
    ? adminUsername.charAt(0).toUpperCase() + adminUsername.slice(1)
    : "Admin";

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  useEffect(() => {
    const load = async () => {
      try {
        const [statsData, messages, projects, passions] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getRecentMessages(5),
          dashboardService.getRecentProjects(5),
          dashboardService.getRecentPassions(5),
        ]);
        setStats(statsData);
        setRecentMessages(messages);
        setRecentProjects(projects);
        setRecentPassions(passions);
      } catch {
        setStatsError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statValues = {
    projects: stats?.projects ?? 0,
    passions: stats?.passions ?? 0,
    messages: stats?.messages ?? 0,
    youtube: stats?.youtube ?? 0,
  };

  return (
    <div className="space-y-8">

      {/* ── Welcome Banner ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 p-7 text-white shadow-xl">
        {/* decorative circles */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-12 right-24 h-36 w-36 rounded-full bg-white/10" />
        <div className="relative">
          <p className="text-sm font-medium text-teal-100">{greeting} 👋</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Welcome back, {adminName}
          </h1>
          <p className="mt-1 text-sm text-teal-100">
            Here&apos;s an overview of your portfolio dashboard.
          </p>
          {!loading && stats && (
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <span className="rounded-full bg-white/15 px-3 py-1 font-medium">
                {statValues.projects} Projects
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 font-medium">
                {statValues.passions} Passions
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 font-medium">
                {statValues.messages} Messages
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 font-medium">
                {statValues.youtube} Videos
              </span>
            </div>
          )}
          {statsError && (
            <p className="mt-3 text-sm text-teal-200">⚠️ Could not load statistics.</p>
          )}
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Overview
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {DASHBOARD_CARDS.map((card) => (
            <StatCard key={card.id} card={card} value={statValues[card.id]} loading={loading} error={statsError} />
          ))}
        </div>
      </section>

      {/* ── Recent Activity Panels ── */}
      <div className="grid gap-5 lg:grid-cols-3">
        <ActivityPanel title="Recent Messages" viewAll="/admin/messages" loading={loading}>
          {recentMessages.length ? (
            <div className="space-y-2">
              {recentMessages.map((msg) => (
                <Link
                  key={msg.id}
                  to={`/admin/messages/${msg.id}`}
                  className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                    <FiMail className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">{msg.subject}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{msg.name} · {formatDateTime(msg.receivedAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyPanel
              icon={FiMessageSquare}
              title="No messages yet"
              description="Contact form submissions will appear here."
            />
          )}
        </ActivityPanel>

        <ActivityPanel title="Recent Projects" viewAll="/admin/projects" loading={loading}>
          {recentProjects.length ? (
            <div className="space-y-2">
              {recentProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/admin/projects/${project.id}`}
                  className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <FiBriefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">{project.title}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{project.status}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyPanel
              icon={FiFolder}
              title="No projects yet"
              description="Add your first project to showcase your work."
              to="/admin/projects/create"
              actionLabel="Add Project"
            />
          )}
        </ActivityPanel>

        <ActivityPanel title="Recent Passions" viewAll="/admin/passions" loading={loading}>
          {recentPassions.length ? (
            <div className="space-y-2">
              {recentPassions.map((passion) => (
                <Link
                  key={passion.id}
                  to={`/admin/passions/${passion.id}`}
                  className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <FiBookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">{passion.title}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{passion.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyPanel
              icon={FiHeart}
              title="No passions yet"
              description="Document the things you love beyond coding."
              to="/admin/passions/create"
              actionLabel="Add Passion"
            />
          )}
        </ActivityPanel>
      </div>

      {/* ── Quick Actions ── */}
      <section aria-labelledby="actions-heading">
        <h2 id="actions-heading" className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Quick Actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {QUICK_ACTIONS.map((action) => (
            <QuickAction key={action.to} {...action} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
