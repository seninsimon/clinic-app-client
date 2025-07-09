// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  role: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  role: string | null;
  isAdmin: boolean;
  isDoctor: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  role: null,
  isAdmin: false,
  isDoctor: false,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAdmin, setIsadmin] = useState<boolean>(false);
  const [isDoctor, setIsDoctor] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);

        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
          logout();
        } else {
          setIsLoggedIn(true);
          setToken(token);
          setRole(decoded.role);
          setIsadmin(decoded.role === "admin");
          setIsDoctor(decoded.role === "doctor");
        }
      } catch (err) {
        console.error("Invalid token:", err);
        logout();
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    try {
      const decoded: JwtPayload = jwtDecode(token);
      const userRole = decoded.role;

      setIsLoggedIn(true);
      setToken(token);
      setRole(userRole);
      setIsadmin(userRole === "admin");
      setIsDoctor(userRole === "doctor");
    } catch (err) {
      console.error("Failed to decode JWT at login:", err);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setToken(null);
    setRole(null);
    setIsadmin(false);
    setIsDoctor(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, role, isAdmin, isDoctor }}>
      {children}
    </AuthContext.Provider>
  );
};