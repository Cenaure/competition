import React from 'react'
import './styles.css'
import { GeistSans } from 'geist/font/sans'
import Header from '@/components/ui/Header/Header'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="uk" className={GeistSans.className}>
      <head>
        <link rel="shortcut icon" href="/payloadLogo.png" type="image/png" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
