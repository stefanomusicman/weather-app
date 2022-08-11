import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import ContextProvider from '../context/context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Weather App</title>
      </Head>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </>
  )
}

export default MyApp
