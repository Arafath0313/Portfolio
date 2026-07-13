import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import LazyImage from "./LazyImage";
import { PASSION_CATEGORIES, CONTENT_PLATFORMS, getEnumLabel } from "../../constants/enums";
import truncateText from "../../utils/truncateText";

const PassionCard = ({ passion }) => {
  const isExternal = !!passion?.externalUrl;

  const cardContent = (
    <>
      <LazyImage
        src={passion?.thumbnail}
        alt={passion?.title || "Passion thumbnail"}
        wrapperClassName="aspect-[16/10] overflow-hidden"
        className="transition-transform duration-500 group-hover:scale-105"
        fallbackLabel={getEnumLabel(PASSION_CATEGORIES, passion?.category) || "Passion"}
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          {passion?.category ? <span>{getEnumLabel(PASSION_CATEGORIES, passion.category)}</span> : null}
          {passion?.contentPlatform && passion.contentPlatform !== "NONE" ? <span>{getEnumLabel(CONTENT_PLATFORMS, passion.contentPlatform)}</span> : null}
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {passion?.title}
        </h3>
        <p className="mt-4 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {truncateText(passion?.description, 180)}
        </p>
        
        {isExternal && (
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-300">
            View details
            <FiExternalLink className="h-4 w-4" />
          </div>
        )}
      </div>
    </>
  );

  const cardClasses = "group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80";

  return isExternal ? (
    <motion.a
      href={passion.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className={cardClasses}
    >
      {cardContent}
    </motion.a>
  ) : (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className={cardClasses}
    >
      {cardContent}
    </motion.div>
  );
};

export default PassionCard;
