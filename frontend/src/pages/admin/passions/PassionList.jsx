import { useCallback } from "react";
import AdminCrudList from "../../../components/admin/AdminCrudList";
import ActionButtons from "../../../components/admin/ActionButtons";
import StatusChip from "../../../components/ui/StatusChip";
import Badge from "../../../components/ui/Badge";
import passionService from "../../../services/passionService";
import { PASSION_CATEGORIES, CONTENT_PLATFORMS, getEnumLabel } from "../../../constants/enums";

const PassionList = () => {
  const fetchFn = useCallback(() => passionService.getAll(), []);

  const columns = [
    { key: "title", header: "Title" },
    {
      key: "category",
      header: "Category",
      render: (val) => getEnumLabel(PASSION_CATEGORIES, val),
    },
    {
      key: "contentPlatform",
      header: "Platform",
      render: (val) => getEnumLabel(CONTENT_PLATFORMS, val),
    },
    {
      key: "featuredHome",
      header: "On Home",
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
          viewTo={`/admin/passions/${row.id}`}
          editTo={`/admin/passions/${row.id}/edit`}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return (
    <AdminCrudList
      title="Passions"
      description="Manage your Beyond Coding portfolio content."
      createTo="/admin/passions/create"
      fetchFn={fetchFn}
      searchFields={["title", "category", "contentPlatform"]}
      columns={columns}
      filters={[
        { key: "category", label: "Category", options: PASSION_CATEGORIES },
        { key: "contentPlatform", label: "Platform", options: CONTENT_PLATFORMS },
        {
          key: "featuredHome",
          label: "Home Featured",
          options: [
            { value: "true", label: "Yes" },
            { value: "false", label: "No" },
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
      onDelete={(item) => passionService.remove(item.id)}
      deleteTitle="Delete Passion?"
    />
  );
};

export default PassionList;
