"use client"

import { useSidebar } from '@/hooks/SidebarContext';
import React from 'react'
import SidebarToggle from './sidebar-toggle';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    const { sidebarOpen } = useSidebar();

    return (
        <>
            <div className={`h-full bg-[#202123] hidden p-2 z-10 fixed lg:flex flex-col transition-all w-[260px] ${sidebarOpen ? '' : 'translate-x-[-100%] overflow-hidden'}`}>
                {children}
            </div>
            <SidebarToggle />
        </>
    )
}

export default Sidebar
