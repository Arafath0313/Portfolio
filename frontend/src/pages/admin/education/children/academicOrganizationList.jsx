import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminCrudList from "../../../../components/admin/AdminCrudList";
import ActionButtons from "../../../../components/admin/ActionButtons";
import StatusChip from "../../../../components/ui/StatusChip";
import academicOrganizationService from "../../../../services/academicOrganizationService";
import educationService from "../../../../services/educationService";

const AcademicOrganizationList = () => {
  const { id: educationId } = useParams();
  const [education, setEducation] = useState(null);

  useEffect(() => {
    educationService.getById(educationId).then(setEducation).catch(console.error);
  }, [educationId]);

  const fetchFn = useCallback(() => academicOrganizationService.getAll({ educationId }), [educationId]);

  const columns = [
    { key: "organizationName", header: "Organization" },
    { key: "role", header: "Role" },
    { 
      key: "duration", 
      header: "Duration",
      render: (_, row) => `${row.startDate} - ${row.endDate || "Present"}`
    },
    {
      key: "active",
      header: "Active",
      render: (val) => <StatusChip active={val} />,
    },
    { key: "displayOrder", header: "Order" },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (_, row, onDelete) => (
        <ActionButtons
          editTo={`/admin/education/${educationId}/organizations/${row.id}/edit`}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return (
    <AdminCrudList
      title="Manage Organizations"
      description={`Organizations for ${education?.universityName || 'Education'}`}
      backTo={`/admin/education/${educationId}`}
      createTo={`/admin/education/${educationId}/organizations/create`}
      fetchFn={fetchFn}
      searchFields={["organizationName", "role"]}
      columns={columns}
      defaultSortKey="displayOrder"
      onDelete={(item) => academicOrganizationService.remove(item.id)}
      deleteTitle="Delete Organization?"
    />
  );
};

export default AcademicOrganizationList;