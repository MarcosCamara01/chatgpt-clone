"use client";

import { useState, useEffect } from "react";
import { Messages } from "./Messages";
import { Header } from "../common/Header";
import { useSidebar } from '../../hooks/SidebarContext';
import { useChatContext } from '../../hooks/ChatContext';
import { Loader } from "../../helpers/Loader";

const SingleChat = ({ isMobile, id }) => {
    const { chats } = useChatContext();
    const { sidebarOpen } = useSidebar();
    const [chat, setChat] = useState({
        title: '',
        date: "",
        messages: [],
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchChat = async () => {
            const chatData = await chats;
            const foundChat = chatData.find(chat => chat._id === id);
            if (foundChat) {
                setChat(foundChat);
                document.title = foundChat.title;
            } else {
                console.error('Chat not found.');
            }
            setIsLoading(false);
        };

        fetchChat();
    }, [id, chats]);

    return (
        <div className={`absolute top-0 right-0 ${sidebarOpen && !isMobile ? "small" : "big"}`}>
            <Header
                sidebarOpen={sidebarOpen}
                isMobile={isMobile}
            />

            {isLoading ? (
                <div className="flex items-center justify-center w-full h-screen">
                    <Loader />
                </div>
            ) : (
                <Messages
                    messages={chat.messages}
                />
            )}

            <div className='h-[100px] bg-[#343541]'></div>
        </div>
    );
}

export default SingleChat;
