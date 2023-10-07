import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import Footer from '@/components/Footer'

const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Text Wave',
  description: 'Text to Speech Web Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.svg" />
      <body className={roboto.className}>
        <Navbar />
        <div className='min-h-[calc(100vh-104px)] flex items-center justify-center'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
