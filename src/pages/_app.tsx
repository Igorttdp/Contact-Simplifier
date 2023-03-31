import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Providers from "@/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Head>
        <title>Contact Simplifier</title>
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </Providers>
  );
}
