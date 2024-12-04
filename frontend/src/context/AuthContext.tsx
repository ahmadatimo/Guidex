import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  userEmail: string | null;
  role: string | null;
  accessToken: string | null;
  setUser: (userEmail: string, role: string, accessToken: string) => void;
  clearUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const setUser = (userEmail: string, role: string, accessToken: string) => {
    setUserEmail(userEmail);
    setRole(role);
    setAccessToken(accessToken);
  };

  const clearUser = () => {
    setUserEmail(null);
    setRole(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ userEmail, role, accessToken, setUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
