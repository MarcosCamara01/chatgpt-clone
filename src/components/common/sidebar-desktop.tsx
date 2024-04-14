import React from 'react'
import ChatHistory from './chat-history'
import SidebarConfig from './sidebar-config'
import NewChat from './new-chat'
import Sidebar from './sidebar'

const SidebarDesktop = async() => {
    return (
        <Sidebar>
            <NewChat />
            <ChatHistory />
            <SidebarConfig />
        </Sidebar>
    )
}

export default SidebarDesktop
