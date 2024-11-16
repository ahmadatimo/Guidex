import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';

interface DashboardContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const DashboardContext = createContext<DashboardContextType | null>(null);

export const DashboardContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <DashboardContext.Provider value={{ user, setUser }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook for consuming context
export function useUserContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useUserContext must be used within a DashboardContextProvider');
  }
  return context;
}
