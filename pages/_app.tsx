import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from "next/head";
import { useState } from 'react';
import { UserContext } from '../common/context/user.context';
import { emptyWarehouse, WarehouseContext } from "../common/context/warehouse.context";

function MyApp({ Component, pageProps }: AppProps) {

  const [userName, setUsername] = useState();
  const [warehouse, setWarehouse] = useState(emptyWarehouse);

  return (<div>
      <Head>
        <title>Lost In Space</title>
        <meta name="description" content="Lost in space - an educational game that simulates a ride from Earth to Mars"/>
        <link rel="icon" href="/favicon.ico"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"/>
      </Head>
          <nav>
              <h1>Lost in space</h1>
          </nav>

      <UserContext.Provider value={{
        username: userName,
        setUsername: setUsername as any
      }}>
        <WarehouseContext.Provider value={{
          warehouse: warehouse,
          setWarehouse: setWarehouse as any
        }}>
          <Component {...pageProps} />
        </WarehouseContext.Provider>
      </UserContext.Provider>
    </div>

  )
}

export default MyApp
