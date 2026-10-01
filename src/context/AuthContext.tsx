"use client"
import api from "@/lib/axios";
import { TUser } from "@/types/auth/user";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
  user: TUser | null;
  loading: boolean;
  refetchUser: () => Promise<void>;
}

 export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await api.get("/profile");

      setUser(response.data.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refetchUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
