import { useEffect, useState } from "react";
import clsx from "clsx";
import { FiImage } from "react-icons/fi";
import { buildMediaUrl } from "../../utils/apiHelpers";

const LazyImage = ({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  fallbackLabel,
  loading = "lazy",
  priority = false,
  ...props
}) => {
  const [failed, setFailed] = useState(false);
  const resolvedSrc = src ? buildMediaUrl(src) : "";

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setFailed(false);
  }, [resolvedSrc]);

  if (!resolvedSrc || failed) {
    return (
      <div
        className={clsx(
          "flex h-full min-h-[12rem] w-full items-center justify-center bg-gradient-to-br from-slate-100 via-white to-teal-50 text-slate-400 dark:from-slate-900 dark:via-slate-950 dark:to-teal-950/50 dark:text-slate-500",
          wrapperClassName
        )}
        aria-label={alt}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/5">
            <FiImage className="h-6 w-6" />
          </span>
          {fallbackLabel ? <span className="px-4 text-sm font-medium">{fallbackLabel}</span> : null}
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("overflow-hidden", wrapperClassName)}>
      <img
        src={resolvedSrc}
        alt={alt}
        loading={priority ? "eager" : loading}
        decoding="async"
        onError={() => setFailed(true)}
        className={clsx("h-full w-full object-cover", className)}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
