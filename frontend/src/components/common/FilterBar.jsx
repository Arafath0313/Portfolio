import clsx from "clsx";
import Select from "../form/Select";

const FilterBar = ({ filters = [], values = {}, onChange, className }) => {
  if (!filters.length) return null;

  return (
    <div className={clsx("flex flex-wrap gap-3", className)}>
      {filters.map((filter) => (
        <div key={filter.key} className="min-w-[140px]">
          <Select
            value={values[filter.key] ?? "ALL"}
            onChange={(e) => onChange({ ...values, [filter.key]: e.target.value })}
            aria-label={filter.label}
          >
            <option value="ALL">All {filter.label}</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
