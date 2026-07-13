import ConfirmDialog from "../common/ConfirmDialog";
import ErrorState from "../common/ErrorState";
import DataTable from "../data/DataTable";
import Pagination from "../navigation/Pagination";
import AdminPageHeader from "./AdminPageHeader";
import AdminListToolbar from "./AdminListToolbar";
import useCrudList from "../../hooks/useCrudList";
import useConfirmation from "../../hooks/useConfirmation";
import { getApiError } from "../../utils/apiHelpers";
import { notifyError, notifySuccess } from "../../utils/toast";

const AdminCrudList = ({
  title,
  description,
  createTo,
  createLabel = "Create New",
  fetchFn,
  searchFields = [],
  columns,
  filters,
  defaultSortKey = "id",
  onDelete,
  deleteTitle = "Delete item?",
  deleteMessage = "This action cannot be undone.",
  emptyTitle = "No records found",
  emptyDescription = "Get started by creating a new record.",
  showCreate = true,
  backTo,
}) => {
  const confirmation = useConfirmation();

  const list = useCrudList({
    fetchFn,
    searchFields,
    defaultSortKey,
    filters: filters ? Object.fromEntries(filters.map((f) => [f.key, "ALL"])) : {},
  });

  const handleDelete = async (item) => {
    const confirmed = await confirmation.confirm({ title: deleteTitle, message: deleteMessage });
    if (!confirmed) return;

    confirmation.setLoading(true);
    try {
      await onDelete(item);
      notifySuccess("Deleted successfully.");
      list.refresh();
    } catch (err) {
      notifyError(getApiError(err).message);
    } finally {
      confirmation.setLoading(false);
    }
  };

  const tableColumns = columns.map((col) =>
    col.key === "actions"
      ? { ...col, sortable: false, render: (_, row) => col.render(_, row, () => handleDelete(row)) }
      : col
  );

  if (list.error) {
    return (
      <div>
        <AdminPageHeader title={title} description={description} onRefresh={list.refresh} />
        <ErrorState
          title="Failed to load data"
          message={getApiError(list.error).message}
          onRetry={list.refresh}
        />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title={title}
        description={description}
        backTo={backTo}
        createTo={showCreate ? createTo : undefined}
        createLabel={createLabel}
        onRefresh={list.refresh}
        refreshing={list.loading}
      />

      <AdminListToolbar
        search={list.search}
        onSearchChange={list.setSearch}
        filters={filters}
        filterValues={list.filters}
        onFilterChange={list.setFilters}
        pageSize={list.pageSize}
        onPageSizeChange={list.setPageSize}
      />

      <DataTable
        columns={tableColumns}
        data={list.data}
        loading={list.loading}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
        sortKey={list.sortKey}
        sortDir={list.sortDir}
        onSort={list.handleSort}
      />

      {list.totalItems > 0 && (
        <div className="mt-4">
          <Pagination
            currentPage={list.page}
            totalPages={list.totalPages}
            totalItems={list.totalItems}
            pageSize={list.pageSize}
            onPageChange={list.setPage}
          />
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmation.isOpen}
        title={confirmation.title}
        message={confirmation.message}
        confirmLabel={confirmation.confirmLabel}
        loading={confirmation.loading}
        onConfirm={confirmation.handleConfirm}
        onCancel={confirmation.handleCancel}
      />
    </div>
  );
};

export default AdminCrudList;
