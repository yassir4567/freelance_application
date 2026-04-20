import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth/getCurrentUser";
import { loginUser } from "../api/auth/login";
import { logoutUser } from "../api/auth/logout";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      const result = await getCurrentUser();

      if (!result.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsLoading(false);
        return;
      }

      setUser(result.data.user);
      setIsLoading(false);
    }
    loadUser();
  }, []);

  async function login(credentials) {
    const result = await loginUser(credentials);

    if (!result.success) {
      return result;
    }

    const { token, user } = result.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);

    return {
      success: true,
      user,
    };
  }

  async function logout() {
    const result = await logoutUser();

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthProvider };
