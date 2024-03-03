"use client"

import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { FiSettings, FiSidebar } from 'react-icons/fi';
import { LuMessageSquare } from 'react-icons/lu';
import { useChatContext } from '../hooks/ChatContext';
import { useSidebar } from '../hooks/SidebarContext';
import Link from 'next/link';
import { Loader } from '../helpers/Loader';
import { fetchChats } from '../helpers/serverFunc';
import { getHeading } from '../helpers/clientFunc';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export const Sidebar = ({ isMobile }) => {
    const { chats, setChats } = useChatContext();
    const { sidebarOpen, setSidebarOpen } = useSidebar();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    let currentHeading = null;

    useEffect(() => {
        getChats();
    }, []);

    async function getChats() {
        const data = await fetchChats();
        if (data) {
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setChats(data);
            setIsLoading(false);
        }
    }

    const handleNewChatClick = () => {
        handleClick();
        toggleMobile();
    };

    const toggleMobile = () => {
        if (isMobile) {
            toggleSidebar();
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleClick = () => {
        if (pathname === '/') {
            window.location.reload();
        } else {
            router.push('/');
        }
    };

    return (
        <>
            <div className={`h-full bg-[#202123] p-2 z-10 fixed ${sidebarOpen ? 'sidebar-open' : 'sidebar-close'} ${isMobile && sidebarOpen ? 'mobile' : ''}`}>
                <div className="flex items-center justify-between gap-2.5 mb-1">
                    <button onClick={handleNewChatClick} className="w-full gap-3 text-sm text-white p-3	flex items-center border border-solid border-[#4D4D4F] rounded-md transition duration-100 ease hover:bg-[#2A2B32]">
                        <IoMdAdd className='text-base' />
                        <span className='text-sm h-[18px]'>New chat</span>
                    </button>
                    <button className="p-3 flex items-center border border-solid border-[#4D4D4F] rounded-md transition duration-100 ease hover:bg-[#2A2B32]" onClick={toggleSidebar}>
                        <FiSidebar className='text-base text-white' />
                    </button>
                </div>
                <nav className={`${isMobile ? 'w-full' : 'max-w-[252px]'} overflow-y-auto mr-[-0.5rem] h-[85vh] pr-[10px] pb-[10px] nav-scroll`}>
                    {isLoading ? (
                        <div className="relative spinner-center h-[28px]">
                            <Loader />
                        </div>
                    ) : (
                        <ul>
                            {chats.map((chat) => {
                                const heading = getHeading(chat.date);

                                const showHeading = heading !== currentHeading;
                                if (showHeading) {
                                    currentHeading = heading;
                                }

                                if (chat.title) {
                                    return (
                                        <React.Fragment key={chat._id}>
                                            {showHeading && <h3 className='text-xs pt-3 px-3 pb-2 text-[#8e8ea0] font-medium'>{heading}</h3>}
                                            <li>
                                                <Link
                                                    className='text-[#ECECF1] p-3 flex gap-3 rounded-md items-center hover:bg-[#2A2B32]'
                                                    href={`/chats/${chat._id}`}
                                                    onClick={toggleMobile}
                                                >
                                                    <LuMessageSquare className='text-lg	min-w-[18px] min-h-[18px]' />
                                                    <div className='relative w-full overflow-hidden text-sm break-all max-h-5'>
                                                        {chat.title}
                                                        <div className="absolute top-0 bottom-0 right-0 z-10 w-8 link-effect"></div>
                                                    </div>
                                                </Link>
                                            </li>
                                        </React.Fragment>
                                    );
                                }
                            })}
                        </ul>
                    )}
                </nav>
                <div className="py-2 border-t border-solid border-[#4D4D4F]">
                    <a href="https://portfoliomarcos.com/" target="_blank" className="gap-3	text-sm	text-white p-3 flex items-center justify-between rounded-md transition duration-100 ease hover:bg-[#2A2B32]">
                        <div>
                            <span>My portfolio</span>
                        </div>
                        <FiSettings className='text-base' />
                    </a>
                </div>
            </div>

            <button className={`fixed top-2.5 left-2.5 bg-[#343541] rounded-md p-3.5 flex items-center justify-center z-50 transition-opacity duration-150 ease hover:bg-[#2A2B32] ${!sidebarOpen ? "opacity-100" : "opacity-0"}`} onClick={toggleSidebar}>
                <FiSidebar className='text-base text-white' />
            </button>
        </>
    );
};
