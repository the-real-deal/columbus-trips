import { createContext, useContext } from "react";

type AuthContextType = {
  user: string | null;
  login: (isAdmin: boolean, username: string) => boolean;
  logout: () => void;
};

const defaultAuthValue = undefined
export const AuthContext = createContext<AuthContextType | undefined>(defaultAuthValue);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
