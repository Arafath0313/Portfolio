import { FiDownload, FiExternalLink, FiFileText, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import EmptyState from "../../components/common/EmptyState";
import PageHero from "../../components/public/PageHero";
import SectionHeader from "../../components/public/SectionHeader";
import ROUTES from "../../constants/routes";
import { useAppContext } from "../../contexts/AppContext";
import usePageSeo from "../../hooks/usePageSeo";
import { buildMediaUrl, formatFileSize } from "../../utils/apiHelpers";
import { formatDateTime } from "../../utils/formatDate";

const Resume = () => {
  const { about, contact, resume } = useAppContext();
  const resumeUrl = resume?.fileUrl ? buildMediaUrl(resume.fileUrl) : "";
  const isPdf = String(resume?.fileType || "").toUpperCase() === "PDF";

  usePageSeo({ title: "Resume", description: about?.headline || "View or download the latest resume published in the portfolio backend." });

  return (
    <div className="pb-24">
      <PageHero eyebrow="Resume" title="Download the latest resume" description="This page reads the active resume directly from the backend and adapts to the available file type." breadcrumbs={[{ label: "Resume" }]} aside={<div className="rounded-[1.6rem] border border-white/60 bg-white/80 p-6 dark:border-white/10 dark:bg-white/5"><div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white"><FiFileText className="h-4 w-4" />File details</div><div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">{resume?.fileName ? <p>Name: {resume.fileName}</p> : null}{resume?.version ? <p>Version: {resume.version}</p> : null}{resume?.fileSize ? <p>Size: {formatFileSize(resume.fileSize)}</p> : null}{resume?.updatedAt ? <p>Updated: {formatDateTime(resume.updatedAt)}</p> : null}</div></div>} />
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        {!resumeUrl ? <EmptyState title="No active resume published" description="Once a resume is uploaded and activated in the dashboard, it will appear here automatically." /> : <><section className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"><SectionHeader eyebrow="Access" title="Open or download the resume" description="Use the buttons below to view the latest file published from the admin dashboard." action={<div className="flex flex-wrap gap-3"><a href={resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"><FiExternalLink className="h-4 w-4" />Open file</a><a href={resumeUrl} download className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white dark:hover:text-white"><FiDownload className="h-4 w-4" />Download</a></div>} />{isPdf ? <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200 dark:border-white/10"><iframe title="Resume preview" src={resumeUrl} className="h-[72vh] w-full bg-white" /></div> : <div className="mt-8 rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">Preview is not available for this file type. Use the buttons above to open or download the latest resume.</div>}</section><section className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"><SectionHeader eyebrow="Contact" title="Need more context than a resume can show?" description="Pair the resume with a direct message for project context, availability, or collaboration details." action={contact.email ? <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"><FiMail className="h-4 w-4" />Email directly</a> : <Link to={ROUTES.CONTACT} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">Go to contact</Link>} /></section></>}
      </div>
    </div>
  );
};

export default Resume;
