import { useCallback, useMemo } from "react";
import { FiLayers, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import FilterBar from "../../components/common/FilterBar";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/navigation/Pagination";
import PageHero from "../../components/public/PageHero";
import { CardGridSkeleton } from "../../components/public/PublicSkeletons";
import ProjectCard from "../../components/public/ProjectCard";
import SectionHeader from "../../components/public/SectionHeader";
import ROUTES from "../../constants/routes";
import { useAppContext } from "../../contexts/AppContext";
import useCrudList from "../../hooks/useCrudList";
import usePageSeo from "../../hooks/usePageSeo";
import { projectService } from "../../services/api";
import { filterActiveItems, getFeaturedItems, sortByDisplayOrder } from "../../utils/content";

const projectFilters = [
  { key: "status", label: "Status", options: [
    { label: "Planning", value: "PLANNING" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Completed", value: "COMPLETED" },
    { label: "On Hold", value: "ON_HOLD" },
  ] },
  { key: "featured", label: "Featured", options: [
    { label: "Featured only", value: "true" },
    { label: "Standard only", value: "false" },
  ] },
];

const Projects = () => {
  const { about } = useAppContext();
  const fetchProjects = useCallback(async () => sortByDisplayOrder(filterActiveItems(await projectService.getAll())), []);
  const list = useCrudList({
    fetchFn: fetchProjects,
    searchFields: ["title", "shortDescription", "description", "technologies", "status"],
    defaultSortKey: "displayOrder",
    defaultSortDir: "asc",
    defaultPageSize: 6,
    filters: { status: "ALL", featured: "ALL" },
  });
  const featuredCount = useMemo(() => getFeaturedItems(list.allData, list.totalItems).length, [list.allData, list.totalItems]);

  usePageSeo({ title: "Projects", description: about?.headline || "Browse portfolio projects, technology choices, and live detail pages." });

  return (
    <div className="pb-24">
      <PageHero eyebrow="Projects" title="Work shaped into public case studies" description="Browse active portfolio projects with search, filters, pagination, and dedicated detail pages powered by the backend APIs." breadcrumbs={[{ label: "Projects" }]} aside={<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"><div className="rounded-[1.5rem] border border-white/60 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5"><div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white"><FiLayers className="h-4 w-4" />Active projects</div><p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{list.totalItems}</p></div><div className="rounded-[1.5rem] border border-white/60 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5"><div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white"><FiStar className="h-4 w-4" />Featured</div><p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{featuredCount}</p></div></div>} />
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 sm:p-8">
          <SectionHeader eyebrow="Browse" title="Search and filter the project archive" description="Everything here is driven by live project data." />
          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"><SearchBar value={list.search} onChange={list.setSearch} placeholder="Search projects, technologies, or descriptions" className="h-12 rounded-full border-slate-200 bg-white/80 px-2 dark:border-white/10 dark:bg-white/5" /><FilterBar filters={projectFilters} values={list.filters} onChange={list.setFilters} className="justify-end" /></div>
        </section>
        <section>
          {list.loading ? <CardGridSkeleton cards={6} hasMedia={false} /> : list.error ? <ErrorState onRetry={list.refresh} /> : list.data.length ? <><div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">{list.data.map((project) => <ProjectCard key={project.id} project={project} />)}</div><div className="mt-10"><Pagination currentPage={list.page} totalPages={list.totalPages} totalItems={list.totalItems} pageSize={list.pageSize} onPageChange={list.setPage} /></div></> : <EmptyState title="No matching projects" description="Try adjusting the search query or filters to broaden the results." actionLabel="Reset filters" onAction={() => { list.setSearch(""); list.setFilters({ status: "ALL", featured: "ALL" }); }} />}
        </section>

        <section className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80">
          <SectionHeader eyebrow="Next step" title="Want the full story behind a project?" description="Each card links to a dedicated detail page that keeps visitors close to implementation details without leaving the portfolio flow." action={<Link to={ROUTES.CONTACT} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">Discuss a project</Link>} />
        </section>
      </div>
    </div>
  );
};

export default Projects;
