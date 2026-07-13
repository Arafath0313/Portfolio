import { useCallback } from "react";
import AdminCrudList from "../../../components/admin/AdminCrudList";
import ActionButtons from "../../../components/admin/ActionButtons";
import StatusChip from "../../../components/ui/StatusChip";
import educationService from "../../../services/educationService";
import { EDUCATION_STATUSES, getEnumLabel } from "../../../constants/enums";

const EducationList = () => {
  const fetchFn = useCallback(() => educationService.getAll(), []);

  const columns = [
    { key: "universityName", header: "University" },
    { key: "degree", header: "Degree" },
    {
      key: "timeline",
      header: "Timeline",
      render: (_, row) => `${row.enrollmentYear} - ${row.expectedGraduationYear || "Present"}`,
    },
    {
      key: "status",
      header: "Status",
      render: (val) => getEnumLabel(EDUCATION_STATUSES, val),
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
          viewTo={`/admin/education/${row.id}`}
          editTo={`/admin/education/${row.id}/edit`}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return (
    <AdminCrudList
      title="Education"
      description="Manage your academic background."
      createTo="/admin/education/create"
      fetchFn={fetchFn}
      searchFields={["universityName", "degree", "faculty", "department"]}
      columns={columns}
      filters={[
        { key: "status", label: "Status", options: EDUCATION_STATUSES },
        {
          key: "active",
          label: "Active",
          options: [
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
          ],
        },
      ]}
      defaultSortKey="displayOrder"
      onDelete={(item) => educationService.remove(item.id)}
      deleteTitle="Delete Education?"
    />
  );
};

export default EducationList;