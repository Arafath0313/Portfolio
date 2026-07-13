const environment = {
  APP_NAME: "Personal Portfolio",

  API: {
    HOST: "http://localhost:8080",
    VERSION: "/api/v1",
    BASE_URL: "http://localhost:8080/api/v1",
    TIMEOUT: 15000,
  },

  MODE: import.meta.env.MODE,
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
};

export default environment;