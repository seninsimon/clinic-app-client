import React, { createContext, useState, useEffect} from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated : boolean
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  isAuthenticated : false
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

   const [ token , setToken ] = useState<string | null>(null)
   
  // ✅ Initialize from localStorage on first load
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
    setToken(token)
  }, []);

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    setIsLoggedIn(true); // ✅ This will trigger re-render for Navbar
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false); // ✅ Also triggers re-render
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout , isAuthenticated : !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
