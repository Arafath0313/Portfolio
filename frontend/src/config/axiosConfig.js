import environment from "./environment";

const axiosConfig = {
  baseURL: environment.API.BASE_URL,
  timeout: environment.API.TIMEOUT,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export default axiosConfig;