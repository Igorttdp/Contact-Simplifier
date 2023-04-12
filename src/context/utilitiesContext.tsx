import OutlineButton from "@/components/OutlineButton";
import { IProviderProps } from "@/interfaces/provider.interface";
import moment from "moment";
import { createContext } from "react";
import { ThreeDots } from "react-loader-spinner";

interface IUtilitiesProviderProps {
  phoneMask(value: string): string;
  handleDate(date: Date | string): string;
  changeButtonState(isLoading: boolean, innerText: string): JSX.Element;
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

  const changeButtonState = (isLoading: boolean, innerText: string) => {
    if (isLoading)
      return (
        <OutlineButton width={"100%"} mode={"sucess"}>
          <ThreeDots
            height="22"
            width="22"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ justifyContent: "center" }}
            visible={true}
          />
        </OutlineButton>
      );

    return (
      <OutlineButton width={"100%"} mode={"sucess"}>
        {innerText}
      </OutlineButton>
    );
  };

  return (
    <UtilitiesContext.Provider
      value={{ phoneMask, handleDate, changeButtonState }}
    >
      {children}
    </UtilitiesContext.Provider>
  );
};

export default UtilitiesProvider;
