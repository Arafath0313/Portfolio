import API_ENDPOINTS from "../constants/api";
import { createAdminListCrudService } from "./createCrudService";

const contactMessageService = createAdminListCrudService(API_ENDPOINTS.ADMIN.CONTACT);

export default contactMessageService;
