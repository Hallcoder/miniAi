// src/pages/_app.js
import Layout from "@/components/Layout";
import "../app/globals.css";
import { Roboto } from "next/font/google";
import { RecoilRoot } from "recoil";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
function MyApp({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </RecoilRoot>
    </main>
  );
}

export default MyApp;
