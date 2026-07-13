import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import PageHero from "../../components/public/PageHero";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import PassionCard from "../../components/public/PassionCard";
import { CardGridSkeleton, HeroSkeleton } from "../../components/public/PublicSkeletons";
import useAsyncData from "../../hooks/useAsyncData";
import usePageSeo from "../../hooks/usePageSeo";
import { passionService } from "../../services/api";
import { filterActiveItems, sortByDisplayOrder } from "../../utils/content";
import { PASSION_CATEGORIES, getEnumLabel } from "../../constants/enums";

const BeyondCoding = () => {
  const loadPassions = useCallback(async () => {
    const data = await passionService.getAll();
    return sortByDisplayOrder(filterActiveItems(data));
  }, []);

  const { data: passions, loading, error, refresh } = useAsyncData(loadPassions, [loadPassions], {
    initialData: [],
  });

  usePageSeo({
    title: "Beyond Coding | Portfolio",
    description: "Explore my creative passions, hobbies, and interests outside of software engineering.",
  });

  // Group dynamically by category
  const groupedPassions = useMemo(() => {
    if (!passions || passions.length === 0) return {};
    
    return passions.reduce((acc, passion) => {
      const categoryKey = passion.category;
      if (!acc[categoryKey]) {
        acc[categoryKey] = [];
      }
      acc[categoryKey].push(passion);
      return acc;
    }, {});
  }, [passions]);

  if (loading && passions.length === 0) {
    return (
      <div className="pb-24">
        <HeroSkeleton />
        <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <CardGridSkeleton cards={6} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pb-24 pt-32">
        <ErrorState onRetry={refresh} />
      </div>
    );
  }

  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Beyond Coding"
        title="Passions & Interests"
        description="Software engineering is what I do, but it's not all I am. Here is a look at my creative outlets, hobbies, and the things that keep me inspired off-screen."
      />

      <div className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
        {Object.keys(groupedPassions).length > 0 ? (
          Object.entries(groupedPassions).map(([category, items], index) => (
            <motion.section 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-10 border-b border-slate-200 pb-5 dark:border-white/10">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {getEnumLabel(PASSION_CATEGORIES, category)}
                </h2>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((passion) => (
                  <PassionCard key={passion.id} passion={passion} />
                ))}
              </div>
            </motion.section>
          ))
        ) : (
          <EmptyState
            title="No passions published yet"
            description="Content will appear here once it's added from the dashboard."
          />
        )}
      </div>
    </div>
  );
};

export default BeyondCoding;
