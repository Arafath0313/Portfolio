import Badge from "./Badge";

const STATUS_MAP = {
  NEW: { label: "New", variant: "primary" },
  READ: { label: "Read", variant: "default" },
  REPLIED: { label: "Replied", variant: "success" },
  PLANNING: { label: "Planning", variant: "warning" },
  IN_PROGRESS: { label: "In Progress", variant: "primary" },
  COMPLETED: { label: "Completed", variant: "success" },
  ON_HOLD: { label: "On Hold", variant: "default" },
  active: { label: "Active", variant: "success" },
  inactive: { label: "Inactive", variant: "default" },
};

const StatusChip = ({ status, active }) => {
  if (active !== undefined) {
    const config = active ? STATUS_MAP.active : STATUS_MAP.inactive;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  }

  const config = STATUS_MAP[status] || { label: status, variant: "default" };
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export default StatusChip;
