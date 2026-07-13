import { useCallback, useEffect, useMemo, useState } from "react";
import useDebounce from "./useDebounce";

const useCrudList = ({
  fetchFn,
  searchFields = [],
  defaultSortKey = "id",
  defaultSortDir = "asc",
  defaultPageSize = 10,
  filters = {},
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearchState] = useState("");
  const [sortKey, setSortKey] = useState(defaultSortKey);
  const [sortDir, setSortDir] = useState(defaultSortDir);
  const [page, setPageState] = useState(1);
  const [pageSize, setPageSizeState] = useState(defaultPageSize);
  const [activeFilters, setActiveFiltersState] = useState(filters);

  const debouncedSearch = useDebounce(search);

  const setSearch = useCallback((value) => {
    setSearchState(value);
    setPageState(1);
  }, []);

  const setFilters = useCallback((value) => {
    setActiveFiltersState(value);
    setPageState(1);
  }, []);

  const setPageSize = useCallback((value) => {
    setPageSizeState(value);
    setPageState(1);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(Array.isArray(result) ? result : result ? [result] : []);
    } catch (err) {
      setError(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFn();
        if (!cancelled) {
          setData(Array.isArray(result) ? result : result ? [result] : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setData([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [fetchFn]);

  const processedData = useMemo(() => {
    let result = [...data];

    if (debouncedSearch && searchFields.length) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter((item) =>
        searchFields.some((field) =>
          String(item[field] ?? "")
            .toLowerCase()
            .includes(q)
        )
      );
    }

    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined || value === "ALL") return;
      result = result.filter((item) => String(item[key]) === String(value));
    });

    result.sort((a, b) => {
      const aVal = a[sortKey] ?? "";
      const bVal = b[sortKey] ?? "";
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [data, debouncedSearch, searchFields, activeFilters, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(processedData.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedData = processedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPageState(1);
  };

  return {
    data: paginatedData,
    allData: processedData,
    loading,
    error,
    search,
    setSearch,
    sortKey,
    sortDir,
    handleSort,
    page: currentPage,
    setPage: setPageState,
    pageSize,
    setPageSize,
    totalPages,
    totalItems: processedData.length,
    filters: activeFilters,
    setFilters,
    refresh: load,
  };
};

export default useCrudList;
