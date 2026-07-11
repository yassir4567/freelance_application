import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { authApi } from "../api/auth/authApi.ts";
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
} from "../types/user.types.ts";
import type { ValidationErrors } from "../api/config.ts";

type AuthProviderProps = {
  children: React.ReactNode;
};

type ProfileCompelation = {
  is_profile_completed: boolean;
  missing_fields: string[];
  percentage: number;
};

type MeResponseData = {
  user: User;
  profile: ProfileCompelation;
};

type AuthResponseData = {
  user: User;
  profile: ProfileCompelation;
  token: string;
};

type AuthActionResult =
  | {
      success: false;
      status?: number;
      message?: string;
      errors?: ValidationErrors | null;
    }
  | {
      success: true;
      user: User;
      profile: ProfileCompelation;
    };

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  profileCompletionState: ProfileCompelation | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthActionResult>;
  register: (credentials: RegisterCredentials) => Promise<AuthActionResult>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profileCompletionState, setProfileCompletionState] =
    useState<ProfileCompelation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      const result = await authApi.me<MeResponseData>();

      if (!result.success || !result.data) {
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

  async function login(
    credentials: LoginCredentials,
  ): Promise<AuthActionResult> {
    const result = await authApi.login<AuthResponseData, LoginCredentials>(
      credentials,
    );

    if (!result.success) {
      return result;
    }

    if (!result.data) {
      return {
        success: false,
        status: 500,
        message: "No data returned from server",
        errors: null,
      };
    }

    const { user, profile, token } = result.data;

    localStorage.setItem("token", token);

    setUser(user);
    setProfileCompletionState(profile);

    return {
      success: true,
      user,
      profile,
    };
  }

  async function logout(): Promise<void> {
    await authApi.logout();
    localStorage.removeItem("token");
    setUser(null);
    setProfileCompletionState(null);
  }

  // * register user function
  async function register(
    formData: RegisterCredentials,
  ): Promise<AuthActionResult> {
    const result = await authApi.register<
      AuthResponseData,
      RegisterCredentials
    >(formData);

    if (!result.success) {
      return result;
    }

    if (!result.data) {
      return {
        success: false,
        status: 500,
        message: "No data returned from server",
        errors: null,
      };
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
    setUser,
    profileCompletionState,
    isLoading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}

export { useAuth, AuthProvider };
