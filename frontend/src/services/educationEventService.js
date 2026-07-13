import API_ENDPOINTS from "../constants/api";
import { createAdminListCrudService } from "./createCrudService";

const educationEventService = createAdminListCrudService(API_ENDPOINTS.ADMIN.EDUCATION_EVENTS);

export default educationEventService;
