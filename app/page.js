"use client"

import React, { useEffect, useState } from 'react';
import ChatGPT from '../components/ChatGpt'
import { Sidebar } from '../components/Sidebar'
import styles from './page.module.css'
import { useClientMediaQuery } from '../helpers/useClientMediaQuery';

export default function Home() {
  const isMobile = useClientMediaQuery('(max-width: 600px)');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <main className={styles.main}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isMobile={isMobile}
      />
      <ChatGPT
        isSidebarOpen={isSidebarOpen}
        isMobile={isMobile}
      />
    </main>
  )
}
