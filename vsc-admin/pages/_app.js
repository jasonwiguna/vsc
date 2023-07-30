// https://nextjs.org/docs/advanced-features/custom-app
import React from 'react'
import Head from 'next/head'
import MiniDrawer from '../components/Sidebar';
import 'bootstrap/dist/css/bootstrap.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRouter } from 'next/router';
import AuthRequired from '../components/AuthRequired';

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter()

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/dashboard/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        {asPath.split('?')[0] != '/admin' ? <AuthRequired>
            {/* <ReactQueryDevtools /> */}
            <MiniDrawer/>
            <Component {...pageProps} />
        </AuthRequired> : <Component {...pageProps} />}
      </QueryClientProvider>
    </>
  )
}
