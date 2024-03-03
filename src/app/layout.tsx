import React from 'react';
import { ChatProvider } from '../hooks/ChatContext';
import { Sidebar } from '../components/Sidebar';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SidebarProvider } from '../hooks/SidebarContext';
import { isMobileDevice } from '../libs/responsive';

import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ChatGPT Clone | By Marcos Cámara',
  description: 'ChatGPT clone made with NextJS 13, uses OpenAI API and mongoDB as database',
}

export default function RootLayout({ children }) {
  const isMobile = isMobileDevice();
  const initialSidebarState = isMobile ? false : true;

  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <ChatProvider>
            <SidebarProvider initialSidebarState={initialSidebarState}>
              <Sidebar isMobile={isMobile} />
              {children}
            </SidebarProvider>
          </ChatProvider>
        </main>
        <Analytics />
      </body>
    </html>
  )
}
