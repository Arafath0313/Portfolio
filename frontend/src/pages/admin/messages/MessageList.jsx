import { useCallback } from "react";
import AdminCrudList from "../../../components/admin/AdminCrudList";
import ActionButtons from "../../../components/admin/ActionButtons";
import Badge from "../../../components/ui/Badge";
import contactMessageService from "../../../services/contactMessageService";
import { formatDateTime } from "../../../utils/apiHelpers";
import { CONTACT_STATUSES, getEnumLabel } from "../../../constants/enums";

const MessageList = () => {
  const fetchFn = useCallback(() => contactMessageService.getAll(), []);

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "subject", header: "Subject" },
    {
      key: "status",
      header: "Status",
      render: (val) => {
        const variant = val === "NEW" ? "primary" : val === "REPLIED" ? "success" : "default";
        return <Badge variant={variant}>{getEnumLabel(CONTACT_STATUSES, val)}</Badge>;
      },
    },
    { key: "receivedAt", header: "Received", render: (val) => formatDateTime(val) },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (_, row, onDelete) => (
        <ActionButtons
          viewTo={`/admin/messages/${row.id}`}
          editTo={null}
          onDelete={onDelete}
          showEdit={false}
        />
      ),
    },
  ];

  return (
    <AdminCrudList
      title="Contact Messages"
      description="View and manage contact form submissions."
      showCreate={false}
      fetchFn={fetchFn}
      searchFields={["name", "email", "subject", "message"]}
      columns={columns}
      defaultSortKey="receivedAt"
      filters={[
        { key: "status", label: "Status", options: CONTACT_STATUSES },
        {
          key: "replied",
          label: "Replied",
          options: [
            { value: "true", label: "Replied" },
            { value: "false", label: "Not Replied" },
          ],
        },
      ]}
      onDelete={(item) => contactMessageService.remove(item.id)}
      deleteTitle="Delete Message?"
    />
  );
};

export default MessageList;
