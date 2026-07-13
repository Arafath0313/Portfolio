import API_ENDPOINTS from "../constants/api";
import { createPublicListCrudService, uploadFile } from "./createCrudService";
import axiosClient from "./axiosClient";
import { extractData } from "../utils/apiHelpers";

const base = createPublicListCrudService(
  API_ENDPOINTS.PUBLIC.PROJECTS,
  API_ENDPOINTS.ADMIN.PROJECTS
);

const projectService = {
  ...base,
  uploadThumbnail: (id, file, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    return uploadFile(
      `${API_ENDPOINTS.ADMIN.PROJECTS}/${id}/thumbnail`,
      formData,
      onProgress
    );
  },
  uploadImage: (projectId, file, caption, displayOrder, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    if (caption) formData.append("caption", caption);
    if (displayOrder !== undefined && displayOrder !== null) {
      formData.append("displayOrder", String(displayOrder));
    }
    return uploadFile(
      `${API_ENDPOINTS.ADMIN.PROJECTS}/${projectId}/images`,
      formData,
      onProgress
    );
  },
  deleteImage: (imageId) =>
    axiosClient
      .delete(`${API_ENDPOINTS.ADMIN.PROJECTS}/images/${imageId}`)
      .then(extractData),
};

export default projectService;
