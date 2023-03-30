import { IRegisterRequestProps } from "@/interfaces/register.interface";
import { IProviderProps } from "@/interfaces/provider.interface";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import api from "@/services/api";
import {
  IContactRequestProps,
  IContactResponseProps,
} from "@/interfaces/contact.interface";
import { parseCookies } from "nookies";

interface RegisterProviderData {
  registerUser(payload: IRegisterRequestProps): Promise<any>;
  registerContact(payload: IContactRequestProps): Promise<any>;
  contacts: Array<IContactResponseProps>;
  setContacts: Dispatch<SetStateAction<IContactResponseProps[]>>;
}

export const RegisterContext = createContext({} as RegisterProviderData);

export const RegisterProvider = ({ children }: IProviderProps) => {
  const [contacts, setContacts] = useState(Array<IContactResponseProps>);

  const registerUser = async (payload: IRegisterRequestProps) => {
    return await api.post("/users", payload).then((res) => res.data);
  };

  const registerContact = async (payload: IContactRequestProps) => {
    const cookies = parseCookies();

    return await api
      .post("/contacts", payload, {
        headers: {
          Authorization: `Bearer ${cookies["token"]}`,
        },
      })
      .then((res) => res.data);
  };

  return (
    <RegisterContext.Provider
      value={{ registerUser, registerContact, contacts, setContacts }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
