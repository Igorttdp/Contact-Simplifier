import { IContactResponseProps } from "./contact.interface";

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: Date | string;
  updated_at: Date | string;
  contacts: IContactResponseProps[];
}
