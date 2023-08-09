"use client"

import './globals.css'
import React from 'react';
import { ChatProvider } from '../helpers/ChatContext';
import { Sidebar } from '../components/Sidebar';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SidebarProvider } from '../helpers/SidebarContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ChatGPT Clone | By Marcos Cámara',
  description: 'ChatGPT clone made with NextJS 13, uses OpenAI API and mongoDB as database',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <ChatProvider>
            <SidebarProvider> 
              <Sidebar />
              {children}
            </SidebarProvider>
          </ChatProvider>
        </main>
        <Analytics />
      </body>
    </html>
  )
}
