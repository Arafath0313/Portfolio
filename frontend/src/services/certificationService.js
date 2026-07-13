import API_ENDPOINTS from "../constants/api";
import { createPublicListCrudService, uploadFile } from "./createCrudService";

const base = createPublicListCrudService(
  API_ENDPOINTS.PUBLIC.CERTIFICATIONS,
  API_ENDPOINTS.ADMIN.CERTIFICATIONS
);

const certificationService = {
  ...base,
  uploadImage: (id, file, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    return uploadFile(
      `${API_ENDPOINTS.ADMIN.CERTIFICATIONS}/${id}/image`,
      formData,
      onProgress
    );
  },
};

export default certificationService;
