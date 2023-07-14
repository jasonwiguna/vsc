// https://nextjs.org/docs/advanced-features/custom-app
import React from 'react'
import Head from 'next/head'
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/LOGO/VSTREAM LOGO/VStreamLOGO_Circle.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools /> */}
        <Header/>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}
