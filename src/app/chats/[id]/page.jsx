"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Messages } from "../../../components/Messages";
import { Header } from "../../../components/Header";
import { useSidebar } from '../../../helpers/SidebarContext';
import { useChatContext } from '../../../helpers/ChatContext';
import '../../../styles/css/chatgpt.css';

const Chat = () => {
    const { chats } = useChatContext();
    const { isSidebarOpen, isMobile } = useSidebar();
    const [chat, setChat] = useState({
        title: '',
        date: "",
        messages: [],
    });

    const params = useParams();

    useEffect(() => {
        const fetchChat = async () => {
            const chatData = await chats;
            const foundChat = chatData.find(chat => chat._id === params.id);
            if (foundChat) {
                setChat(foundChat);
            } else {
                console.error('Chat not found.');
            }
        };

        fetchChat();
    }, [params.id]);

    return (
        <div className={isSidebarOpen && !isMobile ? "chat-gpt" : "chat-gpt big"}>
            <>
                <Header
                    isSidebarOpen={isSidebarOpen}
                    isMobile={isMobile}
                />
                <Messages
                    messages={chat.messages}
                />

                <div className='bx-separator bx-dark'></div>
            </>
        </div>
    );
};

export default Chat;