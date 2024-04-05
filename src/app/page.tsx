import React from 'react';
import { isMobileDevice } from '../libs/responsive';
import ChatGPT from '../components/chat/ChatGpt';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../libs/auth";
import { Session } from "next-auth";
import axios from 'axios';
import NewKey from '../components/auth/NewKey';

export async function generateMetadata() {
  return {
    title: 'ChatGPT Clone | By Marcos Cámara',
    description: 'An AI chat similar to ChatGPT developed with Next.js, TailwindCSS and MongoDB by Marcos Cámara',
  };
}

export default async function Home() {
  const isMobile = await isMobileDevice();
  const session: Session = await getServerSession(authOptions);
  let userKey;

  if (session?.user) {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/key?userId=${session.user._id}`
    );

    userKey = response.data;
  }

  return (
    <>
      <ChatGPT
        isMobile={isMobile}
        userKey={userKey?.apiKey}
        session={session}
      />

      {
        session?.user ? userKey ? "" : <NewKey userId={session.user._id} />
          : ""
      }
    </>
  )
}
