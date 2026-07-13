import {
  FiGrid,
  FiUser,
  FiCpu,
  FiBriefcase,
  FiBook,
  FiFileText,
  FiAward,
  FiFile,
  FiShare2,
  FiYoutube,
  FiMail,
  FiSettings,
  FiUsers,
  FiHelpCircle,
} from "react-icons/fi";

const SIDEBAR_ITEMS = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: FiGrid,
  },
  {
    label: "About Me",
    path: "/admin/about",
    icon: FiUser,
  },
  {
    label: "Education",
    path: "/admin/education",
    icon: FiBook,
  },
  {
    label: "Skills",
    path: "/admin/skills",
    icon: FiCpu,
  },
  {
    label: "Projects",
    path: "/admin/projects",
    icon: FiBriefcase,
  },
  {
    label: "Passions",
    path: "/admin/passions",
    icon: FiFileText,
  },
  {
    label: "Certifications",
    path: "/admin/certifications",
    icon: FiAward,
  },
  {
    label: "Resume",
    path: "/admin/resume",
    icon: FiFile,
  },
  {
    label: "Social Links",
    path: "/admin/social-links",
    icon: FiShare2,
  },
  {
    label: "YouTube",
    path: "/admin/youtube",
    icon: FiYoutube,
  },
  {
    label: "Messages",
    path: "/admin/messages",
    icon: FiMail,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: FiSettings,
  },
  {
    label: "Admins",
    path: "/admin/admins",
    icon: FiUsers,
  },
  {
    label: "Support",
    path: "/admin/support",
    icon: FiHelpCircle,
  },
];

export default SIDEBAR_ITEMS;
