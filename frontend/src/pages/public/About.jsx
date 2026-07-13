import { useCallback, useMemo } from "react";
import { FiArrowRight, FiAward, FiBookOpen, FiBriefcase, FiMapPin, FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import CertificationCard from "../../components/public/CertificationCard";
import LazyImage from "../../components/public/LazyImage";
import PageHero from "../../components/public/PageHero";
import { CardGridSkeleton, HeroSkeleton, StatsSkeleton, TimelineSkeleton } from "../../components/public/PublicSkeletons";
import SectionHeader from "../../components/public/SectionHeader";
import SkillCard from "../../components/public/SkillCard";
import SocialLink from "../../components/public/SocialLink";
import StatisticCard from "../../components/public/StatisticCard";
import TimelineItem from "../../components/public/TimelineItem";
import ROUTES from "../../constants/routes";
import { useAppContext } from "../../contexts/AppContext";
import useAsyncData from "../../hooks/useAsyncData";
import usePageSeo from "../../hooks/usePageSeo";
import { certificationService, projectService, skillService, passionService } from "../../services/api";
import { buildMilestones, filterActiveItems, groupSkillsByCategory, sortByDateDesc, sortByDisplayOrder } from "../../utils/content";

const About = () => {
  const { about, contact, brandName, resume, socialLinks, loading: appLoading } = useAppContext();

  const loadAboutPage = useCallback(async () => {
    const [skills, projects, passions, certifications] = await Promise.all([
      skillService.getAll(),
      projectService.getAll(),
      passionService.getAll(),
      certificationService.getAll(),
    ]);

    return {
      skills: sortByDisplayOrder(filterActiveItems(skills)),
      projects: sortByDisplayOrder(filterActiveItems(projects)),
      passions: sortByDateDesc(filterActiveItems(passions)),
      certifications: sortByDateDesc(filterActiveItems(certifications), ["issueDate", "updatedAt", "createdAt"]),
    };
  }, []);

  const { data, loading, error, refresh } = useAsyncData(loadAboutPage, [loadAboutPage], {
    initialData: { skills: [], projects: [], passions: [], certifications: [] },
  });

  const skillGroups = useMemo(() => Object.entries(groupSkillsByCategory(data.skills)), [data.skills]);
  const milestones = useMemo(
    () => buildMilestones({ about, resume, passions: data.passions, certifications: data.certifications, projects: data.projects }),
    [about, data.passions, data.certifications, data.projects, resume]
  );
  const stats = useMemo(
    () => [
      { label: "Projects", value: data.projects.length, description: "Published work", icon: FiBriefcase },
      { label: "Skills", value: data.skills.length, description: "Tracked capabilities", icon: FiSend },
      { label: "Passions", value: data.passions.length, description: "Beyond coding", icon: FiBookOpen },
      { label: "Credentials", value: data.certifications.length, description: "Active proof", icon: FiAward },
    ],
    [data.passions.length, data.certifications.length, data.projects.length, data.skills.length]
  );

  usePageSeo({ title: "About", description: about?.bio || `${brandName} portfolio biography, skill map, and public timeline.`, image: about?.profileImage || about?.coverImage });

  return (
    <div className="pb-24">
      {appLoading && loading ? <HeroSkeleton /> : <PageHero eyebrow="About" title={about?.fullName || brandName} description={about?.headline || about?.bio || "Learn more about the person behind the work."} breadcrumbs={[{ label: "About" }]} meta={[about?.location, contact.email].filter(Boolean)} actions={<><Link to={ROUTES.PROJECTS} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">View work <FiArrowRight className="h-4 w-4" /></Link><Link to={ROUTES.CONTACT} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white dark:hover:text-white">Say hello</Link></>} aside={<div className="grid gap-4"><div className="overflow-hidden rounded-[1.5rem] border border-white/60 bg-slate-950/90 p-2 dark:border-white/10"><LazyImage src={about?.profileImage || about?.coverImage} alt={about?.fullName || brandName} wrapperClassName="aspect-[4/5] rounded-[1.1rem]" fallbackLabel={about?.fullName || brandName} priority /></div><div className="rounded-[1.35rem] border border-white/60 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Quick details</p><div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">{about?.location ? <p>{about.location}</p> : null}{contact.email ? <p>{contact.email}</p> : null}{contact.phone ? <p>{contact.phone}</p> : null}</div></div></div>} />}

      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-4 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80">
            <SectionHeader eyebrow="Story" title="Background and approach" description="Biography details flow directly from the backend profile data." />
            <div className="prose-portfolio mt-8 text-sm leading-8 text-slate-600 dark:text-slate-300 sm:text-base">{(about?.bio || "A detailed biography has not been published yet.").split(/\n{2,}/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
          </div>
          <div className="space-y-5">
            <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"><h2 className="text-lg font-semibold text-slate-950 dark:text-white">Direct contact</h2><div className="mt-5 space-y-4 text-sm text-slate-600 dark:text-slate-300">{contact.email ? <p>{contact.email}</p> : null}{contact.phone ? <p>{contact.phone}</p> : null}{contact.address ? <p>{contact.address}</p> : null}</div></div>
            {socialLinks.length ? <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"><h2 className="text-lg font-semibold text-slate-950 dark:text-white">Social profiles</h2><div className="mt-5 flex flex-col gap-3">{socialLinks.map((link) => <SocialLink key={link.id} socialLink={link} />)}</div></div> : null}
            {about?.location ? <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"><div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white"><FiMapPin className="h-4 w-4" />Location</div><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{about.location}</p></div> : null}
          </div>
        </section>

        <section><SectionHeader eyebrow="Snapshot" title="Portfolio metrics" description="A quick breakdown of public portfolio content." /><div className="mt-8">{loading ? <StatsSkeleton /> : <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <StatisticCard key={stat.label} stat={stat} />)}</div>}</div></section>

        <section>
          <SectionHeader eyebrow="Skills" title="Capabilities by category" description="Grouped dynamically from the live skills API." />
          <div className="mt-8 space-y-8">{loading ? <CardGridSkeleton cards={6} hasMedia={false} /> : skillGroups.length ? skillGroups.map(([category, skills]) => <div key={category}><h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{category.replaceAll("_", " ")}</h3><div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{skills.map((skill) => <SkillCard key={skill.id} skill={skill} />)}</div></div>) : error ? <ErrorState onRetry={refresh} /> : <EmptyState title="No skills available" description="Published skills will appear here automatically." />}</div>
        </section>

        <section><SectionHeader eyebrow="Timeline" title="Recent portfolio activity" description="A combined timeline built from resume updates, projects, articles, and certifications." /><div className="mt-8">{loading ? <TimelineSkeleton /> : milestones.length ? <div className="grid gap-5 lg:grid-cols-2">{milestones.map((item) => <TimelineItem key={item.id} item={item} />)}</div> : <EmptyState title="No recent activity" description="Timeline entries will appear as more public content is published." />}</div></section>

        <section><SectionHeader eyebrow="Credentials" title="Highlighted certifications" description="A selected preview of active credentials." action={<Link to={ROUTES.CERTIFICATIONS} className="text-sm font-semibold text-slate-950 transition hover:text-teal-700 dark:text-white dark:hover:text-teal-300">View all certifications</Link>} /><div className="mt-8">{loading ? <CardGridSkeleton cards={3} /> : data.certifications.length ? <div className="grid gap-6 lg:grid-cols-3">{data.certifications.slice(0, 3).map((certification) => <CertificationCard key={certification.id} certification={certification} />)}</div> : <EmptyState title="No certifications published" description="Credentials added in the dashboard will surface here automatically." />}</div></section>
      </div>
    </div>
  );
};

export default About;
