import { ILoginRequestProps } from "@/interfaces/login.interface";
import api from "@/services/api";
import { useRouter } from "next/router";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { setCookie, destroyCookie } from "nookies";
import { IProviderProps } from "@/interfaces/provider.interface";
import { IUserProfile } from "@/interfaces/user.interface";

interface UserProviderData {
  login(data: ILoginRequestProps): Promise<string>;
  logout(): void;
  profile: IUserProfile;
  setProfile: Dispatch<SetStateAction<IUserProfile>>;
}

export const UserContext = createContext<UserProviderData>(
  {} as UserProviderData
);

export const UserProvider = ({ children }: IProviderProps) => {
  const [profile, setProfile] = useState({} as IUserProfile);

  const router = useRouter();

  const login = async (payload: ILoginRequestProps) => {
    try {
      const { data } = await api.post("/login", payload);

      setCookie(null, "token", data.token, { maxAge: 60 * 30, path: "/" });

      router.push("/dashboard");

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const logout = (): void => {
    destroyCookie(null, "token");
    router.push("/");
  };

  return (
    <UserContext.Provider value={{ login, logout, profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
};
