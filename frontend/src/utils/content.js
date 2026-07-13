import ROUTES, { getProjectRoute } from "../constants/routes";
import { buildMediaUrl } from "./apiHelpers";

export const toArray = (value) => (Array.isArray(value) ? value : []);

export const filterActiveItems = (items) =>
  toArray(items).filter((item) => item?.active !== false);

export const sortByDisplayOrder = (items) =>
  [...toArray(items)].sort(
    (a, b) =>
      (a?.displayOrder ?? 0) - (b?.displayOrder ?? 0) ||
      (a?.id ?? 0) - (b?.id ?? 0)
  );

const getComparableDate = (item, fields) => {
  for (const field of fields) {
    if (item?.[field]) {
      const date = new Date(item[field]);
      if (!Number.isNaN(date.getTime())) {
        return date.getTime();
      }
    }
  }

  return 0;
};

export const sortByDateDesc = (
  items,
  fields = ["publishedAt", "issueDate", "updatedAt", "createdAt"]
) =>
  [...toArray(items)].sort(
    (a, b) => getComparableDate(b, fields) - getComparableDate(a, fields)
  );

export const takeItems = (items, count) => toArray(items).slice(0, count);

export const getFeaturedItems = (items, count = 3) => {
  const activeItems = filterActiveItems(items);
  const featured = activeItems.filter((item) => item?.featured);
  const source = featured.length ? featured : activeItems;

  return takeItems(sortByDisplayOrder(source), count);
};

export const splitTechnologies = (value) =>
  String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const ensureMediaUrl = (value) => (value ? buildMediaUrl(value) : "");

export const formatCount = (value) =>
  new Intl.NumberFormat(undefined, { notation: "compact" }).format(
    Number(value ?? 0)
  );

export const groupSkillsByCategory = (skills) => {
  return sortByDisplayOrder(filterActiveItems(skills)).reduce((groups, skill) => {
    const key = skill?.category ?? "PROGRAMMING_LANGUAGE";
    groups[key] = [...(groups[key] ?? []), skill];
    return groups;
  }, {});
};

export const toTitleCase = (value) =>
  String(value ?? "")
    .toLowerCase()
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const getSkillLevelMeta = (level) => {
  const levels = {
    BEGINNER: { label: "Beginner", value: 35 },
    INTERMEDIATE: { label: "Intermediate", value: 60 },
    ADVANCED: { label: "Advanced", value: 82 },
    EXPERT: { label: "Expert", value: 96 },
  };

  return levels[level] ?? { label: "Growing", value: 50 };
};

export const getYouTubeWatchUrl = (videoId) =>
  videoId ? `https://www.youtube.com/watch?v=${videoId}` : "#";

export const getYouTubeThumbnailUrl = (videoId) =>
  videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "";

export const stripHtml = (value) =>
  String(value ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

export const buildMilestones = ({
  about,
  resume,
  passions = [],
  certifications = [],
  videos = [],
  projects = [],
}) => {
  const milestones = [];

  if (resume?.updatedAt) {
    milestones.push({
      id: `resume-${resume.id}`,
      title: `Resume refreshed${resume.version ? ` (v${resume.version})` : ""}`,
      description: `${resume.aboutFullName || about?.fullName || "Portfolio"} updated the downloadable resume.`,
      date: resume.updatedAt,
      href: ROUTES.RESUME,
      kind: "Resume",
    });
  }

  sortByDateDesc(filterActiveItems(certifications), ["issueDate", "updatedAt", "createdAt"])
    .slice(0, 3)
    .forEach((certification) => {
      milestones.push({
        id: `cert-${certification.id}`,
        title: certification.title,
        description: `Credential issued by ${certification.issuer}.`,
        date: certification.issueDate || certification.updatedAt || certification.createdAt,
        href: ROUTES.CERTIFICATIONS,
        kind: "Certification",
      });
    });

  sortByDateDesc(filterActiveItems(passions))
    .slice(0, 3)
    .forEach((passion) => {
      milestones.push({
        id: `passion-${passion.id}`,
        title: passion.title,
        description: passion.description || `Added to Beyond Coding.`,
        date: passion.createdAt || passion.updatedAt,
        href: passion.externalUrl || ROUTES.BEYOND_CODING,
        kind: "Passion",
      });
    });

  sortByDateDesc(filterActiveItems(videos))
    .slice(0, 2)
    .forEach((video) => {
      milestones.push({
        id: `video-${video.id}`,
        title: video.title,
        description: "Published a new video resource.",
        date: video.publishedAt || video.updatedAt || video.createdAt,
        href: ROUTES.VIDEOS,
        kind: "Video",
      });
    });

  sortByDateDesc(getFeaturedItems(projects, 2), ["updatedAt", "createdAt"]).forEach(
    (project) => {
      milestones.push({
        id: `project-${project.id}`,
        title: project.title,
        description: project.shortDescription,
        date: project.updatedAt || project.createdAt,
        href: getProjectRoute(project),
        kind: "Project",
      });
    }
  );

  return sortByDateDesc(milestones, ["date"]).slice(0, 6);
};
