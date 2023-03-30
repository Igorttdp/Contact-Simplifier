import { ILoginRequestProps } from "./login.interface";

export interface IRegisterRequestProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
}