import API_ENDPOINTS from "../constants/api";
import { createAdminListCrudService } from "./createCrudService";

const academicOrganizationService = createAdminListCrudService(API_ENDPOINTS.ADMIN.EDUCATION_ORGANIZATIONS);

export default academicOrganizationService;
