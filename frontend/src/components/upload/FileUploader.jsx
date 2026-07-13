import { useRef, useState } from "react";
import { FiFile, FiTrash2, FiDownload } from "react-icons/fi";
import clsx from "clsx";
import Button from "../ui/Button";
import { buildMediaUrl, formatFileSize } from "../../utils/apiHelpers";

const FileUploader = ({
  fileName,
  fileUrl,
  fileSize,
  onUpload,
  onRemove,
  accept = "application/pdf",
  label = "Upload PDF",
  disabled = false,
}) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !onUpload) return;

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

  const downloadUrl = fileUrl ? buildMediaUrl(fileUrl) : null;

  return (
    <div className="space-y-3">
      {fileName ? (
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-950/40">
            <FiFile className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{fileName}</p>
            {fileSize && (
              <p className="text-xs text-slate-500 dark:text-slate-400">{formatFileSize(fileSize)}</p>
            )}
          </div>
          <div className="flex gap-2">
            {downloadUrl && (
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer" download>
                <Button type="button" variant="outline" size="sm">
                  <FiDownload className="h-4 w-4" />
                </Button>
              </a>
            )}
            {!disabled && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => inputRef.current?.click()}
                  loading={uploading}
                >
                  Replace
                </Button>
                <Button type="button" variant="danger" size="sm" onClick={onRemove} disabled={uploading}>
                  <FiTrash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
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
            </>
          ) : (
            <>
              <FiFile className="h-8 w-8 text-slate-400" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</span>
              <span className="text-xs text-slate-400">PDF up to 10MB</span>
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

export default FileUploader;
