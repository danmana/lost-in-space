import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from "next/head";
import { useEffect, useState, } from 'react';
import { UserContext } from '../common/context/user.context';
import { emptyWarehouse, WarehouseContext } from "../common/context/warehouse.context";
import * as ga from '../common/google-analytics';


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [userName, setUsername] = useState();
  // const [warehouse, setWarehouse] = useState(JSON.parse("{\"resources\":{\"fuel\":{\"resource\":{\"type\":\"Fuel\",\"price\":10,\"weight\":10},\"quantity\":12,\"remaining\":12},\"food\":{\"resource\":{\"type\":\"Food\",\"price\":10,\"weight\":10},\"quantity\":12,\"remaining\":12},\"water\":{\"resource\":{\"type\":\"Water\",\"price\":10,\"weight\":10},\"quantity\":12,\"remaining\":12},\"oxygen\":{\"resource\":{\"type\":\"Oxygen\",\"price\":10,\"weight\":10},\"quantity\":12,\"remaining\":12},\"meds\":{\"resource\":{\"type\":\"Meds\",\"price\":10,\"weight\":10},\"quantity\":12,\"remaining\":12},\"equipment\":{\"resource\":{\"type\":\"Equipment\",\"price\":10,\"weight\":10},\"quantity\":12,\"remaining\":12},\"misc\":{\"resource\":{\"type\":\"Misc\",\"price\":10,\"weight\":10},\"quantity\":12,\"remaining\":12},\"sweets\":{\"resource\":{\"type\":\"Sweets\",\"price\":10,\"weight\":10},\"quantity\":1,\"remaining\":1},\"media\":{\"resource\":{\"type\":\"Media\",\"price\":10,\"weight\":10},\"quantity\":1,\"remaining\":1},\"tv\":{\"resource\":{\"type\":\"TV\",\"price\":10,\"weight\":10},\"quantity\":1,\"remaining\":1},\"nintendo\":{\"resource\":{\"type\":\"Nintendo\",\"price\":10,\"weight\":10},\"quantity\":1,\"remaining\":1},\"eReader\":{\"resource\":{\"type\":\"eReader\",\"price\":10,\"weight\":10},\"quantity\":1,\"remaining\":1},\"ambientLights\":{\"resource\":{\"type\":\"Ambient Lights\",\"price\":10,\"weight\":10},\"quantity\":1,\"remaining\":1},\"fashionableHat\":{\"resource\":{\"type\":\"Fashionable Hat\",\"price\":10,\"weight\":10},\"quantity\":1,\"remaining\":1}},\"stats\":{\"happiness\":{\"value\":100,\"type\":\"Mood\"},\"health\":{\"value\":100,\"type\":\"Health\"},\"aircraft\":{\"value\":100,\"type\":\"Aircraft\"}}}"));
  const [warehouse, setWarehouse] = useState(emptyWarehouse);

  useEffect(() => {
    if (ga.isAnalyticsEnabled()) {
      //When the component is mounted, subscribe to router changes
      //and log those page views
      router.events.on('routeChangeComplete', ga.pageview)

      // If the component is unmounted, unsubscribe
      // from the event with the `off` method
      return () => {
        router.events.off('routeChangeComplete', ga.pageview)
      }
    }
  }, [router.events]);

  return (<div>
    <Head>
      <title>Lost In Space</title>
      <meta name="description" content="Lost in space - an educational game that simulates a ride from Earth to Mars" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      { ga.isAnalyticsEnabled() && 
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga.GTAG_ANALYTICS_ID}`}></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${ga.GTAG_ANALYTICS_ID}');
            `}}
        />
      </>
      }
      
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
