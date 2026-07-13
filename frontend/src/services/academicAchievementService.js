import API_ENDPOINTS from "../constants/api";
import { createAdminListCrudService } from "./createCrudService";

const academicAchievementService = createAdminListCrudService(API_ENDPOINTS.ADMIN.EDUCATION_ACHIEVEMENTS);

export default academicAchievementService;
