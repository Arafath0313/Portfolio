import { useCallback, useState } from "react";

const useConfirmation = () => {
  const [state, setState] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmLabel: "Delete",
    loading: false,
    onConfirm: null,
  });

  const confirm = useCallback(
    ({ title, message, confirmLabel = "Delete" } = {}) =>
      new Promise((resolve) => {
        setState({
          isOpen: true,
          title: title || "Are you sure?",
          message: message || "This action cannot be undone.",
          confirmLabel,
          loading: false,
          onConfirm: resolve,
        });
      }),
    []
  );

  const handleConfirm = useCallback(() => {
    state.onConfirm?.(true);
    setState((prev) => ({ ...prev, isOpen: false, onConfirm: null }));
  }, [state]);

  const handleCancel = useCallback(() => {
    state.onConfirm?.(false);
    setState((prev) => ({ ...prev, isOpen: false, onConfirm: null, loading: false }));
  }, [state]);

  const setLoading = useCallback((loading) => {
    setState((prev) => ({ ...prev, loading }));
  }, []);

  return {
    ...state,
    confirm,
    handleConfirm,
    handleCancel,
    setLoading,
  };
};

export default useConfirmation;
