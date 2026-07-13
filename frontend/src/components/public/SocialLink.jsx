import clsx from "clsx";
import { getSocialPlatformMeta, normalizeSocialHref } from "../../constants/socialLinks";

const SocialLink = ({ socialLink, compact = false }) => {
  const meta = getSocialPlatformMeta(socialLink?.platform);
  const href = normalizeSocialHref(socialLink?.platform, socialLink?.url);
  const Icon = meta.Icon;

  return (
    <a
      href={href}
      target={socialLink?.platform === "EMAIL" ? undefined : "_blank"}
      rel={socialLink?.platform === "EMAIL" ? undefined : "noreferrer"}
      className={clsx(
        "group inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white dark:hover:text-white",
        compact ? "px-3 py-2" : "px-4 py-3"
      )}
      aria-label={meta.label}
    >
      <span className={clsx("rounded-full bg-gradient-to-br text-white shadow-lg", meta.accent, compact ? "p-2" : "p-2.5")}>
        <Icon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </span>
      {!compact ? (
        <span>
          <span className="block text-sm font-semibold">{meta.label}</span>
          <span className="block text-xs text-slate-500 dark:text-slate-400">{socialLink?.url}</span>
        </span>
      ) : null}
    </a>
  );
};

export default SocialLink;
