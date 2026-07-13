import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import clsx from "clsx";

/**
 * Pagination – page controls for data tables and lists.
 * @param {number} currentPage – current 1-based page number
 * @param {number} totalPages – total page count
 * @param {number} totalItems – total number of items
 * @param {number} pageSize – items per page
 * @param {Function} onPageChange – callback(pageNumber)
 */
const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Build page number array (show at most 5 pages around current)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      {/* Item count */}
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Showing <span className="font-medium text-slate-900 dark:text-white">{startItem}</span>{" "}
        to <span className="font-medium text-slate-900 dark:text-white">{endItem}</span>{" "}
        of <span className="font-medium text-slate-900 dark:text-white">{totalItems}</span>{" "}
        entries
      </p>

      {/* Page controls */}
      <nav className="flex items-center gap-1" aria-label="Pagination">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={clsx(
            "rounded-xl p-2 text-sm text-slate-500 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-slate-400 dark:hover:bg-slate-700",
            currentPage === 1 && "cursor-not-allowed opacity-50"
          )}
          aria-label="Previous page"
        >
          <FiChevronLeft className="h-4 w-4" />
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={clsx(
              "min-w-[2rem] rounded-xl px-2 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
              page === currentPage
                ? "bg-teal-600 text-white"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
            )}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={clsx(
            "rounded-xl p-2 text-sm text-slate-500 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-slate-400 dark:hover:bg-slate-700",
            currentPage === totalPages && "cursor-not-allowed opacity-50"
          )}
          aria-label="Next page"
        >
          <FiChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
