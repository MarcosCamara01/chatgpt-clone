"use client"

import { useSidebar } from '@/hooks/SidebarContext';
import React from 'react'

const SidebarToggle = () => {
    const { sidebarOpen, setSidebarOpen } = useSidebar();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <button
            className={`fixed z-[1] top-[calc(50%-36px)] w-8 h-[72px] hidden lg:flex items-center btn-sidebar ${sidebarOpen ? "left-[265px]" : "left-[5px]"}`}
            onClick={toggleSidebar}
        >
            <div className='flex flex-col items-center w-8 h-8'>
                <div className={`h-4 w-1 rounded-full bg-white transition duration-150 ease ${sidebarOpen ? "btn-close-top" : "btn-open-top"}`}></div>
                <div className={`h-4 w-1 rounded-full bg-white transition duration-150 ease ${sidebarOpen ? "btn-close-bottom" : "btn-open-bottom"}`}></div>
            </div>
            <span className="sr-only">Toggle Sidebar</span>
        </button>
    )
}

export default SidebarToggle
