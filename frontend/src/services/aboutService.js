import API_ENDPOINTS from "../constants/api";
import { createSingletonService, uploadFile } from "./createCrudService";

const base = createSingletonService(API_ENDPOINTS.PUBLIC.ABOUT, API_ENDPOINTS.ADMIN.ABOUT);

const aboutService = {
  ...base,
  uploadProfileImage: (id, file, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    return uploadFile(
      `${API_ENDPOINTS.ADMIN.ABOUT}/${id}/profile-image`,
      formData,
      onProgress
    );
  },
  uploadCoverImage: (id, file, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    return uploadFile(
      `${API_ENDPOINTS.ADMIN.ABOUT}/${id}/cover-image`,
      formData,
      onProgress
    );
  },
};

export default aboutService;
