"use client"

import React, { useEffect, useState } from 'react';
import ChatGPT from '../components/ChatGpt'
import { Sidebar } from '../components/Sidebar'
import styles from './page.module.css'
import { useClientMediaQuery } from '../helpers/useClientMediaQuery';

export default function Home() {
  const isMobile = useClientMediaQuery('(max-width: 600px)');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  useEffect(() => {
    fetchChats();
  }, []);

  async function fetchChats() {
    try {
      const response = await fetch('/api/save');
      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.error('Failed to fetch chats.', error);
    }
  }

  const handleSaveButtonClick = async () => {
    await fetchChats();
  };

  return (
    <main className={styles.main}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isMobile={isMobile}
        chats={chats}
      />
      <ChatGPT
        isSidebarOpen={isSidebarOpen}
        isMobile={isMobile}
        handleSaveButtonClick={handleSaveButtonClick}
      />
    </main>
  )
}
