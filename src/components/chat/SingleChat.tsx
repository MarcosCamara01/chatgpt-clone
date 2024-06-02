"use client";

import { Messages } from "./Messages";
import { Header } from "../common/Header";
import { useSidebar } from "../../hooks/SidebarContext";
import { IChat } from "@/models/Chat";

const SingleChat = ({ stringChat }: { stringChat: string }) => {
  const { sidebarOpen } = useSidebar();
  const chat: IChat = JSON.parse(stringChat);

  return (
    <div
      className={`lg:absolute top-0 right-0 transition-all ${sidebarOpen ? "lg:w-[calc(100%-260px)]" : "lg:w-full"}`}
    >
      <Header sidebarOpen={sidebarOpen} />

      <Messages messages={chat.messages} />

      <div className="h-[100px] bg-[#343541]" />
    </div>
  );
};

export default SingleChat;
