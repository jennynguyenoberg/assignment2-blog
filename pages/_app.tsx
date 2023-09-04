import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import RootLayout from '../components/root-layout';

import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from '@/lib/supabaseClient';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Jenny Nguyen Öberg&apos;s Blog</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
        <div id="root" />
      </SessionContextProvider>
    </>
  );
}
