import { useEffect, useRef } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import Button from "../ui/Button";

/**
 * ConfirmDialog – modal dialog for confirming destructive actions.
 * Traps focus within the dialog while open.
 *
 * @param {boolean} isOpen – controls visibility
 * @param {string} title – dialog heading
 * @param {string} message – confirmation question
 * @param {string} confirmLabel – confirm button label (default: "Delete")
 * @param {string} confirmVariant – Button variant for confirm (default: "danger")
 * @param {boolean} loading – shows loading state on confirm button
 * @param {Function} onConfirm – confirmed action callback
 * @param {Function} onCancel – cancel/close callback
 */
const ConfirmDialog = ({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Delete",
  confirmVariant = "danger",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  const cancelRef = useRef(null);

  // Auto-focus cancel button when dialog opens
  useEffect(() => {
    if (isOpen) {
      cancelRef.current?.focus();
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onCancel?.();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-800">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
          <FiAlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>

        {/* Content */}
        <h2
          id="confirm-dialog-title"
          className="mb-2 text-center text-lg font-semibold text-slate-900 dark:text-white"
        >
          {title}
        </h2>
        <p className="mb-6 text-center text-sm text-slate-500 dark:text-slate-400">
          {message}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row-reverse">
          <Button
            variant={confirmVariant}
            fullWidth
            loading={loading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
          <Button
            ref={cancelRef}
            variant="outline"
            fullWidth
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
