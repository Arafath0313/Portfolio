import environment from "../config/environment";

export const extractData = (response) => response.data?.data ?? null;

export const extractMessage = (response) => response.data?.message ?? "";

export const getApiError = (error) => {
  if (!error.response) {
    return {
      status: 0,
      message: "Network error. Please check your connection and try again.",
      errors: [],
    };
  }

  const { status, data } = error.response;

  return {
    status,
    message:
      data?.message ||
      (status === 401
        ? "Your session has expired. Please log in again."
        : status === 403
          ? "You do not have permission to perform this action."
          : status === 404
            ? "The requested resource was not found."
            : status === 409
              ? "This resource already exists or conflicts with existing data."
              : status === 422
                ? "The request could not be processed."
                : status >= 500
                  ? "An unexpected server error occurred. Please try again later."
                  : "Something went wrong. Please try again."),
    errors: Array.isArray(data?.errors) ? data.errors : [],
  };
};

export const mapBackendErrorsToFields = (errors = []) => {
  const fieldErrors = {};

  errors.forEach((err) => {
    const match = err.match(/^(\w+):?\s*(.*)$/i);
    if (match) {
      const field = match[1].charAt(0).toLowerCase() + match[1].slice(1);
      fieldErrors[field] = match[2] || err;
    }
  });

  return fieldErrors;
};

export const buildMediaUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const base = environment.API.HOST.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
};

export const slugify = (text) =>
  String(text ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const formatDate = (dateStr) => {
  if (!dateStr) return "-";

  try {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return String(dateStr);
  }
};

export const formatDateTime = (dateStr) => {
  if (!dateStr) return "-";

  try {
    return new Date(dateStr).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(dateStr);
  }
};

export const formatFileSize = (bytes) => {
  if (bytes === null || bytes === undefined || Number.isNaN(Number(bytes))) return "-";

  const size = Number(bytes);

  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};
