import { Poppins } from "next/font/google";
import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import type { AppProps } from "next/app";

import Layout from "@/components/Layout";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  style: "normal",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <main className={poppins.className}>
        <Head>
          <title>News App</title>
          <meta
            property="og:title"
            content="News Web Application"
            key="title"
          />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </SessionProvider>
  );
}
