import API_ENDPOINTS from "../constants/api";
import { createSingletonService, uploadFile } from "./createCrudService";

const base = createSingletonService(
  API_ENDPOINTS.PUBLIC.RESUME,
  API_ENDPOINTS.ADMIN.RESUME
);

const resumeService = {
  ...base,
  upload: (aboutId, file, version, onProgress) => {
    const formData = new FormData();
    formData.append("aboutId", String(aboutId));
    formData.append("file", file);
    if (version) formData.append("version", version);
    return uploadFile(`${API_ENDPOINTS.ADMIN.RESUME}/upload`, formData, onProgress);
  },
};

export default resumeService;
