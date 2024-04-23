import React from 'react';
import ChatGPT from '@/components/chat/ChatGpt';

export async function generateMetadata() {
  return {
    title: 'ChatGPT Clone | By Marcos Cámara',
    description: 'An AI chat similar to ChatGPT developed with Next.js, TailwindCSS and MongoDB by Marcos Cámara',
  };
}

export default async function Home() {
  return (
    <ChatGPT />
  )
}
