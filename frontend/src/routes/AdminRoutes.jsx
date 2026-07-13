import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import Loader from "../components/common/Loader";

const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <Loader size="lg" />
  </div>
);

const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const AboutPage = lazy(() => import("../pages/admin/about/AboutPage"));
const AboutForm = lazy(() => import("../pages/admin/about/AboutForm"));
const SkillList = lazy(() => import("../pages/admin/skills/SkillList"));
const SkillForm = lazy(() => import("../pages/admin/skills/SkillForm"));
const SkillView = lazy(() => import("../pages/admin/skills/SkillView"));
const ProjectList = lazy(() => import("../pages/admin/projects/ProjectList"));
const ProjectForm = lazy(() => import("../pages/admin/projects/ProjectForm"));
const ProjectView = lazy(() => import("../pages/admin/projects/ProjectView"));
const CertificationList = lazy(() => import("../pages/admin/certifications/CertificationList"));
const CertificationForm = lazy(() => import("../pages/admin/certifications/CertificationForm"));
const CertificationView = lazy(() => import("../pages/admin/certifications/CertificationView"));
const PassionList = lazy(() => import("../pages/admin/passions/PassionList"));
const PassionForm = lazy(() => import("../pages/admin/passions/PassionForm"));
const PassionView = lazy(() => import("../pages/admin/passions/PassionView"));
const ResumePage = lazy(() => import("../pages/admin/resume/ResumePage"));
const ResumeForm = lazy(() => import("../pages/admin/resume/ResumeForm"));
const SocialLinkList = lazy(() => import("../pages/admin/social-links/SocialLinkList"));
const SocialLinkForm = lazy(() => import("../pages/admin/social-links/SocialLinkForm"));
const SocialLinkView = lazy(() => import("../pages/admin/social-links/SocialLinkView"));
const YouTubeList = lazy(() => import("../pages/admin/youtube/YouTubeList"));
const YouTubeForm = lazy(() => import("../pages/admin/youtube/YouTubeForm"));
const YouTubeView = lazy(() => import("../pages/admin/youtube/YouTubeView"));
const SettingsPage = lazy(() => import("../pages/admin/settings/SettingsPage"));
const SettingsForm = lazy(() => import("../pages/admin/settings/SettingsForm"));
const MessageList = lazy(() => import("../pages/admin/messages/MessageList"));
const MessageView = lazy(() => import("../pages/admin/messages/MessageView"));
const AdminList = lazy(() => import("../pages/admin/admins/AdminList"));
const AdminForm = lazy(() => import("../pages/admin/admins/AdminForm"));
const AdminView = lazy(() => import("../pages/admin/admins/AdminView"));
const SupportPage = lazy(() => import("../pages/admin/support/SupportPage"));

const EducationList = lazy(() => import("../pages/admin/education/EducationList"));
const EducationForm = lazy(() => import("../pages/admin/education/EducationForm"));
const EducationView = lazy(() => import("../pages/admin/education/EducationView"));
const EducationEventList = lazy(() => import("../pages/admin/education/children/educationEventList"));
const EducationEventForm = lazy(() => import("../pages/admin/education/children/educationEventForm"));
const AcademicOrganizationList = lazy(() => import("../pages/admin/education/children/academicOrganizationList"));
const AcademicOrganizationForm = lazy(() => import("../pages/admin/education/children/academicOrganizationForm"));
const EducationGalleryList = lazy(() => import("../pages/admin/education/children/educationGalleryList"));
const EducationGalleryForm = lazy(() => import("../pages/admin/education/children/educationGalleryForm"));
const AcademicAchievementList = lazy(() => import("../pages/admin/education/children/academicAchievementList"));
const AcademicAchievementForm = lazy(() => import("../pages/admin/education/children/academicAchievementForm"));

const AdminRoutes = () => (
  <>
    <Route path="dashboard" element={withSuspense(Dashboard)} />

    <Route path="about" element={withSuspense(AboutPage)} />
    <Route path="about/create" element={withSuspense(AboutForm)} />
    <Route path="about/:id/edit" element={withSuspense(AboutForm)} />

    <Route path="skills" element={withSuspense(SkillList)} />
    <Route path="skills/create" element={withSuspense(SkillForm)} />
    <Route path="skills/:id" element={withSuspense(SkillView)} />
    <Route path="skills/:id/edit" element={withSuspense(SkillForm)} />

    <Route path="projects" element={withSuspense(ProjectList)} />
    <Route path="projects/create" element={withSuspense(ProjectForm)} />
    <Route path="projects/:id" element={withSuspense(ProjectView)} />
    <Route path="projects/:id/edit" element={withSuspense(ProjectForm)} />

    <Route path="certifications" element={withSuspense(CertificationList)} />
    <Route path="certifications/create" element={withSuspense(CertificationForm)} />
    <Route path="certifications/:id" element={withSuspense(CertificationView)} />
    <Route path="certifications/:id/edit" element={withSuspense(CertificationForm)} />

    <Route path="passions" element={withSuspense(PassionList)} />
    <Route path="passions/create" element={withSuspense(PassionForm)} />
    <Route path="passions/:id" element={withSuspense(PassionView)} />
    <Route path="passions/:id/edit" element={withSuspense(PassionForm)} />

    <Route path="resume" element={withSuspense(ResumePage)} />
    <Route path="resume/:id/edit" element={withSuspense(ResumeForm)} />

    <Route path="social-links" element={withSuspense(SocialLinkList)} />
    <Route path="social-links/create" element={withSuspense(SocialLinkForm)} />
    <Route path="social-links/:id" element={withSuspense(SocialLinkView)} />
    <Route path="social-links/:id/edit" element={withSuspense(SocialLinkForm)} />

    <Route path="youtube" element={withSuspense(YouTubeList)} />
    <Route path="youtube/create" element={withSuspense(YouTubeForm)} />
    <Route path="youtube/:id" element={withSuspense(YouTubeView)} />
    <Route path="youtube/:id/edit" element={withSuspense(YouTubeForm)} />

    <Route path="settings" element={withSuspense(SettingsPage)} />
    <Route path="settings/create" element={withSuspense(SettingsForm)} />
    <Route path="settings/:id/edit" element={withSuspense(SettingsForm)} />

    <Route path="messages" element={withSuspense(MessageList)} />
    <Route path="messages/:id" element={withSuspense(MessageView)} />

    <Route path="admins" element={withSuspense(AdminList)} />
    <Route path="admins/create" element={withSuspense(AdminForm)} />
    <Route path="admins/:id" element={withSuspense(AdminView)} />
    <Route path="admins/:id/edit" element={withSuspense(AdminForm)} />

    <Route path="education" element={withSuspense(EducationList)} />
    <Route path="education/create" element={withSuspense(EducationForm)} />
    <Route path="education/:id" element={withSuspense(EducationView)} />
    <Route path="education/:id/edit" element={withSuspense(EducationForm)} />

    <Route path="education/:id/events" element={withSuspense(EducationEventList)} />
    <Route path="education/:id/events/create" element={withSuspense(EducationEventForm)} />
    <Route path="education/:id/events/:childId/edit" element={withSuspense(EducationEventForm)} />

    <Route path="education/:id/organizations" element={withSuspense(AcademicOrganizationList)} />
    <Route path="education/:id/organizations/create" element={withSuspense(AcademicOrganizationForm)} />
    <Route path="education/:id/organizations/:childId/edit" element={withSuspense(AcademicOrganizationForm)} />

    <Route path="education/:id/galleries" element={withSuspense(EducationGalleryList)} />
    <Route path="education/:id/galleries/create" element={withSuspense(EducationGalleryForm)} />
    <Route path="education/:id/galleries/:childId/edit" element={withSuspense(EducationGalleryForm)} />

    <Route path="education/:id/achievements" element={withSuspense(AcademicAchievementList)} />
    <Route path="education/:id/achievements/create" element={withSuspense(AcademicAchievementForm)} />
    <Route path="education/:id/achievements/:childId/edit" element={withSuspense(AcademicAchievementForm)} />

    <Route path="support" element={withSuspense(SupportPage)} />
  </>
);

export default AdminRoutes;
