"use client"

import React, { useState } from 'react';
import { ChatGPT } from '../components/ChatGpt'
import { Sidebar } from '../components/Sidebar'
import styles from './page.module.css'

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <main className={isSidebarOpen ? styles.main : styles.sidebarclose}>
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <ChatGPT isSidebarOpen={isSidebarOpen} />
    </main>
  )
}
