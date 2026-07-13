import { useCallback, useMemo } from "react";
import { FiArrowRight, FiAward, FiBookOpen, FiBriefcase, FiFileText, FiMessageSquare, FiVideo } from "react-icons/fi";
import { Link } from "react-router-dom";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import PassionCard from "../../components/public/PassionCard";
import CertificationCard from "../../components/public/CertificationCard";
import LazyImage from "../../components/public/LazyImage";
import PageHero from "../../components/public/PageHero";
import { CardGridSkeleton, HeroSkeleton, StatsSkeleton, TimelineSkeleton } from "../../components/public/PublicSkeletons";
import ProjectCard from "../../components/public/ProjectCard";
import SectionHeader from "../../components/public/SectionHeader";
import SkillCard from "../../components/public/SkillCard";
import SocialLink from "../../components/public/SocialLink";
import StatisticCard from "../../components/public/StatisticCard";
import TimelineItem from "../../components/public/TimelineItem";
import ROUTES from "../../constants/routes";
import { useAppContext } from "../../contexts/AppContext";
import useAsyncData from "../../hooks/useAsyncData";
import usePageSeo from "../../hooks/usePageSeo";
import { passionService, certificationService, projectService, skillService, youtubeService } from "../../services/api";
import { buildMilestones, filterActiveItems, getFeaturedItems, sortByDateDesc, sortByDisplayOrder } from "../../utils/content";

const Home = () => {
  const { about, brandName, contact, resume, siteSettings, socialLinks, loading: appLoading } = useAppContext();

  const loadHomeData = useCallback(async () => {
    const [skills, projects, passions, certifications, videos] = await Promise.all([
      skillService.getAll(),
      projectService.getAll(),
      passionService.getAll(),
      certificationService.getAll(),
      youtubeService.getAll(),
    ]);

    return {
      skills: sortByDisplayOrder(filterActiveItems(skills)),
      projects: sortByDisplayOrder(filterActiveItems(projects)),
      passions: sortByDisplayOrder(filterActiveItems(passions)),
      certifications: sortByDateDesc(filterActiveItems(certifications), ["issueDate", "updatedAt", "createdAt"]),
      videos: sortByDateDesc(filterActiveItems(videos), ["publishedAt", "updatedAt", "createdAt"]),
    };
  }, []);

  const { data, loading, error, refresh } = useAsyncData(loadHomeData, [loadHomeData], {
    initialData: { skills: [], projects: [], passions: [], certifications: [], videos: [] },
  });

  const featuredProjects = useMemo(() => getFeaturedItems(data.projects, 3), [data.projects]);
  const milestones = useMemo(
    () => buildMilestones({ about, resume, passions: data.passions, certifications: data.certifications, videos: data.videos, projects: data.projects }),
    [about, data.passions, data.certifications, data.projects, data.videos, resume]
  );
  const stats = useMemo(
    () => [
      { label: "Projects", value: data.projects.length, description: "Published work", icon: FiBriefcase },
      { label: "Passions", value: data.passions.length, description: "Beyond coding", icon: FiBookOpen },
      { label: "Credentials", value: data.certifications.length, description: "Verified proof", icon: FiAward },
      { label: "Videos", value: data.videos.length, description: "YouTube content", icon: FiVideo },
    ],
    [data.passions.length, data.certifications.length, data.projects.length, data.videos.length]
  );

  usePageSeo({
    description: siteSettings?.seoDescription || about?.headline || `${brandName} portfolio featuring projects, passions, credentials, and contact details.`,
    image: about?.coverImage || about?.profileImage || siteSettings?.logoUrl,
  });

  const heroAside = (
    <div className="grid gap-4">
      <div className="overflow-hidden rounded-[1.5rem] border border-white/60 bg-slate-950/90 p-2 dark:border-white/10">
        <LazyImage src={about?.coverImage || about?.profileImage} alt={about?.fullName || brandName} wrapperClassName="aspect-[4/3] rounded-[1.1rem]" fallbackLabel={about?.fullName || brandName} priority />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {contact.email ? <div className="rounded-[1.35rem] border border-white/60 bg-white/75 p-4 text-sm dark:border-white/10 dark:bg-white/5"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Contact</p><p className="mt-2 font-medium text-slate-950 dark:text-white">{contact.email}</p></div> : null}
        {about?.location || contact.address ? <div className="rounded-[1.35rem] border border-white/60 bg-white/75 p-4 text-sm dark:border-white/10 dark:bg-white/5"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Based in</p><p className="mt-2 font-medium text-slate-950 dark:text-white">{about?.location || contact.address}</p></div> : null}
      </div>
    </div>
  );

  return (
    <div className="pb-24">
      {appLoading && loading ? <HeroSkeleton /> : (
        <PageHero
          eyebrow="Public Portfolio"
          title={about?.headline || brandName}
          description={about?.bio || "Explore a dynamic portfolio connected to live projects, writing, certifications, and video content."}
          meta={[about?.location, contact.email].filter(Boolean)}
          actions={<>
            <Link to={ROUTES.PROJECTS} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">View projects <FiArrowRight className="h-4 w-4" /></Link>
            <Link to={ROUTES.CONTACT} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white dark:hover:text-white">Send a message</Link>
            {resume?.fileUrl ? <Link to={ROUTES.RESUME} className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-500/10 px-5 py-3 text-sm font-semibold text-teal-700 dark:border-teal-400/20 dark:text-teal-300"><FiFileText className="h-4 w-4" />Open resume</Link> : null}
          </>}
          aside={heroAside}
        />
      )}

      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-4 sm:px-6 lg:px-8">
        {socialLinks.length ? <section><SectionHeader eyebrow="Social Links" title="Find this portfolio across the web" description="Every profile below is loaded from backend data." /><div className="mt-8 flex flex-wrap gap-4">{socialLinks.filter((link) => link.platform !== "EMAIL").map((link) => <SocialLink key={link.id} socialLink={link} />)}</div></section> : null}

        <section>
          <SectionHeader eyebrow="Skills" title="Core capabilities" description="A quick snapshot of the skills currently highlighted in the dashboard." action={<Link to={ROUTES.ABOUT} className="text-sm font-semibold text-slate-950 transition hover:text-teal-700 dark:text-white dark:hover:text-teal-300">Learn more</Link>} />
          <div className="mt-8">{loading ? <CardGridSkeleton cards={6} hasMedia={false} /> : data.skills.length ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{data.skills.slice(0, 8).map((skill) => <SkillCard key={skill.id} skill={skill} />)}</div> : <EmptyState title="No skills published yet" description="Skills added from the dashboard will appear here automatically." />}</div>
        </section>

        <section>
          <SectionHeader eyebrow="Featured Projects" title="Selected work" description="A curated slice of recent and featured projects." action={<Link to={ROUTES.PROJECTS} className="text-sm font-semibold text-slate-950 transition hover:text-teal-700 dark:text-white dark:hover:text-teal-300">Browse all projects</Link>} />
          <div className="mt-8">{loading ? <CardGridSkeleton cards={3} hasMedia={false} /> : featuredProjects.length ? <div className="grid gap-6 lg:grid-cols-3">{featuredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : error ? <ErrorState onRetry={refresh} /> : <EmptyState title="No projects available" description="Projects published from the admin dashboard will appear in this section." />}</div>
        </section>

        <section>
          <SectionHeader eyebrow="Statistics" title="A live portfolio snapshot" description="Counts update directly from backend content." />
          <div className="mt-8">{loading ? <StatsSkeleton /> : <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <StatisticCard key={stat.label} stat={stat} />)}</div>}</div>
        </section>
        <section>
          <SectionHeader eyebrow="Timeline" title="Recent milestones" description="A timeline assembled from projects, articles, certifications, videos, and resume updates." />
          <div className="mt-8">{loading ? <TimelineSkeleton /> : milestones.length ? <div className="grid gap-5 lg:grid-cols-2">{milestones.map((item) => <TimelineItem key={item.id} item={item} />)}</div> : <EmptyState title="No milestones yet" description="New published content will begin building the timeline automatically." />}</div>
        </section>

        <section>
          <SectionHeader eyebrow="Beyond Coding" title="Passions & Interests" description="Featured passions and creative outlets." action={<Link to={ROUTES.BEYOND_CODING} className="text-sm font-semibold text-slate-950 transition hover:text-teal-700 dark:text-white dark:hover:text-teal-300">View all</Link>} />
          <div className="mt-8">{loading ? <CardGridSkeleton cards={3} /> : data.passions.filter(p => p.featuredHome).length ? <div className="grid gap-6 lg:grid-cols-3">{data.passions.filter(p => p.featuredHome).slice(0, 3).map((passion) => <PassionCard key={passion.id} passion={passion} />)}</div> : <EmptyState title="No passions featured yet" description="Passions marked as 'Featured on Home' will be listed here automatically." />}</div>
        </section>

        <section>
          <SectionHeader eyebrow="Certifications" title="Credentials and proof" description="A preview of active certifications." action={<Link to={ROUTES.CERTIFICATIONS} className="text-sm font-semibold text-slate-950 transition hover:text-teal-700 dark:text-white dark:hover:text-teal-300">See all credentials</Link>} />
          <div className="mt-8">{loading ? <CardGridSkeleton cards={3} /> : data.certifications.length ? <div className="grid gap-6 lg:grid-cols-3">{data.certifications.slice(0, 3).map((certification) => <CertificationCard key={certification.id} certification={certification} />)}</div> : <EmptyState title="No certifications available" description="Published credentials will appear here once they are active." />}</div>
        </section>

        <section>
          <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(13,148,136,0.92))] px-8 py-10 text-white shadow-[0_30px_90px_-45px_rgba(15,23,42,0.7)] sm:px-10 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">Contact CTA</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Ready to collaborate on something strong?</h2><p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">Use the portfolio contact page for freelance work, roles, collaborations, or technical consultations.</p></div>
            <div className="mt-8 flex flex-wrap gap-3 lg:mt-0 lg:justify-end"><Link to={ROUTES.CONTACT} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"><FiMessageSquare className="h-4 w-4" />Contact now</Link>{contact.email ? <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10">Email directly</a> : null}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
