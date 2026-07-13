import API_ENDPOINTS from "../constants/api";
import { createSingletonService } from "./createCrudService";

const aboutService = {
  ...createSingletonService(API_ENDPOINTS.PUBLIC.ABOUT, API_ENDPOINTS.ADMIN.ABOUT),
};

export default aboutService;
