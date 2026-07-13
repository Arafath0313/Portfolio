import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import authStorage from "../utils/authStorage";
import authService from "../services/authService";

/* eslint-disable react-refresh/only-export-components */
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    authStorage.clear();
    setAccessToken(null);
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    // Restore session from local storage on mount
    const token = authStorage.getToken();
    if (token) {
      setAccessToken(token);
    }
    setLoading(false);

    // Listen for 401 unauthorized events dispatched by axiosClient
    const handleUnauthorized = () => {
      logout();
      toast.error("Session expired. Please log in again.", {
        toastId: "session-expired",
      });
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, [logout]);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    const token = response.data.data.accessToken;
    authStorage.saveToken(token);
    setAccessToken(token);
    return response.data;
  };

  const value = useMemo(
    () => ({
      accessToken,
      isAuthenticated: !!accessToken,
      loading,
      login,
      logout,
    }),
    [accessToken, loading, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}