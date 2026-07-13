import { FiGlobe, FiMail } from "react-icons/fi";
import {
  FaDiscord,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export const SOCIAL_PLATFORM_META = {
  GITHUB: {
    label: "GitHub",
    Icon: FaGithub,
    accent: "from-slate-700 to-slate-900 dark:from-slate-300 dark:to-white",
  },
  LINKEDIN: {
    label: "LinkedIn",
    Icon: FaLinkedinIn,
    accent: "from-sky-500 to-blue-600",
  },
  YOUTUBE: {
    label: "YouTube",
    Icon: FaYoutube,
    accent: "from-rose-500 to-red-600",
  },
  FACEBOOK: {
    label: "Facebook",
    Icon: FaFacebookF,
    accent: "from-blue-500 to-indigo-600",
  },
  INSTAGRAM: {
    label: "Instagram",
    Icon: FaInstagram,
    accent: "from-fuchsia-500 to-orange-400",
  },
  X: {
    label: "X",
    Icon: FaXTwitter,
    accent: "from-slate-800 to-slate-950 dark:from-slate-100 dark:to-white",
  },
  TIKTOK: {
    label: "TikTok",
    Icon: FaTiktok,
    accent: "from-cyan-400 to-fuchsia-500",
  },
  DISCORD: {
    label: "Discord",
    Icon: FaDiscord,
    accent: "from-indigo-500 to-violet-500",
  },
  EMAIL: {
    label: "Email",
    Icon: FiMail,
    accent: "from-amber-500 to-orange-500",
  },
  WHATSAPP: {
    label: "WhatsApp",
    Icon: FaWhatsapp,
    accent: "from-emerald-500 to-teal-500",
  },
};

export const getSocialPlatformMeta = (platform) => {
  return SOCIAL_PLATFORM_META[platform] ?? {
    label: platform ?? "Website",
    Icon: FiGlobe,
    accent: "from-teal-500 to-cyan-500",
  };
};

export const normalizeSocialHref = (platform, value) => {
  const rawValue = String(value ?? "").trim();

  if (!rawValue) {
    return "#";
  }

  if (platform === "EMAIL") {
    return rawValue.startsWith("mailto:") ? rawValue : `mailto:${rawValue}`;
  }

  if (platform === "WHATSAPP") {
    if (/^https?:\/\//i.test(rawValue)) {
      return rawValue;
    }

    const digits = rawValue.replace(/\D/g, "");
    return digits ? `https://wa.me/${digits}` : rawValue;
  }

  return /^https?:\/\//i.test(rawValue) ? rawValue : `https://${rawValue}`;
};
