export interface IContactRequestProps {
  name: string;
  phone: string;
  email: string;
  secundary_email?: string;
}

export interface IContactResponseProps extends IContactRequestProps {
  id: string;
  created_at: Date;
  updated_at: Date;
}
