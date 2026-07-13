import clsx from "clsx";
import SectionTitle from "../ui/SectionTitle";

const SectionHeader = ({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className = "",
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center",
        className
      )}
    >
      <SectionTitle
        eyebrow={eyebrow}
        title={title}
        description={description}
        align={align}
      />
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
};

export default SectionHeader;
