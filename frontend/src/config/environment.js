// Strip any accidental trailing slash or /api/v1 already present in the env var.
// This prevents the double-prefix bug: /api/v1/api/v1/about
const _rawHost = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/api\/v\d+\/?$/, "").replace(/\/$/, "");

const environment = {
  APP_NAME: "Personal Portfolio",

  API: {
    /**
     * VITE_API_BASE_URL  — set this to the bare Railway host, e.g.:
     *   https://portfolio-production-6d6a.up.railway.app
     * Do NOT include /api/v1 in this variable. VERSION is appended automatically.
     */
    HOST: _rawHost,
    VERSION: "/api/v1",
    // Final base URL used by Axios: https://...railway.app/api/v1
    BASE_URL: `${_rawHost}/api/v1`,
    TIMEOUT: 15000,
  },

  MODE: import.meta.env.MODE,
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
};

export default environment;