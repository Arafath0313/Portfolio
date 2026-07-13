import { useCallback, useMemo } from "react";
import { FiPlayCircle, FiStar } from "react-icons/fi";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import FilterBar from "../../components/common/FilterBar";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/navigation/Pagination";
import PageHero from "../../components/public/PageHero";
import { CardGridSkeleton } from "../../components/public/PublicSkeletons";
import SectionHeader from "../../components/public/SectionHeader";
import VideoCard from "../../components/public/VideoCard";
import { useAppContext } from "../../contexts/AppContext";
import useCrudList from "../../hooks/useCrudList";
import usePageSeo from "../../hooks/usePageSeo";
import { youtubeService } from "../../services/api";
import { filterActiveItems, sortByDateDesc } from "../../utils/content";

const videoFilters = [{ key: "featured", label: "Featured", options: [
  { label: "Featured only", value: "true" },
  { label: "Standard only", value: "false" },
] }];

const Videos = () => {
  const { about } = useAppContext();
  const fetchVideos = useCallback(async () => sortByDateDesc(filterActiveItems(await youtubeService.getAll()), ["publishedAt", "updatedAt", "createdAt"]), []);
  const list = useCrudList({
    fetchFn: fetchVideos,
    searchFields: ["title", "description", "videoId"],
    defaultSortKey: "publishedAt",
    defaultSortDir: "desc",
    defaultPageSize: 6,
    filters: { featured: "ALL" },
  });
  const featuredCount = useMemo(() => list.allData.filter((item) => item.featured).length, [list.allData]);

  usePageSeo({ title: "Videos", description: about?.headline || "Browse YouTube videos published through the portfolio backend." });

  return (
    <div className="pb-24">
      <PageHero eyebrow="YouTube Videos" title="Video content and walkthroughs" description="Watch portfolio-related videos with search, featured filtering, and responsive cards built from live API data." breadcrumbs={[{ label: "Videos" }]} aside={<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"><div className="rounded-[1.5rem] border border-white/60 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5"><div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white"><FiPlayCircle className="h-4 w-4" />Videos</div><p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{list.totalItems}</p></div><div className="rounded-[1.5rem] border border-white/60 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5"><div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white"><FiStar className="h-4 w-4" />Featured</div><p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{featuredCount}</p></div></div>} />
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 sm:p-8"><SectionHeader eyebrow="Browse" title="Search and filter the video library" description="Published YouTube entries are listed here automatically as soon as they are active." /><div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"><SearchBar value={list.search} onChange={list.setSearch} placeholder="Search videos by title or description" className="h-12 rounded-full border-slate-200 bg-white/80 px-2 dark:border-white/10 dark:bg-white/5" /><FilterBar filters={videoFilters} values={list.filters} onChange={list.setFilters} className="justify-end" /></div></section>
        <section>{list.loading ? <CardGridSkeleton cards={6} /> : list.error ? <ErrorState onRetry={list.refresh} /> : list.data.length ? <><div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">{list.data.map((video) => <VideoCard key={video.id} video={video} />)}</div><div className="mt-10"><Pagination currentPage={list.page} totalPages={list.totalPages} totalItems={list.totalItems} pageSize={list.pageSize} onPageChange={list.setPage} /></div></> : <EmptyState title="No matching videos" description="Try adjusting the search query or filters to broaden the results." actionLabel="Reset filters" onAction={() => { list.setSearch(""); list.setFilters({ featured: "ALL" }); }} />}</section>
      </div>
    </div>
  );
};

export default Videos;
