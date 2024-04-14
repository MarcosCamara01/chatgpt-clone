import React from 'react'
import ChatHistory from './chat-history'
import Sidebar from './sidebar'
import SidebarConfig from './sidebar-config'
import NewChat from './new-chat'

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
