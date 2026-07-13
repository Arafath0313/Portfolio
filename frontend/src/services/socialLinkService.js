import API_ENDPOINTS from "../constants/api";
import { createPublicListCrudService } from "./createCrudService";

const socialLinkService = createPublicListCrudService(
  API_ENDPOINTS.PUBLIC.SOCIAL_LINKS,
  API_ENDPOINTS.ADMIN.SOCIAL_LINKS
);

export default socialLinkService;
