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

export default function App({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='light' enableSystem={true} attribute='class'>
        <main className={dmsans.className}>
          <PrimaryLayout>
            <ToastContainer />
            <Component {...pageProps} />
          </PrimaryLayout>
        </main>
      </ThemeProvider>
    </QueryClientProvider>

  )

}
