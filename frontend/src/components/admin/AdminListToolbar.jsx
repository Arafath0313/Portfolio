import SearchBar from "../common/SearchBar";
import FilterBar from "../common/FilterBar";
import Select from "../form/Select";

const AdminListToolbar = ({
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters,
  filterValues,
  onFilterChange,
  pageSize,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 25, 50],
}) => (
  <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
    <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
      <SearchBar
        value={search}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        className="sm:max-w-xs"
      />
      {filters && (
        <FilterBar filters={filters} values={filterValues} onChange={onFilterChange} />
      )}
    </div>
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">Rows:</span>
      <Select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="w-20"
        aria-label="Page size"
      >
        {pageSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </Select>
    </div>
  </div>
);

export default AdminListToolbar;
