import axiosClient from "./axiosClient";
import projectService from "./projectService";
import passionService from "./passionService";
import contactMessageService from "./contactMessageService";

const dashboardService = {
  /**
   * Fetch aggregate statistics from the dedicated backend endpoint.
   * Maps the backend field names to the keys expected by DASHBOARD_CARDS.
   */
  getStats: async () => {
    const response = await axiosClient.get("/admin/dashboard/stats");
    const data = response.data?.data ?? response.data;
    return {
      projects: data.totalProjects ?? 0,
      passions: data.totalPassions ?? 0,
      messages: data.totalMessages ?? 0,
      youtube: data.totalVideos ?? 0,
      skills: data.totalSkills ?? 0,
      certifications: data.totalCertificates ?? 0,
    };
  },

  getRecentMessages: async (limit = 5) => {
    const messages = await contactMessageService.getAll().catch(() => []);
    return (messages || []).slice(0, limit);
  },

  getRecentProjects: async (limit = 5) => {
    const projects = await projectService.getAll().catch(() => []);
    return (projects || []).slice(0, limit);
  },

  getRecentPassions: async (limit = 5) => {
    const passions = await passionService.getAll().catch(() => []);
    return (passions || []).slice(0, limit);
  },
};

export default dashboardService;
