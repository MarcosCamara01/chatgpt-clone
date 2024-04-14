import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { FiSidebar } from 'react-icons/fi'
import ChatHistory from './chat-history'
import SidebarConfig from './sidebar-config'
import NewChat from './new-chat'

const SidebarMobile = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className='fixed top-2.5 left-2.5 bg-[#343541] rounded-md p-3.5 flex items-center justify-center z-50 transition-opacity duration-150 ease hover:bg-[#2A2B32] lg:hidden'>
                    <FiSidebar className='text-base text-white' />
                </button>
            </SheetTrigger>
            <SheetContent
                side="left"
                className="inset-y-0 flex h-auto w-[300px] gap-0 bg-[#202123] p-2 flex-col border-0"
            >
                <div className='p-4'>
                    <h4 className='text-sm text-white'>
                        Chat History
                    </h4>
                </div>
                <NewChat />
                <ChatHistory />
                <SidebarConfig />
            </SheetContent>
        </Sheet>
    )
}

export default SidebarMobile
