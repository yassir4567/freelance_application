import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../api/auth/authApi.ts";

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

      const result = await authApi.me();

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
    const result = await authApi.login(credentials);

    if (!result.success) {
      return result;
    }

    const { user, profile, token } = result.data;

    localStorage.setItem("token", token);

    setUser(user);
    setProfileCompletionState(profile);

    return {
      success: true,
      user,
    };
  }

  async function logout() {
    const result = await authApi.logout();

    localStorage.removeItem("token");
    setUser(null);
    setProfileCompletionState(null);
  }

  // * register user function
  async function register(formData) {
    const result = await authApi.register(formData);

    if (!result.success) {
      return result;
    }

    console.log(result.data);

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
    setUser,
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
