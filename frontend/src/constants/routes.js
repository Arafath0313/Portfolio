const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PROJECTS: "/projects",
  PROJECT_DETAIL: "/projects/:projectSlug",
  BEYOND_CODING: "/beyond-coding",
  CERTIFICATIONS: "/certifications",
  VIDEOS: "/videos",
  CONTACT: "/contact",
  RESUME: "/resume",
  LOGIN: "/login",
  ADMIN: "/admin",
  EDUCATION: "/education",
};

export const getProjectRoute = (project) => {
  const id = project?.id ?? "";
  const slug = project?.slug ? `-${project.slug}` : "";
  return `${ROUTES.PROJECTS}/${id}${slug}`;
};


export const getEntityIdFromSlug = (slugValue) => {
  const firstToken = String(slugValue ?? "").split("-")[0];
  const id = Number(firstToken);

  return Number.isFinite(id) && id > 0 ? id : null;
};

export default ROUTES;
