import API_ENDPOINTS from "../constants/api";
import { createPublicListCrudService } from "./createCrudService";

const youtubeService = createPublicListCrudService(
  API_ENDPOINTS.PUBLIC.YOUTUBE_VIDEOS,
  API_ENDPOINTS.ADMIN.YOUTUBE_VIDEOS
);

export default youtubeService;
