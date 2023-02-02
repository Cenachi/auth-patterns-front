import { api } from "@/services/api";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

type AuthContextType = {
  isAuthenticated: boolean;
  signUp: (username: string, email: string, password: string) => void;
  signIn: ({ email, password }: SignInData) => void;
  logout: () => void;

  user: any;
};

type SignInData = {
  email: string;
  password: string;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: true,
  signUp: () => {},
  signIn: () => {},
  logout: () => {},
  user: {},
});

export const useAuthContext = () => {
  return useContext<AuthContextType>(AuthContext);
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState(null);

  const signUp = async (username: string, email: string, password: string) => {
    return await api.post("/register", {
      name: username,
      email: email,
      password: password,
    });
  };

  async function signIn({ email, password }: SignInData) {
    try {
      const res = await api.post("/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);
      setIsAuthenticated(true);
      console.log(res);
    } catch (e) {
      console.error("Erro", e);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    setIsAuthenticated(true);
    setUser(JSON.parse(localStorage.getItem("user")!) || null);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signUp, signIn, logout,user }}>
      {children}
    </AuthContext.Provider>
  );
};
