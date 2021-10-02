import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (<div>
        <Head>
          <title>Lost In Space</title>
          <meta name="description" content="Lost in space - an educational game that simulates a ride frm earth to mars" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
          <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"/>
        </Head>

        <Component {...pageProps} />
  </div>

  )
}
export default MyApp
