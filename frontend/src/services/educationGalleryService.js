import API_ENDPOINTS from "../constants/api";
import { createAdminListCrudService } from "./createCrudService";

const educationGalleryService = createAdminListCrudService(API_ENDPOINTS.ADMIN.EDUCATION_GALLERIES);

export default educationGalleryService;
