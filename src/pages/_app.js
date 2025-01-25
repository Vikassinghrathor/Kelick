import { AppContextProvider } from '@/context/AppContext';
import '@/styles/globals.css';
import '@fontsource/quicksand';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Kelick - HR Solutions</title>
        <meta
          name="description"
          content="Kelick is a HR solution that helps you manage your team and payroll."
        />
        <meta name="keywords" content="nextjs, seo, react, web development" />
      </Head>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </>
  );
}
