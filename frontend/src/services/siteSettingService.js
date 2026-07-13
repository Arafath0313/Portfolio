import API_ENDPOINTS from "../constants/api";
import { createSingletonService, uploadFile } from "./createCrudService";

const base = createSingletonService(
  API_ENDPOINTS.PUBLIC.SITE_SETTINGS,
  API_ENDPOINTS.ADMIN.SITE_SETTINGS
);

const siteSettingService = {
  ...base,
  uploadLogo: (file, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    return uploadFile(`${API_ENDPOINTS.ADMIN.SITE_SETTINGS}/logo`, formData, onProgress);
  },
  uploadFavicon: (file, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    return uploadFile(`${API_ENDPOINTS.ADMIN.SITE_SETTINGS}/favicon`, formData, onProgress);
  },
};

export default siteSettingService;
