import '../styles/globals.css'
import type { AppProps } from 'next/app'
import styles from "../styles/Home.module.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (<div>
        <Head>
          <title>Lost In Space</title>
          <meta name="description" content="Lost in space - an educational game that simulates a ride frm earth to mars" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Component {...pageProps} />
  </div>

  )
}
export default MyApp
