import { useCallback } from "react";
import AdminCrudList from "../../../components/admin/AdminCrudList";
import ActionButtons from "../../../components/admin/ActionButtons";
import StatusChip from "../../../components/ui/StatusChip";
import certificationService from "../../../services/certificationService";
import { formatDate, buildMediaUrl } from "../../../utils/apiHelpers";
import { FiImage } from "react-icons/fi";

const CertificationList = () => {
  const fetchFn = useCallback(() => certificationService.getAll(), []);

  const columns = [
    {
      key: "imageUrl",
      header: "Image",
      sortable: false,
      render: (val) => (
        val ? (
          <img
            src={buildMediaUrl(val)}
            alt="Thumbnail"
            className="h-10 w-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-700 dark:bg-slate-800">
            <FiImage className="h-5 w-5" />
          </div>
        )
      ),
    },
    { key: "title", header: "Title" },
    { key: "issuer", header: "Organization" },
    { key: "issueDate", header: "Issue Date", render: (val) => formatDate(val) },
    { key: "displayOrder", header: "Order" },
    { key: "active", header: "Status", render: (val) => <StatusChip active={val} /> },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (_, row, onDelete) => (
        <ActionButtons
          viewTo={`/admin/certifications/${row.id}`}
          editTo={`/admin/certifications/${row.id}/edit`}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return (
    <AdminCrudList
      title="Certifications"
      description="Manage professional certifications and credentials."
      createTo="/admin/certifications/create"
      fetchFn={fetchFn}
      searchFields={["title", "issuer", "credentialId"]}
      columns={columns}
      onDelete={(item) => certificationService.remove(item.id)}
      deleteTitle="Delete Certification?"
    />
  );
};

export default CertificationList;
