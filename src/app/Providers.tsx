"use client";

import { SessionProvider } from "next-auth/react";
import { ChatProvider } from "../hooks/ChatContext";
import { SidebarProvider } from "../hooks/SidebarContext";

type Props = {
  children?: React.ReactNode;
  initialSidebarState: boolean;
};

export const Providers = ({ children, initialSidebarState }: Props) => {
  return (
    <SessionProvider>
      <ChatProvider>
        <SidebarProvider initialSidebarState={initialSidebarState}>
          {children}
        </SidebarProvider>
      </ChatProvider>
    </SessionProvider>
  );
};