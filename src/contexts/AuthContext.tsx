import { api } from "@/services/api";
import { createContext, PropsWithChildren, useContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  signUp: (username: string, email: string, password: string) => void;
  signIn: ({ email, password }: SignInData) => void;
};

type SignInData = {
  email: string;
  password: string;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  signUp: () => {},
  signIn: () => {},
});

export const useAuthContext = () => {
  return useContext<AuthContextType>(AuthContext);
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const isAuthenticated = false;

  const signUp = (username: string, email: string, password: string) => {
    return api.post("/register", {
      name: username,
      email: email,
      password: password,
    });
  };

  async function signIn({ email, password }: SignInData) {
    return api.post("/login", {
      email: email,
      password: password,
    });
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signUp, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
