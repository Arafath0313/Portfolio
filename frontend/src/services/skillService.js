import API_ENDPOINTS from "../constants/api";
import { createPublicListCrudService } from "./createCrudService";

const skillService = createPublicListCrudService(
  API_ENDPOINTS.PUBLIC.SKILLS,
  API_ENDPOINTS.ADMIN.SKILLS
);

export default skillService;
