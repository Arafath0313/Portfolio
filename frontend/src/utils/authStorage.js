import AUTH from "../constants/auth";

const authStorage = {
  saveToken(token) {
    localStorage.setItem(AUTH.ACCESS_TOKEN_KEY, token);
  },

  getToken() {
    return localStorage.getItem(AUTH.ACCESS_TOKEN_KEY);
  },

  removeToken() {
    localStorage.removeItem(AUTH.ACCESS_TOKEN_KEY);
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  clear() {
    this.removeToken();
  },
};

export default authStorage;