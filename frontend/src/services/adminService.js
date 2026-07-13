import API_ENDPOINTS from "../constants/api";
import { createAdminListCrudService } from "./createCrudService";

const adminService = createAdminListCrudService(API_ENDPOINTS.ADMIN.ADMINS);

export default adminService;
