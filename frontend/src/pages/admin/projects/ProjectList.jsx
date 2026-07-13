import { useCallback } from "react";
import AdminCrudList from "../../../components/admin/AdminCrudList";
import ActionButtons from "../../../components/admin/ActionButtons";
import StatusChip from "../../../components/ui/StatusChip";
import Badge from "../../../components/ui/Badge";
import projectService from "../../../services/projectService";
import { PROJECT_STATUSES, getEnumLabel } from "../../../constants/enums";

const ProjectList = () => {
  const fetchFn = useCallback(() => projectService.getAll(), []);

  const columns = [
    { key: "title", header: "Title" },
    { key: "slug", header: "Slug" },
    {
      key: "status",
      header: "Status",
      render: (val) => getEnumLabel(PROJECT_STATUSES, val),
    },
    {
      key: "featured",
      header: "Featured",
      render: (val) => (val ? <Badge variant="primary">Yes</Badge> : <Badge>No</Badge>),
    },
    {
      key: "active",
      header: "Status",
      render: (val) => <StatusChip active={val} />,
    },
    { key: "displayOrder", header: "Order" },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (_, row, onDelete) => (
        <ActionButtons
          viewTo={`/admin/projects/${row.id}`}
          editTo={`/admin/projects/${row.id}/edit`}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return (
    <AdminCrudList
      title="Projects"
      description="Manage portfolio projects and their images."
      createTo="/admin/projects/create"
      fetchFn={fetchFn}
      searchFields={["title", "slug", "technologies", "status"]}
      columns={columns}
      filters={[
        { key: "status", label: "Status", options: PROJECT_STATUSES },
        {
          key: "featured",
          label: "Featured",
          options: [
            { value: "true", label: "Featured" },
            { value: "false", label: "Not Featured" },
          ],
        },
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
      onDelete={(item) => projectService.remove(item.id)}
      deleteTitle="Delete Project?"
    />
  );
};

export default ProjectList;
