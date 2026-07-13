import { useState, useCallback } from "react";


/**
 * useAxios
 * Generic hook for making imperative API calls with loading/error state management.
 * Intended as a lightweight utility for Phase 12 CRUD operations.
 *
 * @returns {{ execute, data, loading, error, reset }}
 *
 * @example
 * const { execute, data, loading, error } = useAxios();

 */
const useAxios = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  const execute = useCallback(async (requestFn) => {
    setLoading(true);
    setError(null);
    try {
      const response = await requestFn();
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, data, loading, error, reset };
};

export default useAxios;
