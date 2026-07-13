import { motion } from "framer-motion";
import { FiArrowUpRight, FiPlayCircle } from "react-icons/fi";
import { formatDate } from "../../utils/formatDate";
import truncateText from "../../utils/truncateText";
import { getYouTubeThumbnailUrl, getYouTubeWatchUrl } from "../../utils/content";
import LazyImage from "./LazyImage";

const VideoCard = ({ video }) => {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"
    >
      <div className="relative">
        <LazyImage
          src={video?.thumbnailUrl || getYouTubeThumbnailUrl(video?.videoId)}
          alt={video?.title || "Video thumbnail"}
          wrapperClassName="aspect-video overflow-hidden"
          className="transition-transform duration-500 group-hover:scale-105"
          fallbackLabel="Video"
        />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-950/80 text-white shadow-xl ring-8 ring-white/20 transition-colors group-hover:bg-teal-600 dark:bg-white/90 dark:text-slate-950 dark:ring-slate-950/20 dark:group-hover:bg-teal-500 dark:group-hover:text-white">
            <FiPlayCircle className="h-8 w-8" />
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          {video?.featured ? <span>Featured</span> : null}
          {video?.publishedAt ? <span>{formatDate(video.publishedAt)}</span> : null}
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {video?.title}
        </h3>
        <p className="mt-4 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {truncateText(video?.description, 170) || "Watch the latest portfolio video content and walkthroughs."}
        </p>
        <a
          href={getYouTubeWatchUrl(video?.videoId)}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-300"
        >
          Watch on YouTube
          <FiArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
};

export default VideoCard;
