import { useCallback } from "react";
import AdminCrudList from "../../../components/admin/AdminCrudList";
import ActionButtons from "../../../components/admin/ActionButtons";
import StatusChip from "../../../components/ui/StatusChip";
import Badge from "../../../components/ui/Badge";
import adminService from "../../../services/adminService";
import { formatDateTime } from "../../../utils/apiHelpers";

const AdminList = () => {
  const fetchFn = useCallback(() => adminService.getAll(), []);

  const columns = [
    { key: "username", header: "Username" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", render: (val) => <Badge variant="purple">{val}</Badge> },
    { key: "enabled", header: "Status", render: (val) => <StatusChip active={val} /> },
    { key: "lastLogin", header: "Last Login", render: (val) => formatDateTime(val) },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (_, row, onDelete) => (
        <ActionButtons viewTo={`/admin/admins/${row.id}`} editTo={`/admin/admins/${row.id}/edit`} onDelete={onDelete} />
      ),
    },
  ];

  return (
    <AdminCrudList
      title="Admin Management"
      description="Manage administrator accounts and access."
      createTo="/admin/admins/create"
      fetchFn={fetchFn}
      searchFields={["username", "email"]}
      columns={columns}
      filters={[
        {
          key: "enabled",
          label: "Status",
          options: [
            { value: "true", label: "Enabled" },
            { value: "false", label: "Disabled" },
          ],
        },
      ]}
      onDelete={(item) => adminService.remove(item.id)}
      deleteTitle="Delete Admin?"
    />
  );
};

export default AdminList;
