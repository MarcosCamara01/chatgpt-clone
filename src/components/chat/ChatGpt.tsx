"use client"

import React, { useState } from 'react';
import { useChat } from "ai/react";
import { FirstScreen } from './FirstScreen';
import { Messages } from "./Messages";
import { PrincipalImput } from "./PrincipalImput";
import { Header } from '../common/Header';
import { useSidebar } from '../../hooks/SidebarContext';
import { toast } from 'sonner'
import { Session } from 'next-auth';
import { saveChat, updateChat } from '@/app/actions';
import { Schema } from 'mongoose';

interface Props {
    userKey: string | undefined;
    session: Session | null;
}

const ChatGPT = ({ userKey, session }: Props) => {
    const [chatId, setChatId] = useState<Schema.Types.ObjectId>();
    const { sidebarOpen } = useSidebar();
    const { messages, input, setInput, handleInputChange, handleSubmit, isLoading } = useChat({
        body: {
            userKey: userKey
        },
        onResponse: (res) => {
            if (res.status !== 200) {
                toast.error(res.statusText);
            }
        },
        onFinish: async (message) => {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });

            const allMessages = [
                { role: "user", content: input, createdAt: new Date() },
                { ...message },
            ];

            if (chatId) {
                const updatedMessages = [...messages, ...allMessages];

                const dataToSave = {
                    title: messages[0].content,
                    date: messages[0].createdAt || "",
                    messages: updatedMessages,
                };

                const updatedChat = await updateChat(chatId, dataToSave);

                if (updatedChat.status !== 200) {
                    console.error(updatedChat.message)
                    toast.error(updatedChat.message)
                }
            } else {
                const dataToSave = {
                    title: allMessages[0].content,
                    date: allMessages[0].createdAt,
                    messages: allMessages,
                };

                const chat = await saveChat(dataToSave)

                if (chat.status !== 200) {
                    console.error(chat.message)
                    toast.error(chat.message)
                } else if (chat._id) {
                    setChatId(chat._id)
                }
            }
        },
    });

    return (
        <div className={`h-screen lg:absolute right-0 top-0 transition-all ${sidebarOpen ? "lg:w-[calc(100%-260px)]" : "lg:w-full"}`}>
            {messages.length > 0 ?
                <>
                    <Header
                        sidebarOpen={sidebarOpen}
                    />

                    <Messages
                        messages={messages}
                    />
                </>
                : <FirstScreen setInput={setInput} />
            }

            <div className='h-48 bg-[#343541]' />

            <div className={`fixed w-full right-0 bottom-0 flex flex-col items-center justify-center principal-input transition-all ${sidebarOpen ? "lg:w-[calc(100%-260px)]" : "lg:w-full"}`}>
                <PrincipalImput
                    handleSubmit={handleSubmit}
                    input={input}
                    handleInputChange={handleInputChange}
                    userKey={userKey}
                    session={session}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}

export default ChatGPT;