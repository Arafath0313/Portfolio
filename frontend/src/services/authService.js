import axiosClient from "./axiosClient";
import API_ENDPOINTS from "../constants/api";

const authService = {
  /**
   * Authenticate admin user
   * @param {Object} credentials
   * @param {string} credentials.username
   * @param {string} credentials.password
   * @returns {Promise}
   */
  login(credentials) {
    return axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },
};

export default authService;