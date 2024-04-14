import React from 'react';
import ChatGPT from '@/components/chat/ChatGpt';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Session } from "next-auth";
import { getUserKey, GetUserKeyResponse } from '@/libs/userKey/action';

export async function generateMetadata() {
  return {
    title: 'ChatGPT Clone | By Marcos Cámara',
    description: 'An AI chat similar to ChatGPT developed with Next.js, TailwindCSS and MongoDB by Marcos Cámara',
  };
}

export default async function Home() {
  const session: Session | null = await getServerSession(authOptions);
  const userKeyResponse: GetUserKeyResponse = await getUserKey(session?.user._id)

  return (
    <ChatGPT
      userKey={userKeyResponse.userKey?.userKey}
      session={session}
    />
  )
}
