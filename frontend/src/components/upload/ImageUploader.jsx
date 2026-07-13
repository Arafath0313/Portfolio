import { useRef, useState } from "react";
import { FiImage, FiTrash2 } from "react-icons/fi";
import clsx from "clsx";
import Button from "../ui/Button";
import { buildMediaUrl } from "../../utils/apiHelpers";

const ImageUploader = ({
  value,
  onUpload,
  onRemove,
  label = "Upload Image",
  accept = "image/jpeg,image/png,image/webp",
  disabled = false,
  previewClassName = "h-32 w-32",
}) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);

  const displayUrl = preview || (value ? buildMediaUrl(value) : null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !onUpload) return;

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setUploading(true);
    setProgress(0);

    try {
      await onUpload(file, setProgress);
    } finally {
      setUploading(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onRemove?.();
  };

  return (
    <div className="space-y-3">
      {displayUrl ? (
        <div className="relative inline-block">
          <img
            src={displayUrl}
            alt="Preview"
            className={clsx("rounded-xl border border-slate-200 object-cover dark:border-slate-700", previewClassName)}
          />
          {!disabled && (
            <div className="mt-2 flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => inputRef.current?.click()}
                loading={uploading}
              >
                Replace
              </Button>
              <Button type="button" variant="danger" size="sm" onClick={handleRemove} disabled={uploading}>
                <FiTrash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          disabled={disabled || uploading}
          onClick={() => inputRef.current?.click()}
          className={clsx(
            "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 p-8 transition-colors",
            "hover:border-blue-400 hover:bg-blue-50/50 dark:border-slate-600 dark:hover:border-blue-500 dark:hover:bg-blue-950/20",
            (disabled || uploading) && "cursor-not-allowed opacity-60"
          )}
        >
          {uploading ? (
            <>
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
              <span className="text-sm text-slate-500">Uploading... {progress}%</span>
              <div className="h-1.5 w-48 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </>
          ) : (
            <>
              <FiImage className="h-8 w-8 text-slate-400" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</span>
              <span className="text-xs text-slate-400">JPEG, PNG, WebP up to 5MB</span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || uploading}
      />
    </div>
  );
};

export default ImageUploader;
