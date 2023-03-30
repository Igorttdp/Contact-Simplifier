import { RegisterProvider } from "./registerContext";
import { UserProvider } from "./userContext";
import UtilitiesProvider from "./utilitiesContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IProviderProps } from "@/interfaces/provider.interface";

const queryClient = new QueryClient();

const Providers = ({ children }: IProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <UtilitiesProvider>
          <RegisterProvider>{children}</RegisterProvider>
        </UtilitiesProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default Providers;
