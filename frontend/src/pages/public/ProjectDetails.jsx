import { useCallback, useMemo } from "react";
import { FiArrowUpRight, FiClock, FiCode, FiExternalLink, FiLayers } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import LazyImage from "../../components/public/LazyImage";
import PageHero from "../../components/public/PageHero";
import { CardGridSkeleton, DetailSkeleton } from "../../components/public/PublicSkeletons";
import ProjectCard from "../../components/public/ProjectCard";
import SectionHeader from "../../components/public/SectionHeader";
import ROUTES, { getEntityIdFromSlug } from "../../constants/routes";
import useAsyncData from "../../hooks/useAsyncData";
import usePageSeo from "../../hooks/usePageSeo";
import NotFound from "../errors/NotFound";
import { projectService } from "../../services/api";
import { getApiError } from "../../utils/apiHelpers";
import { formatDate, formatDateTime } from "../../utils/formatDate";
import { filterActiveItems, getFeaturedItems, splitTechnologies, stripHtml } from "../../utils/content";

const ProjectDetails = () => {
  const { projectSlug } = useParams();
  const projectId = getEntityIdFromSlug(projectSlug);

  const loadProject = useCallback(async () => {
    if (!projectId) return { project: null, relatedProjects: [] };

    try {
      const [project, allProjects] = await Promise.all([
        projectService.getPublicById(projectId),
        projectService.getAll(),
      ]);
      const activeProjects = filterActiveItems(allProjects);
      if (!project || project.active === false) return { project: null, relatedProjects: [] };
      return { project, relatedProjects: getFeaturedItems(activeProjects.filter((item) => item.id !== project.id), 3) };
    } catch (error) {
      if (getApiError(error).status === 404) return { project: null, relatedProjects: [] };
      throw error;
    }
  }, [projectId]);

  const { data, loading, error, refresh } = useAsyncData(loadProject, [loadProject], {
    initialData: { project: null, relatedProjects: [] },
  });

  const technologies = useMemo(() => splitTechnologies(data.project?.technologies), [data.project?.technologies]);
  const contentBlocks = useMemo(() => String(data.project?.description || data.project?.shortDescription || "").split(/\n{2,}/).map((item) => item.trim()).filter(Boolean), [data.project?.description, data.project?.shortDescription]);

  usePageSeo({ title: data.project?.title || "Project", description: stripHtml(data.project?.shortDescription || data.project?.description || "Project details") });

  if (!projectId) return <NotFound />;
  if (loading && !data.project) return <div className="pb-24"><DetailSkeleton /></div>;
  if (!loading && !error && !data.project) return <NotFound />;

  return (
    <div className="pb-24">
      {data.project ? <PageHero eyebrow="Project Detail" title={data.project.title} description={data.project.shortDescription || data.project.description} breadcrumbs={[{ label: "Projects", to: ROUTES.PROJECTS }, { label: data.project.title }]} meta={[data.project.status?.replaceAll("_", " "), data.project.featured ? "Featured" : null, data.project.updatedAt ? `Updated ${formatDate(data.project.updatedAt)}` : null].filter(Boolean)} actions={<>{data.project.liveDemoUrl ? <a href={data.project.liveDemoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">Live demo <FiExternalLink className="h-4 w-4" /></a> : null}{data.project.githubUrl ? <a href={data.project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white dark:hover:text-white">Source code <FiCode className="h-4 w-4" /></a> : null}</>} aside={<div className="rounded-[1.6rem] border border-white/60 bg-white/80 p-6 dark:border-white/10 dark:bg-white/5"><div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white"><FiLayers className="h-4 w-4" />Project snapshot</div><div className="mt-5 space-y-4 text-sm text-slate-600 dark:text-slate-300">{data.project.status ? <p>Status: {data.project.status.replaceAll("_", " ")}</p> : null}{data.project.createdAt ? <p>Created: {formatDate(data.project.createdAt)}</p> : null}{data.project.updatedAt ? <p>Last update: {formatDateTime(data.project.updatedAt)}</p> : null}{technologies.length ? <p>{technologies.length} technologies listed</p> : null}</div></div>} /> : null}
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        {error ? <ErrorState onRetry={refresh} /> : null}
        {data.project ? <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]"><article className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"><SectionHeader eyebrow="Overview" title="What this project delivers" description="This detail page uses live backend data only." /><div className="prose-portfolio mt-8 text-sm leading-8 text-slate-600 dark:text-slate-300 sm:text-base">{contentBlocks.length ? contentBlocks.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>No detailed project description has been published yet.</p>}</div></article><aside className="space-y-6">{data.project.thumbnailUrl ? <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"><LazyImage src={data.project.thumbnailUrl} alt={data.project.title} wrapperClassName="aspect-[16/9]" fallbackLabel={data.project.title} /></div> : null}<div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"><div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white"><FiClock className="h-4 w-4" />Timeline</div><div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">{data.project.createdAt ? <p>Created on {formatDate(data.project.createdAt)}</p> : null}{data.project.updatedAt ? <p>Updated on {formatDate(data.project.updatedAt)}</p> : null}</div></div><div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"><h2 className="text-lg font-semibold text-slate-950 dark:text-white">Technology stack</h2>{technologies.length ? <div className="mt-5 flex flex-wrap gap-2">{technologies.map((tech) => <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">{tech}</span>)}</div> : <EmptyState title="No technologies listed" description="This project has not published its technology list yet." />}</div></aside></section> : null}

        <section><SectionHeader eyebrow="Related" title="Explore more work" description="More active projects visitors can continue into from this detail page." action={<Link to={ROUTES.PROJECTS} className="text-sm font-semibold text-slate-950 transition hover:text-teal-700 dark:text-white dark:hover:text-teal-300">Back to all projects <FiArrowUpRight className="ml-2 inline h-4 w-4" /></Link>} /><div className="mt-8">{loading ? <CardGridSkeleton cards={3} hasMedia={false} /> : data.relatedProjects.length ? <div className="grid gap-6 lg:grid-cols-3">{data.relatedProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : <EmptyState title="No related projects available" description="Additional active projects will appear here automatically once published." />}</div></section>
      </div>
    </div>
  );
};

export default ProjectDetails;
