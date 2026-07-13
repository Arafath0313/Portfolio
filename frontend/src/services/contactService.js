import axiosClient from "./axiosClient";
import API_ENDPOINTS from "../constants/api";
import { extractData } from "../utils/apiHelpers";

const contactService = {
  sendMessage: (payload) =>
    axiosClient.post(API_ENDPOINTS.PUBLIC.CONTACT, payload).then(extractData),
};

export default contactService;
