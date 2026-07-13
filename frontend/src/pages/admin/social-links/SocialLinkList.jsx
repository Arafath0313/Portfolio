import { useCallback } from "react";
import AdminCrudList from "../../../components/admin/AdminCrudList";
import ActionButtons from "../../../components/admin/ActionButtons";
import StatusChip from "../../../components/ui/StatusChip";
import socialLinkService from "../../../services/socialLinkService";
import { SOCIAL_PLATFORMS, getEnumLabel } from "../../../constants/enums";

const SocialLinkList = () => {
  const fetchFn = useCallback(() => socialLinkService.getAll(), []);

  const columns = [
    { key: "platform", header: "Platform", render: (val) => getEnumLabel(SOCIAL_PLATFORMS, val) },
    { key: "url", header: "URL" },
    { key: "displayOrder", header: "Order" },
    { key: "active", header: "Status", render: (val) => <StatusChip active={val} /> },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (_, row, onDelete) => (
        <ActionButtons viewTo={`/admin/social-links/${row.id}`} editTo={`/admin/social-links/${row.id}/edit`} onDelete={onDelete} />
      ),
    },
  ];

  return (
    <AdminCrudList
      title="Social Links"
      description="Manage social media and contact links."
      createTo="/admin/social-links/create"
      fetchFn={fetchFn}
      searchFields={["platform", "url"]}
      columns={columns}
      onDelete={(item) => socialLinkService.remove(item.id)}
      deleteTitle="Delete Social Link?"
    />
  );
};

export default SocialLinkList;
