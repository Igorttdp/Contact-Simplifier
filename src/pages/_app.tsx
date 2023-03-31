import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Providers from "@/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
      <ToastContainer />
    </Providers>
  );
}
