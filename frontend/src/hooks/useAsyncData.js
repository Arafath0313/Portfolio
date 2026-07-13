import { useCallback, useEffect, useState } from "react";

const useAsyncData = (
  loadFn,
  deps = [],
  { initialData = null, immediate = true } = {}
) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await loadFn();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadFn]);

  useEffect(() => {
    if (!immediate) return undefined;

    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await loadFn();
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [immediate, loadFn, ...deps]);

  return { data, setData, loading, error, refresh };
};

export default useAsyncData;
