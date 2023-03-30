import { ILoginRequestProps } from "@/interfaces/login.interface";
import api from "@/services/api";
import { useRouter } from "next/router";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { IProviderProps } from "@/interfaces/provider.interface";
import { IUserProfile } from "@/interfaces/user.interface";
import { IUpdateUserRequestProps } from "@/interfaces/register.interface";

interface UserProviderData {
  login(data: ILoginRequestProps): Promise<string>;
  logout(): void;
  profile: IUserProfile;
  setProfile: Dispatch<SetStateAction<IUserProfile>>;
  updateUserData(payload: IUpdateUserRequestProps): Promise<IUserProfile>;
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

  const updateUserData = async (payload: IUpdateUserRequestProps) => {
    const cookies = parseCookies();

    const filledData: IUpdateUserRequestProps = Object.entries(payload).reduce(
      (acc, [key, value]: [string, string]) => {
        if (value !== "") {
          acc[key as keyof IUpdateUserRequestProps] = value;

          if (key === "phone") {
            acc[key as keyof IUpdateUserRequestProps] = value.replace(
              /[^$0-9\.]/g,
              ""
            );
          }
        }
        return acc;
      },
      {} as IUpdateUserRequestProps
    );

    return await api
      .patch("/profile", filledData, {
        headers: { Authorization: `Bearer ${cookies["token"]}` },
      })
      .then((res) => res.data);
  };

  return (
    <UserContext.Provider
      value={{ login, logout, profile, setProfile, updateUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};
