import { UserProvider } from "@/context/userContext";
import { RegisterProvider } from "@/context/registerContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RegisterProvider>
          <Component {...pageProps} />
        </RegisterProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
