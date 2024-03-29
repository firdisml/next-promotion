import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="h-full">
      <Head />
      <body className="h-full bg-gray-200 dark:bg-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
