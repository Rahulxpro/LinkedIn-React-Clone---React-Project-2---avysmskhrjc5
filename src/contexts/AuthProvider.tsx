import React, { ReactNode, createContext, useContext, useState } from "react";
import useUserData from "../hooks/useUserData";
import { User } from "../hooks/useUserData";

interface AuthContextValue {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
  loadingTrue: () => void;
  loadingFalse: () => void;
  setUser: (user: User) => void;
  user: User;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  login: () => {},
  logout: () => {},
  isLoading: false,
  loadingTrue: () => {},
  loadingFalse: () => {},
  setUser: () => {},
  user: { name: "", email: "", _id: "" },
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useUserData("userData", {
    name: "",
    email: "",
    _id: "",
  });

  const loadingTrue = () => {
    setIsLoading(true);
  };
  const loadingFalse = () => {
    setIsLoading(false);
  };

  const login = (token: string) => {
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout,
    isLoading,
    loadingTrue,
    loadingFalse,
    setUser,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
