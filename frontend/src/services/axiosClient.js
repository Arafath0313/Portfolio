import axios from "axios";
import axiosConfig from "../config/axiosConfig";
import authStorage from "../utils/authStorage";

const axiosClient = axios.create(axiosConfig);

/**
 * Request Interceptor
 * - Attach JWT Authorization Header
 * - Reserved for Request Logging
 * - Reserved for Custom Headers
 */
axiosClient.interceptors.request.use(
  (config) => {
    const token = authStorage.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * - Global Error Handling
 * - Detect Unauthorized (401)
 * - Prepare for Future Logout & Refresh Token Support
 */
axiosClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request. Authentication may have expired.");
      // Dispatch custom event to notify AuthContext
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    return Promise.reject(error);
  }
);

export default axiosClient;