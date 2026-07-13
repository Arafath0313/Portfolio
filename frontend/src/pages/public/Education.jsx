import { useEffect, useState } from "react";
import { FiBookOpen, FiAward, FiCalendar, FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import Loader from "../../components/common/Loader";
import PageHero from "../../components/public/PageHero";
import SectionHeader from "../../components/public/SectionHeader";
import ROUTES from "../../constants/routes";
import usePageSeo from "../../hooks/usePageSeo";
import educationService from "../../services/educationService";
import { filterActiveItems, sortByDisplayOrder } from "../../utils/content";

const EducationCard = ({ education }) => {
  return (
    <div className="relative flex flex-col gap-6 rounded-[2rem] border border-slate-200/60 bg-white/60 p-6 sm:p-8 shadow-sm transition-all hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-slate-900/40 dark:hover:bg-slate-900/60">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-slate-100 pb-6 dark:border-white/5">
        <div className="flex items-center gap-4">
          {education.universityLogo ? (
            <img src={education.universityLogo} alt={education.universityName} className="h-16 w-16 rounded-2xl object-contain p-2 bg-white border border-slate-100 dark:border-white/10 dark:bg-white/5" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <FiBookOpen className="h-8 w-8" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {education.universityWebsite ? (
                <a href={education.universityWebsite} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
                  {education.universityName} <FiExternalLink className="h-4 w-4 text-slate-400" />
                </a>
              ) : education.universityName}
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">
              {education.degree}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5"><FiCalendar className="h-4 w-4" /> {education.enrollmentYear} - {education.expectedGraduationYear || "Present"}</div>
              {education.gpa && <div className="flex items-center gap-1.5"><FiAward className="h-4 w-4" /> GPA: {education.gpa}</div>}
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-xs font-semibold">{education.status}</div>
            </div>
          </div>
        </div>
      </div>
      
      {education.academicSummary && (
        <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
          <p className="whitespace-pre-wrap">{education.academicSummary}</p>
        </div>
      )}
      
      {/* Detail Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
        {education.faculty && (
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Faculty</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{education.faculty}</p>
          </div>
        )}
        {education.department && (
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Department</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{education.department}</p>
          </div>
        )}
        {education.studyMode && (
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Study Mode</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{education.studyMode}</p>
          </div>
        )}
        {(education.currentAcademicYear || education.currentSemester) && (
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Current Standing</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {education.currentAcademicYear} {education.currentSemester ? `(${education.currentSemester})` : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const Education = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    educationService.getAll()
      .then((res) => setData(sortByDisplayOrder(filterActiveItems(res))))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  usePageSeo({ 
    title: "Education & Academics", 
    description: "My academic journey, university degrees, and educational background." 
  });

  return (
    <div className="pb-24">
      <PageHero 
        eyebrow="Education" 
        title="My Academic Journey" 
        description="A comprehensive overview of my university education, academic standing, and related scholarly activities." 
        breadcrumbs={[{ label: "Education" }]} 
        aside={
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[1.5rem] border border-white/60 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
                        <FiBookOpen className="h-4 w-4" /> Degrees
                    </div>
                    <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{data.length}</p>
                </div>
            </div>
        }
      />
      
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 sm:px-6 lg:px-8 mt-12">
        <section>
          <SectionHeader 
            eyebrow="Academic Background" 
            title="Formal Education" 
            description="Detailed information about my current and past university studies." 
          />
          <div className="mt-8 flex flex-col gap-8">
            {loading ? (
              <div className="flex justify-center py-12"><Loader size="lg" /></div>
            ) : error ? (
              <ErrorState title="Unable to load education" message="Please try again later." />
            ) : data.length > 0 ? (
              data.map((edu) => (
                <EducationCard key={edu.id} education={edu} />
              ))
            ) : (
              <EmptyState title="No education records found" description="Academic details have not been added yet." />
            )}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80">
          <SectionHeader 
            eyebrow="Extracurricular" 
            title="Beyond the Classroom" 
            description="I actively participate in clubs, events, and competitions to broaden my skill set and connect with others." 
            action={
              <Link to={ROUTES.CONTACT} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">
                Get in touch
              </Link>
            } 
          />
        </section>
      </div>
    </div>
  );
};

export default Education;