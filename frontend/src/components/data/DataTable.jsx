import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";

const DataTable = ({
  columns = [],
  data = [],
  rowKey = "id",
  loading = false,
  emptyTitle = "No records found",
  emptyDescription = "There are no records to display.",
  sortKey: externalSortKey,
  sortDir: externalSortDir,
  onSort,
}) => {
  const sortKey = externalSortKey;
  const sortDir = externalSortDir;

  const handleSort = (key) => {
    if (onSort) {
      onSort(key);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <Loader size="lg" />
      </div>
    );
  }

  if (!data.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-700/50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 select-none"
                  style={{ cursor: col.sortable !== false ? "pointer" : "default" }}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable !== false && sortKey && (
                      <span className="text-slate-400">
                        {sortKey === col.key ? (
                          sortDir === "asc" ? (
                            <FiChevronUp className="h-3.5 w-3.5" />
                          ) : (
                            <FiChevronDown className="h-3.5 w-3.5" />
                          )
                        ) : (
                          <FiChevronUp className="h-3.5 w-3.5 opacity-30" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {data.map((row) => (
              <tr
                key={row[rowKey]}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-4 py-3 text-slate-700 dark:text-slate-300"
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
