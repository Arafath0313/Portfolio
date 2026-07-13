import { toast } from "react-toastify";

export const notifySuccess = (message) => {
  toast.success(message || "Operation completed successfully.");
};

export const notifyError = (message) => {
  toast.error(message || "Something went wrong. Please try again.");
};

export const notifyInfo = (message) => {
  toast.info(message);
};

export default { notifySuccess, notifyError, notifyInfo };
