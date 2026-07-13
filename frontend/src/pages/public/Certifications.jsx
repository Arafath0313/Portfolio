import { useCallback, useMemo } from "react";
import { FiAward, FiShield } from "react-icons/fi";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import FilterBar from "../../components/common/FilterBar";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/navigation/Pagination";
import CertificationCard from "../../components/public/CertificationCard";
import PageHero from "../../components/public/PageHero";
import { CardGridSkeleton } from "../../components/public/PublicSkeletons";
import SectionHeader from "../../components/public/SectionHeader";
import { useAppContext } from "../../contexts/AppContext";
import useCrudList from "../../hooks/useCrudList";
import usePageSeo from "../../hooks/usePageSeo";
import { certificationService } from "../../services/api";
import { filterActiveItems, sortByDateDesc } from "../../utils/content";

const Certifications = () => {
  const { about } = useAppContext();
  const fetchCertifications = useCallback(async () => sortByDateDesc(filterActiveItems(await certificationService.getAll()), ["issueDate", "updatedAt", "createdAt"]), []);
  const list = useCrudList({
    fetchFn: fetchCertifications,
    searchFields: ["title", "issuer", "credentialId"],
    defaultSortKey: "issueDate",
    defaultSortDir: "desc",
    defaultPageSize: 6,
    filters: { issuer: "ALL" },
  });
  const issuerOptions = useMemo(() => Array.from(new Set(list.allData.map((item) => item.issuer).filter(Boolean))).sort().map((issuer) => ({ label: issuer, value: issuer })), [list.allData]);

  usePageSeo({ title: "Certifications", description: about?.headline || "Browse active certifications, issuers, dates, and verification links from the portfolio backend." });

  return (
    <div className="pb-24">
      <PageHero eyebrow="Certifications" title="Verified credentials and achievements" description="Review active certifications with issuer filtering, search, pagination, and optional verification links." breadcrumbs={[{ label: "Certifications" }]} aside={<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"><div className="rounded-[1.5rem] border border-white/60 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5"><div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white"><FiAward className="h-4 w-4" />Active credentials</div><p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{list.totalItems}</p></div><div className="rounded-[1.5rem] border border-white/60 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5"><div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white"><FiShield className="h-4 w-4" />Issuers</div><p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{issuerOptions.length}</p></div></div>} />
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 sm:p-8"><SectionHeader eyebrow="Browse" title="Search and filter certifications" description="The credential grid below is populated entirely from live backend data." /><div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"><SearchBar value={list.search} onChange={list.setSearch} placeholder="Search certification titles, issuers, or IDs" className="h-12 rounded-full border-slate-200 bg-white/80 px-2 dark:border-white/10 dark:bg-white/5" /><FilterBar filters={[{ key: "issuer", label: "Issuer", options: issuerOptions }]} values={list.filters} onChange={list.setFilters} className="justify-end" /></div></section>
        <section>{list.loading ? <CardGridSkeleton cards={6} /> : list.error ? <ErrorState onRetry={list.refresh} /> : list.data.length ? <><div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">{list.data.map((certification) => <CertificationCard key={certification.id} certification={certification} />)}</div><div className="mt-10"><Pagination currentPage={list.page} totalPages={list.totalPages} totalItems={list.totalItems} pageSize={list.pageSize} onPageChange={list.setPage} /></div></> : <EmptyState title="No matching certifications" description="Try adjusting the search query or filters to broaden the results." actionLabel="Reset filters" onAction={() => { list.setSearch(""); list.setFilters({ issuer: "ALL" }); }} />}</section>
      </div>
    </div>
  );
};

export default Certifications;
