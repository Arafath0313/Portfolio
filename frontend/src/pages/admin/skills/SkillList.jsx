import { useCallback } from "react";
import AdminCrudList from "../../../components/admin/AdminCrudList";
import ActionButtons from "../../../components/admin/ActionButtons";
import StatusChip from "../../../components/ui/StatusChip";
import skillService from "../../../services/skillService";
import { SKILL_CATEGORIES, SKILL_LEVELS, getEnumLabel } from "../../../constants/enums";

const SkillList = () => {
  const fetchFn = useCallback(() => skillService.getAll(), []);

  const columns = [
    { key: "name", header: "Name" },
    {
      key: "category",
      header: "Category",
      render: (val) => getEnumLabel(SKILL_CATEGORIES, val),
    },
    {
      key: "level",
      header: "Level",
      render: (val) => getEnumLabel(SKILL_LEVELS, val),
    },
    { key: "displayOrder", header: "Order" },
    {
      key: "active",
      header: "Status",
      render: (val) => <StatusChip active={val} />,
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (_, row, onDelete) => (
        <ActionButtons
          viewTo={`/admin/skills/${row.id}`}
          editTo={`/admin/skills/${row.id}/edit`}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return (
    <AdminCrudList
      title="Skills"
      description="Manage your technical skills and proficiency levels."
      createTo="/admin/skills/create"
      fetchFn={fetchFn}
      searchFields={["name", "category", "level"]}
      columns={columns}
      filters={[
        { key: "category", label: "Categories", options: SKILL_CATEGORIES },
        { key: "level", label: "Levels", options: SKILL_LEVELS },
        {
          key: "active",
          label: "Status",
          options: [
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
          ],
        },
      ]}
      onDelete={(item) => skillService.remove(item.id)}
      deleteTitle="Delete Skill?"
    />
  );
};

export default SkillList;
