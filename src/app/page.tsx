import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../libs/auth";
import { Session } from "next-auth";
import { isMobileDevice } from '../libs/responsive';
import ChatGPT from '../components/ChatGpt';
import { redirect } from 'next/navigation';
import CheckKey from '../components/CheckKey';

export default async function Home() {
  const session: Session | null = await getServerSession(authOptions);
  const isMobile = isMobileDevice();

  if (session) {
    return (
      <>
        <ChatGPT isMobile={isMobile} />
        <CheckKey />
      </>
    )
  } else {
    redirect('/login');
  }
}
