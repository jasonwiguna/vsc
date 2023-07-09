// https://nextjs.org/docs/advanced-features/custom-app
import React from 'react'
import Head from 'next/head'
import MiniDrawer from '../components/Sidebar';
import 'bootstrap/dist/css/bootstrap.css'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/dashboard/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools /> */}
        <MiniDrawer/>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}
