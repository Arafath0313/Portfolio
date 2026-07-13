import axiosClient from "./axiosClient";
import { extractData } from "../utils/apiHelpers";

export const createPublicListCrudService = (publicPath, adminPath) => ({
  getAll: () => axiosClient.get(publicPath).then(extractData),
  getPublicById: (id) => axiosClient.get(`${publicPath}/${id}`).then(extractData),
  getById: (id) => axiosClient.get(`${adminPath}/${id}`).then(extractData),
  create: (data) => axiosClient.post(adminPath, data).then(extractData),
  update: (id, data) => axiosClient.put(`${adminPath}/${id}`, data).then(extractData),
  remove: (id) => axiosClient.delete(`${adminPath}/${id}`).then(extractData),
});

export const createAdminListCrudService = (adminPath) => ({
  getAll: () => axiosClient.get(adminPath).then(extractData),
  getById: (id) => axiosClient.get(`${adminPath}/${id}`).then(extractData),
  create: (data) => axiosClient.post(adminPath, data).then(extractData),
  update: (id, data) => axiosClient.put(`${adminPath}/${id}`, data).then(extractData),
  remove: (id) => axiosClient.delete(`${adminPath}/${id}`).then(extractData),
});

export const createSingletonService = (publicPath, adminPath) => ({
  get: () => axiosClient.get(publicPath).then(extractData),
  getById: (id) => axiosClient.get(`${adminPath}/${id}`).then(extractData),
  create: (data) => axiosClient.post(adminPath, data).then(extractData),
  update: (id, data) => axiosClient.put(`${adminPath}/${id}`, data).then(extractData),
  remove: (id) => axiosClient.delete(`${adminPath}/${id}`).then(extractData),
});

export const uploadFile = (url, formData, onProgress) =>
  axiosClient
    .post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: onProgress
        ? (event) => {
            const percent = event.total
              ? Math.round((event.loaded * 100) / event.total)
              : 0;
            onProgress(percent);
          }
        : undefined,
    })
    .then(extractData);
