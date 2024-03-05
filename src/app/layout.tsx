import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { isMobileDevice } from '../libs/responsive';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../libs/auth";
import { Session } from "next-auth";
import { Providers } from './Providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ChatGPT Clone | By Marcos Cámara',
  description: 'ChatGPT clone made with NextJS 13, uses OpenAI API and mongoDB as database',
}

export default async function RootLayout({ children }) {
  const session: Session | null = await getServerSession(authOptions);
  const isMobile = isMobileDevice();
  const initialSidebarState = isMobile ? false : true;

  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Providers initialSidebarState={initialSidebarState}>
            {session ? <Sidebar isMobile={isMobile} /> : ""}
            {children}
          </Providers>
        </main>
        <Analytics />
      </body>
    </html>
  )
}
