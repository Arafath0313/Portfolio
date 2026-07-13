import { useCallback } from "react";
import AdminCrudList from "../../../components/admin/AdminCrudList";
import ActionButtons from "../../../components/admin/ActionButtons";
import StatusChip from "../../../components/ui/StatusChip";
import Badge from "../../../components/ui/Badge";
import youtubeService from "../../../services/youtubeService";
import { formatDate } from "../../../utils/apiHelpers";

const YouTubeList = () => {
  const fetchFn = useCallback(() => youtubeService.getAll(), []);

  const columns = [
    { key: "title", header: "Title" },
    { key: "videoId", header: "Video ID" },
    { key: "publishedAt", header: "Published", render: (val) => formatDate(val) },
    { key: "featured", header: "Featured", render: (val) => (val ? <Badge variant="primary">Yes</Badge> : <Badge>No</Badge>) },
    { key: "active", header: "Status", render: (val) => <StatusChip active={val} /> },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (_, row, onDelete) => (
        <ActionButtons viewTo={`/admin/youtube/${row.id}`} editTo={`/admin/youtube/${row.id}/edit`} onDelete={onDelete} />
      ),
    },
  ];

  return (
    <AdminCrudList
      title="YouTube Videos"
      description="Manage YouTube video embeds for your portfolio."
      createTo="/admin/youtube/create"
      fetchFn={fetchFn}
      searchFields={["title", "videoId", "description"]}
      columns={columns}
      onDelete={(item) => youtubeService.remove(item.id)}
      deleteTitle="Delete Video?"
    />
  );
};

export default YouTubeList;
