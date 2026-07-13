import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/auth/Login";
import Forbidden from "../pages/errors/Forbidden";
import NotFound from "../pages/errors/NotFound";
import ServerError from "../pages/errors/ServerError";
import AdminRoutes from "./AdminRoutes";
import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Projects from "../pages/public/Projects";
import ProjectDetails from "../pages/public/ProjectDetails";
import BeyondCoding from "../pages/public/BeyondCoding";
import Videos from "../pages/public/Videos";
import Certifications from "../pages/public/Certifications";
import Contact from "../pages/public/Contact";
import Resume from "../pages/public/Resume";
import Education from "../pages/public/Education";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:projectSlug" element={<ProjectDetails />} />
        <Route path="beyond-coding" element={<BeyondCoding />} />
        <Route path="videos" element={<Videos />} />
        <Route path="certifications" element={<Certifications />} />
        <Route path="education" element={<Education />} />
        <Route path="contact" element={<Contact />} />
        <Route path="resume" element={<Resume />} />
      </Route>

      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Route>

      <Route path="admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          {AdminRoutes()}
        </Route>
      </Route>

      <Route path="403" element={<Forbidden />} />
      <Route path="500" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
