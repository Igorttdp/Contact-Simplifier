import { IContactResponseProps } from "./contact.interface";

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
  contacts: IContactResponseProps[];
}
