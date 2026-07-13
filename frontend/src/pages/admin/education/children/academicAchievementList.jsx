import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminCrudList from "../../../../components/admin/AdminCrudList";
import ActionButtons from "../../../../components/admin/ActionButtons";
import StatusChip from "../../../../components/ui/StatusChip";
import academicAchievementService from "../../../../services/academicAchievementService";
import educationService from "../../../../services/educationService";

const AcademicAchievementList = () => {
  const { id: educationId } = useParams();
  const [education, setEducation] = useState(null);

  useEffect(() => {
    educationService.getById(educationId).then(setEducation).catch(console.error);
  }, [educationId]);

  const fetchFn = useCallback(() => academicAchievementService.getAll({ educationId }), [educationId]);

  const columns = [
    { key: "title", header: "Title" },
    { key: "issuer", header: "Issuer" },
    { key: "issueDate", header: "Issue Date" },
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
          editTo={`/admin/education/${educationId}/achievements/${row.id}/edit`}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return (
    <AdminCrudList
      title="Manage Achievements"
      description={`Achievements for ${education?.universityName || 'Education'}`}
      backTo={`/admin/education/${educationId}`}
      createTo={`/admin/education/${educationId}/achievements/create`}
      fetchFn={fetchFn}
      searchFields={["title", "issuer"]}
      columns={columns}
      defaultSortKey="displayOrder"
      onDelete={(item) => academicAchievementService.remove(item.id)}
      deleteTitle="Delete Achievement?"
    />
  );
};

export default AcademicAchievementList;