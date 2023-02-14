import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import ArticlesProvider from 'contexts/ArticleContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ArticlesProvider>
          <Component {...pageProps} />
      </ArticlesProvider>
  )
}
