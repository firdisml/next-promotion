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

export default function App({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer bodyClassName="font-mono"/>
      <main className={dmsans.className}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  )

}
