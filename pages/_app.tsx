import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from "next/head";
import { useState } from 'react';
import { UserContext } from '../common/context/user.context';

function MyApp({ Component, pageProps }: AppProps) {

  const [userName, setUsername] = useState(null);


  return (<div>
        <Head>
          <title>Lost In Space</title>
          <meta name="description" content="Lost in space - an educational game that simulates a ride frm earth to mars" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"/>
        </Head>

      <UserContext.Provider value={{
        username: userName,
        setUsername: setUsername as any
      }}>
        <Component {...pageProps} />
      </UserContext.Provider>
  </div>

  )
}
export default MyApp
