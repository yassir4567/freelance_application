import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth/getCurrentUser";
import { loginUser } from "../api/auth/login";
import { logoutUser } from "../api/auth/logout";
import { registerUser } from "../api/auth/register";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profileCompletionState, setProfileCompletionState] = useState(null);
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
        setUser(null);
        setIsLoading(false);
        return;
      }

      setUser(result.data.user);
      setProfileCompletionState(result.data.profile);

      setIsLoading(false);
    }
    loadUser();
  }, []);

  async function login(credentials) {
    const result = await loginUser(credentials);

    if (!result.success) {
      return result;
    }

    const { user, profile, token } = result.data;

    localStorage.setItem("token", token);
    console.log(user);
    
    setUser(user);
    setProfileCompletionState(profile);

    return {
      success: true,
      user,
    };
  }

  async function logout() {
    const result = await logoutUser();

    localStorage.removeItem("token");
    setUser(null);
    setProfileCompletionState(null);
  }

  // * register user function
  async function register(formData) {
    const result = await registerUser(formData);

    if (!result.success) {
      return result;
    }

    const { token, user, profile } = result.data;
    localStorage.setItem("token", token);
    setUser(user);
    setProfileCompletionState(profile);

    return {
      success: true,
      user,
      profile,
    };
  }

  const values = {
    user,
    profileCompletionState,
    isLoading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthProvider };
