// src/context/AuthContext.tsx
import React, { createContext, useEffect, useState, ReactNode } from "react";
import {jwtDecode} from "jwt-decode";

// Define the shape of your JWT payload
interface TokenPayload {
  sub: string;
  user_id: number;
  role: string;
  exp: number;
}

// Define the User interface
export interface User {
  sub: string;
  user_id: number;
  role: string;
  exp: number;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (token: string) => void;
  logout: () => void;
}

// Create the AuthContext with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to handle login
  const login = (token: string) => {
    sessionStorage.setItem("access_token", token);
    try {
      const decoded: TokenPayload = jwtDecode(token);
      setUser({
        sub: decoded.sub,
        user_id: decoded.user_id,
        role: decoded.role,
        exp: decoded.exp,
      });
    } catch (error) {
      console.error("Error decoding token during login:", error);
      setUser(null);
    }
  };

  // Function to handle logout
  const logout = () => {
    sessionStorage.removeItem("access_token");
    setUser(null);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const decoded: TokenPayload = jwtDecode(token);

      // Check if token is expired
      if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
        sessionStorage.removeItem("access_token");
        setUser(null);
      } else {
        setUser({
          sub: decoded.sub,
          user_id: decoded.user_id,
          role: decoded.role,
          exp: decoded.exp,
        });
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
