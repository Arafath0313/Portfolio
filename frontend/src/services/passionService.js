import API_ENDPOINTS from "../constants/api";
import { createPublicListCrudService, uploadFile } from "./createCrudService";
import api from "./axiosClient"; // For custom API calls if needed

const base = createPublicListCrudService(
  API_ENDPOINTS.PUBLIC.PASSIONS,
  API_ENDPOINTS.ADMIN.PASSIONS
);

const passionService = {
  ...base,
  uploadThumbnail: (id, file, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    return uploadFile(
      `${API_ENDPOINTS.ADMIN.PASSIONS}/${id}/thumbnail`,
      formData,
      onProgress
    );
  },
  
  // Custom fetch with more complex params
  getFilteredPage: async (params) => {
    const response = await api.get(`${API_ENDPOINTS.PUBLIC.PASSIONS}/page`, {
      params,
    });
    return response.data;
  },
};

export default passionService;
