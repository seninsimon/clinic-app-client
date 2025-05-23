import React, { createContext, useState, useEffect} from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string , role : string) => void;
  logout: () => void;
  role : string | null
  isAdmin : boolean ;
  isDoctor : boolean ;

}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  role : null,
  isAdmin : false,
  isDoctor : false

});


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAdmin , setIsadmin] = useState<boolean>(false)
  const [isDoctor , setIsDoctor] = useState<boolean>(false)

  // ✅ Initialize from localStorage on first load
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedRole = localStorage.getItem("role"); // 🟡 Load saved role

    if (token) {
      setIsLoggedIn(true);
      setToken(token);
      setRole(storedRole); // ✅ Restore role after refresh
    }
    if(storedRole === "admin")
    {
      setIsadmin(true)
    }
    if(storedRole === "doctor")
    {
      setIsDoctor(true)
    }
 
  }, []);

  const login = (token: string, role: string) => {
    console.log("LOGIN ROLE:", role);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("role", role); // ✅ Save role
    setIsLoggedIn(true);
    setToken(token);
    setRole(role);
    setIsadmin(role === "admin")
    setIsDoctor(role === "doctor")
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role"); // ✅ Clean role too
    setIsLoggedIn(false);
    setToken(null);
    setRole(null);
    setIsadmin(false)
    setIsDoctor(false)
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, role, isAdmin ,isDoctor}}>
      {children}
    </AuthContext.Provider>
  );
};

