"use client";

import { Messages } from "./Messages";
import { Header } from "../common/Header";
import { useSidebar } from '../../hooks/SidebarContext';
import { IChat } from "@/models/Chat";

interface SingleChat {
    isMobile: boolean;
    stringChat: string;
}

const SingleChat = ({ isMobile, stringChat }: SingleChat) => {
    const { sidebarOpen } = useSidebar();
    const chat: IChat = JSON.parse(stringChat);

    return (
        <div className={`absolute top-0 right-0 ${sidebarOpen && !isMobile ? "small" : "big"}`}>
            <Header
                sidebarOpen={sidebarOpen}
                isMobile={isMobile}
            />

            <Messages
                messages={chat.messages}
            />
            
            <div className='h-[100px] bg-[#343541]' />
        </div>
    );
}

export default SingleChat;
