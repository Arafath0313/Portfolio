const environment = {
  APP_NAME: "Personal Portfolio",

  API: {
    HOST: import.meta.env.VITE_API_BASE_URL,
    VERSION: "/api/v1",
    BASE_URL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
    TIMEOUT: 15000,
  },

  MODE: import.meta.env.MODE,
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
};

export default environment;