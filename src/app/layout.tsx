import React from 'react';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { Providers } from './Providers';
import { GoogleAnalytics } from '@next/third-parties/google'
import { Toaster } from 'sonner';

import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ChatGPT Clone | By Marcos Cámara',
  description: 'ChatGPT clone made with NextJS 13, uses OpenAI API and mongoDB as database',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Toaster position="top-right" />
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
      <Analytics />
      <GoogleAnalytics gaId="G-42B7X9K6H1" />
    </html>
  )
}
