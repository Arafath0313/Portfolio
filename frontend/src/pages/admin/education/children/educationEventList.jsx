import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminCrudList from "../../../../components/admin/AdminCrudList";
import ActionButtons from "../../../../components/admin/ActionButtons";
import StatusChip from "../../../../components/ui/StatusChip";
import educationEventService from "../../../../services/educationEventService";
import educationService from "../../../../services/educationService";


const EducationEventList = () => {
  const { id: educationId } = useParams();
  const [education, setEducation] = useState(null);

  useEffect(() => {
    educationService.getById(educationId).then(setEducation).catch(console.error);
  }, [educationId]);

  const fetchFn = useCallback(() => educationEventService.getAll({ educationId }), [educationId]);

  const columns = [
    { key: "title", header: "Title" },
    { key: "eventDate", header: "Date" },
    { key: "eventType", header: "Type" },
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
          editTo={`/admin/education/${educationId}/events/${row.id}/edit`}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return (
    <AdminCrudList
      title="Manage Events"
      description={`Events for ${education?.universityName || 'Education'}`}
      backTo={`/admin/education/${educationId}`}
      createTo={`/admin/education/${educationId}/events/create`}
      fetchFn={fetchFn}
      searchFields={["title", "eventType"]}
      columns={columns}
      defaultSortKey="displayOrder"
      onDelete={(item) => educationEventService.remove(item.id)}
      deleteTitle="Delete Event?"
    />
  );
};

export default EducationEventList;