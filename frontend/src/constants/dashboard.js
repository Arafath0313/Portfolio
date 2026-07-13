import { FiBriefcase, FiFileText, FiMail, FiYoutube } from "react-icons/fi";

const DASHBOARD_CARDS = [
  {
    id: "projects",
    title: "Total Projects",
    icon: FiBriefcase,
    color: "blue",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    textColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-100 dark:border-blue-900/50",
  },
  {
    id: "passions",
    title: "Passions",
    icon: FiFileText,
    color: "green",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    textColor: "text-green-600 dark:text-green-400",
    borderColor: "border-green-100 dark:border-green-900/50",
  },
  {
    id: "messages",
    title: "Inquiries",
    icon: FiMail,
    color: "purple",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    textColor: "text-purple-600 dark:text-purple-400",
    borderColor: "border-purple-100 dark:border-purple-900/50",
  },
  {
    id: "youtube",
    title: "YouTube Videos",
    icon: FiYoutube,
    color: "red",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    textColor: "text-red-600 dark:text-red-400",
    borderColor: "border-red-100 dark:border-red-900/50",
  },
];

export default DASHBOARD_CARDS;
