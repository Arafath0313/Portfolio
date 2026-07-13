import { FiZap } from "react-icons/fi";
import { getSkillLevelMeta } from "../../utils/content";
import { buildMediaUrl } from "../../utils/apiHelpers";

const SkillCard = ({ skill }) => {
  const level = getSkillLevelMeta(skill?.level);
  const iconUrl = skill?.icon ? buildMediaUrl(skill.icon) : "";

  return (
    <article className="rounded-[1.5rem] border border-white/70 bg-white/90 p-5 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5">
            {iconUrl ? (
              <img src={iconUrl} alt={skill?.name} loading="lazy" className="h-7 w-7 object-contain" />
            ) : (
              <FiZap className="h-5 w-5 text-teal-600 dark:text-teal-300" />
            )}
          </span>
          <div>
            <h3 className="text-base font-semibold text-slate-950 dark:text-white">{skill?.name}</h3>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {skill?.category?.replaceAll("_", " ") || "Other"}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-700 dark:text-teal-300">
          {level.label}
        </span>
      </div>
      <div className="mt-5">
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"
            style={{ width: `${level.value}%` }}
          />
        </div>
      </div>
    </article>
  );
};

export default SkillCard;
