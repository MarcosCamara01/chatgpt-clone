import React from 'react';
import { isMobileDevice } from '../libs/responsive';
import ChatGPT from '../components/ChatGpt';
import CheckKey from '../components/CheckKey';

export default async function Home() {
  const isMobile = await isMobileDevice();

  return (
    <>
      <ChatGPT isMobile={isMobile} />
      <CheckKey />
    </>
  )
}
