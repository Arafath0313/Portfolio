import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import StatusChip from "../../../components/ui/StatusChip";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import educationService from "../../../services/educationService";


const DetailRow = ({ label, value }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-slate-100 dark:border-slate-700 last:border-0">
    <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</dt>
    <dd className="mt-1 text-sm text-slate-900 dark:text-white sm:col-span-2 sm:mt-0">{value ?? "—"}</dd>
  </div>
);

const EducationView = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    educationService
      .getById(id)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Education not found"
        message="Could not load education record."
      />
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link to="/admin/education" className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400">
            ← Back to Education List
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{data.universityName}</h1>
        </div>
        <Link to={`/admin/education/${id}/edit`}>
          <Button size="sm">
            <FiEdit2 className="mr-1.5 h-4 w-4" />
            Edit
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-1">
          <h2 className="font-semibold text-lg mb-4">Summary</h2>
          {data.universityLogo && (
            <img src={data.universityLogo} alt="Logo" className="h-16 mb-4 object-contain" />
          )}
          <dl>
            <DetailRow label="Degree" value={data.degree} />
            <DetailRow label="Timeline" value={`${data.enrollmentYear} - ${data.expectedGraduationYear || 'Present'}`} />
            <DetailRow label="Status" value={data.status} />
            <DetailRow label="Active" value={<StatusChip active={data.active} />} />
          </dl>
        </Card>
        
        <Card className="p-6 lg:col-span-2">
            <h2 className="font-semibold text-lg mb-4">Children Management</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Manage events, organizations, galleries, and achievements related to this education.
            </p>
            <div className="flex flex-wrap gap-2">
                <Link to={`/admin/education/${id}/events`}>
                    <Button variant="secondary">Manage Events</Button>
                </Link>
                <Link to={`/admin/education/${id}/organizations`}>
                    <Button variant="secondary">Manage Organizations</Button>
                </Link>
                <Link to={`/admin/education/${id}/galleries`}>
                    <Button variant="secondary">Manage Gallery</Button>
                </Link>
                <Link to={`/admin/education/${id}/achievements`}>
                    <Button variant="secondary">Manage Achievements</Button>
                </Link>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default EducationView;