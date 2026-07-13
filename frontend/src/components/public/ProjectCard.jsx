import { motion } from "framer-motion";
import { FiArrowUpRight, FiCode, FiLayers, FiPlay } from "react-icons/fi";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";
import { getProjectRoute } from "../../constants/routes";
import { formatDate } from "../../utils/formatDate";
import truncateText from "../../utils/truncateText";
import { splitTechnologies } from "../../utils/content";



const ProjectCard = ({ project }) => {
  const technologies = splitTechnologies(project?.technologies).slice(0, 5);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"
    >
      {/* Card header — thumbnail if available, gradient fallback otherwise */}
      {project?.thumbnailUrl ? (
        <div className="relative overflow-hidden border-b border-slate-200/70 dark:border-white/10">
          <LazyImage
            src={project.thumbnailUrl}
            alt={project.title}
            wrapperClassName="aspect-[16/9]"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          {project?.status ? (
            <span className="absolute right-4 top-4 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 ring-1 ring-white/15 backdrop-blur-sm">
              {project.status.replaceAll("_", " ")}
            </span>
          ) : null}
        </div>
      ) : (
        <div className="border-b border-slate-200/70 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.24),transparent_45%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(13,148,136,0.94))] p-6 text-white">
          <div className="flex items-start justify-between gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
              <FiLayers className="h-6 w-6" />
            </span>
            {project?.status ? (
              <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 ring-1 ring-white/15">
                {project.status.replaceAll("_", " ")}
              </span>
            ) : null}
          </div>
          <h3 className="mt-8 text-2xl font-semibold tracking-tight">{project?.title}</h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/80">
            {truncateText(project?.shortDescription || project?.description, 160)}
          </p>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* Title + description in body when thumbnail is the header */}
        {project?.thumbnailUrl && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">{project?.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {truncateText(project?.shortDescription || project?.description, 140)}
            </p>
          </div>
        )}
        {technologies.length ? (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
          {project?.createdAt ? <span>Created {formatDate(project.createdAt)}</span> : null}
          {project?.featured ? (
            <span className="rounded-full bg-amber-500/10 px-3 py-1 font-medium text-amber-700 dark:text-amber-300">
              Featured
            </span>
          ) : null}
        </div>

        <div className="mt-6 flex flex-1 items-end justify-between gap-3">
          <Link
            to={getProjectRoute(project)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-300"
          >
            Explore project
            <FiArrowUpRight className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-2">
            {project?.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-900 hover:text-slate-950 dark:border-white/10 dark:text-slate-300 dark:hover:border-white dark:hover:text-white"
                aria-label={`Open ${project?.title} source code`}
              >
                <FiCode className="h-4 w-4" />
              </a>
            ) : null}
            {project?.liveDemoUrl ? (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-900 hover:text-slate-950 dark:border-white/10 dark:text-slate-300 dark:hover:border-white dark:hover:text-white"
                aria-label={`Open ${project?.title} live demo`}
              >
                <FiPlay className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
