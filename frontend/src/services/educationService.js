import API_ENDPOINTS from "../constants/api";
import { createPublicListCrudService } from "./createCrudService";

const educationService = createPublicListCrudService(
  API_ENDPOINTS.PUBLIC.EDUCATION,
  API_ENDPOINTS.ADMIN.EDUCATION
);

export default educationService;