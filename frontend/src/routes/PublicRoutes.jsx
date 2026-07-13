import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import Loader from "../components/common/Loader";
import MainLayout from "../layouts/MainLayout";

const Home = lazy(() => import("../pages/public/Home"));
const About = lazy(() => import("../pages/public/About"));
const Projects = lazy(() => import("../pages/public/Projects"));
const ProjectDetails = lazy(() => import("../pages/public/ProjectDetails"));
const BeyondCoding = lazy(() => import("../pages/public/BeyondCoding"));
const Videos = lazy(() => import("../pages/public/Videos"));
const Certifications = lazy(() => import("../pages/public/Certifications"));
const Contact = lazy(() => import("../pages/public/Contact"));
const Resume = lazy(() => import("../pages/public/Resume"));
const Education = lazy(() => import("../pages/public/Education"));

const PageLoader = () => <div className="flex min-h-[60vh] items-center justify-center"><Loader size="lg" /></div>;
const withSuspense = (node) => <Suspense fallback={<PageLoader />}>{node}</Suspense>;

const PublicRoutes = () => {
  return (
    <Route element={<MainLayout />}>
      <Route index element={withSuspense(<Home />)} />
      <Route path="about" element={withSuspense(<About />)} />
      <Route path="projects" element={withSuspense(<Projects />)} />
      <Route path="projects/:projectSlug" element={withSuspense(<ProjectDetails />)} />
      <Route path="beyond-coding" element={withSuspense(<BeyondCoding />)} />
      <Route path="videos" element={withSuspense(<Videos />)} />
      <Route path="certifications" element={withSuspense(<Certifications />)} />
      <Route path="education" element={withSuspense(<Education />)} />
      <Route path="contact" element={withSuspense(<Contact />)} />
      <Route path="resume" element={withSuspense(<Resume />)} />
    </Route>
  );
};

export default PublicRoutes;
