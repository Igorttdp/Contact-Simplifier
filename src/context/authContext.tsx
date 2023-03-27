import { ILoginRequest } from "@/interfaces/login.interface";
import api from "@/services/api";
import { createContext, ReactNode } from "react";

interface AuthProviderData {
  login(data: ILoginRequest): Promise<void>;
}

interface IProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthProviderData>(
  {} as AuthProviderData
);

export const AuthProvider = ({ children }: IProviderProps) => {
  const login = async (payload: ILoginRequest) => {
    const response = await api.post("/login", payload);

    console.log(response);
  };

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};
