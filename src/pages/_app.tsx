import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DM_Sans } from '@next/font/google'
const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400']
})
import { ThemeProvider } from 'next-themes';
import PrimaryLayout from 'layout/PrimaryLayout';
import Head from 'next/head';
export default function App({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
      <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:title" content="Sasaje" />
        <meta name="twitter:description" content="Save Big Promos and Promotions: The Ultimate Tool for Discount Hunters" />
        <meta name="twitter:image" content="" />
        <title>Sasaje | Deals & Promotions </title>
        <meta name="Sasaje" content="Save Big Promos and Promotions: The Ultimate Tool for Discount Hunters!"/>
      </Head>
      <ThemeProvider defaultTheme='light' enableSystem={true} attribute='class'>
        <main className={dmsans.className}>
          <PrimaryLayout>
            <ToastContainer className="font-semibold"/>
            <Component {...pageProps} />
          </PrimaryLayout>
        </main>
      </ThemeProvider>
    </QueryClientProvider>

  )

}
