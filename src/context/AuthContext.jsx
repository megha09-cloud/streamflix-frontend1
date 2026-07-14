import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("streamflix_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((token, userData) => {
    if (token) localStorage.setItem("streamflix_token", token);
    if (userData) {
      localStorage.setItem("streamflix_user", JSON.stringify(userData));
      setUser(userData);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("streamflix_token");
    localStorage.removeItem("streamflix_user");
    setUser(null);
  }, []);

  const isAuthenticated = Boolean(localStorage.getItem("streamflix_token"));

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
