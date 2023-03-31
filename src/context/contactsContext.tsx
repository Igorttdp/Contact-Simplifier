import { IProviderProps } from "@/interfaces/provider.interface";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import api from "@/services/api";
import {
  IContactRequestProps,
  IContactResponseProps,
} from "@/interfaces/contact.interface";
import { parseCookies } from "nookies";

interface RegisterProviderData {
  registerContact(payload: IContactRequestProps): Promise<any>;
  contacts: Array<IContactResponseProps>;
  setContacts: Dispatch<SetStateAction<IContactResponseProps[]>>;
  deleteContact(id: string): Promise<void>;
}

export const ContactsContext = createContext({} as RegisterProviderData);

export const ContactsProvider = ({ children }: IProviderProps) => {
  const [contacts, setContacts] = useState(Array<IContactResponseProps>);

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

  const deleteContact = async (id: string) => {
    const cookies = parseCookies();

    return await api.delete(`/contacts/${id}`, {
      headers: { Authorization: `Bearer ${cookies["token"]}` },
    }).then(res => res.data);
  };

  return (
    <ContactsContext.Provider
      value={{ registerContact, contacts, setContacts, deleteContact }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
