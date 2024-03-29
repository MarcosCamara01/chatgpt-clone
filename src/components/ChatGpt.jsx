"use client"

import React, { useEffect, useState } from 'react';
import { useChat } from "ai/react";
import { FirstScreen } from './FirstScreen';
import { Messages } from "./Messages";
import { PrincipalImput } from "./PrincipalImput";
import { Header } from './Header';
import { useSidebar } from '../hooks/SidebarContext';
import { useChatContext } from '../hooks/ChatContext';
import { fetchRequest } from '../helpers/fetchRequest';
import { toast } from 'sonner'

const ChatGPT = ({ isMobile, userKey, session }) => {
    const [chatId, setChatId] = useState(null);
    const { sidebarOpen } = useSidebar();
    const { chats, setChats } = useChatContext();
    const { messages, input, setInput, handleInputChange, handleSubmit } = useChat({
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

            try {
                if (chatId) {
                    const updatedMessages = [...messages, ...allMessages];

                    const dataToSave = {
                        title: messages[0].content,
                        date: messages[0].createdAt,
                        messages: updatedMessages,
                    };

                    const url = `/api/messages?id=${chatId}`;

                    const responseData = await fetchRequest(url, 'PUT', dataToSave);

                    if (responseData) {
                        const updatedChats = chats.map((chat) => {
                            if (chat._id === responseData._id) {
                                return { ...chat, messages: dataToSave.messages };
                            }
                            return chat;
                        });

                        setChats(updatedChats);
                        console.log('Messages updated successfully!');
                    }
                } else {
                    const dataToSave = {
                        title: allMessages[0].content,
                        date: allMessages[0].createdAt,
                        messages: allMessages,
                    };

                    const url = '/api/messages';

                    const responseData = await fetchRequest(url, 'POST', dataToSave);
                    if (responseData) {
                        const updatedChat = { ...dataToSave, _id: responseData._id };
                        setChatId(responseData._id);
                        setChats((prevChats) => [updatedChat, ...prevChats]);
                        console.log('Messages saved successfully!');
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
    });

    const handleInputButtonClick = (content) => {
        setInput(content);
    };

    return (
        <>
            <div className={`h-screen absolute right-0 top-0 ${sidebarOpen && !isMobile ? "small" : "big"}`}>
                {messages.length > 0 ? (
                    <>
                        <Header
                            sidebarOpen={sidebarOpen}
                            isMobile={isMobile}
                        />
                        <Messages
                            messages={messages}
                        />
                    </>
                ) : (
                    <FirstScreen
                        onButtonClick={handleInputButtonClick}
                    />
                )}

                <div className='h-48 bg-[#343541]'></div>

                <div className={`fixed right-0 bottom-0 pt-2 pl-2 flex flex-col items-center justify-center principal-input
                     ${sidebarOpen && !isMobile ? "small" : "big"}`}>
                    <PrincipalImput
                        handleSubmit={handleSubmit}
                        input={input}
                        handleInputChange={handleInputChange}
                        userKey={userKey}
                        session={session}
                    />
                </div>
            </div>
        </>
    )
}

export default ChatGPT;