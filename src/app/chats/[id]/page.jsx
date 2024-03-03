"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Messages } from "../../../components/Messages";
import { Header } from "../../../components/Header";
import { useSidebar } from '../../../hooks/SidebarContext';
import { useChatContext } from '../../../hooks/ChatContext';
import { Loader } from "../../../helpers/Loader"

const Chat = () => {
    const { chats } = useChatContext();
    const { sidebarOpen, isMobile } = useSidebar();
    const [chat, setChat] = useState({
        title: '',
        date: "",
        messages: [],
    });
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        const fetchChat = async () => {
            const chatData = await chats;
            const foundChat = chatData.find(chat => chat._id === params.id);
            if (foundChat) {
                setChat(foundChat);
                document.title = foundChat.title;
            } else {
                console.error('Chat not found.');
            }
            setIsLoading(false);
        };

        fetchChat();
    }, [params.id, chats]);

    return (
        <div className={`absolute top-0 right-0 ${sidebarOpen && !isMobile ? "small" : "big"}`}>
            <Header
                sidebarOpen={sidebarOpen}
                isMobile={isMobile}
            />

            {isLoading ? (
                <Loader/>
            ) : (
                <Messages
                    messages={chat.messages}
                />
            )}

            <div className='h-[100px] bg-[#343541]'></div>
        </div>
    );
};

export default Chat;