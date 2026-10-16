import { createContext, useState, useEffect, type ReactNode } from "react";
import { toast } from "react-toastify";
import type { AuthContextValue, User } from "../types";
import { apiRequest, setToken, clearToken, getToken, ApiError } from "../api/client";

export const AuthContext = createContext({} as AuthContextValue);

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

const USER_KEY = "taskduty-user";

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    apiRequest<{ user: User }>("/api/auth/me")
      .then(({ user }) => {
        setUser(user);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      })
      .catch(() => {
        clearToken();
        localStorage.removeItem(USER_KEY);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const data = await apiRequest<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: { email, password },
        auth: false,
      });
      setToken(data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setUser(data.user);
      toast.success("Logged in successfully");
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Login failed";
      toast.error(message);
      throw error;
    }
  };

  // Registration creates the account but does NOT log the user in —
  // they're sent back to Login afterward (see Register.tsx).
  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<void> => {
    try {
      await apiRequest<AuthResponse>("/api/auth/register", {
        method: "POST",
        body: { firstName, lastName, email, password },
        auth: false,
      });
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Registration failed";
      toast.error(message);
      throw error;
    }
  };

  const logout = (): void => {
    clearToken();
    localStorage.removeItem(USER_KEY);
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
