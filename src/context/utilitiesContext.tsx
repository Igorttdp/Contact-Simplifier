import { IProviderProps } from "@/interfaces/provider.interface";
import moment from "moment";
import { createContext, Dispatch, SetStateAction } from "react";

interface IUtilitiesProviderProps {
  phoneMask(value: string): string;
  handleDate(date: Date | string): string;
}

export const UtilitiesContext = createContext<IUtilitiesProviderProps>(
  {} as IUtilitiesProviderProps
);

const UtilitiesProvider = ({ children }: IProviderProps) => {
  const phoneMask = (value: string) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };

  const handleDate = (date: Date | string) => moment(date).format("DD/MM/YYYY");

  return (
    <UtilitiesContext.Provider value={{ phoneMask, handleDate }}>
      {children}
    </UtilitiesContext.Provider>
  );
};

export default UtilitiesProvider;
