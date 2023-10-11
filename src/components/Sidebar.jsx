"use client"

import React, { useEffect, useState } from 'react';
import '../styles/css/sidebar.css'
import { IoMdAdd } from 'react-icons/io';
import { FiSettings, FiSidebar } from 'react-icons/fi';
import { LuMessageSquare } from 'react-icons/lu';
import { useChatContext } from '../hooks/ChatContext';
import { useSidebar } from '../hooks/SidebarContext';
import Link from 'next/link';
import { Loader } from '../helpers/Loader';
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

export const Sidebar = () => {
    const { chats, setChats } = useChatContext();
    const { isSidebarOpen, setSidebarOpen, isMobile } = useSidebar();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        fetchChats();
    }, []);

    async function fetchChats() {
        try {
            const response = await fetch('/api/messages');
            const data = await response.json();
            setChats(data);
        } catch (error) {
            console.error('Failed to fetch chats.', error);
        }
        setIsLoading(false)
    }

    let currentHeading = null;

    const handleClick = () => {
        if (pathname === '/') {
            window.location.reload();
        } else {
            router.push('/');
        }
    };


    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const toggleMobile = () => {
        if (isMobile) {
            toggleSidebar()
        }
    }

    const handleNewChatClick = () => {
        handleClick();
        toggleMobile();
    };

    const getHeading = (chatDate) => {
        const timeDifference = new Date() - new Date(chatDate);
        if (timeDifference <= 24 * 60 * 60 * 1000) {
            return 'Today';
        } else if (timeDifference <= 7 * 24 * 60 * 60 * 1000) {
            return 'Previous 7 Days';
        } else if (timeDifference <= 30 * 24 * 60 * 60 * 1000) {
            return 'Previous 30 Days';
        }
    };

    return (
        <>
            <div className={`nav-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-close'} ${isMobile && isSidebarOpen ? "mobile" : ""}`}>
                <div className="sidebar_top">
                    <button onClick={handleNewChatClick} className='sidebar-link top-component button'>
                        <IoMdAdd />
                        <span>New chat</span>
                    </button>
                    <button className='top-component button' onClick={toggleSidebar}>
                        <FiSidebar />
                    </button>
                </div>
                <nav>
                    {isLoading ? (
                        <Loader />
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
                                            {showHeading && <h3>{heading}</h3>}
                                            <li>
                                                <Link href={`/chats/${chat._id}`} onClick={toggleMobile}>
                                                    <LuMessageSquare />
                                                    <div>
                                                        {chat.title}
                                                        <div className='link-effect'></div>
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
                <div className="sidebar_bottom">
                    <a href='https://portfoliomarcos.com/' target='_blank' className='sidebar-link bottom-component button'>
                        <div className="left-bottom">
                            <span>My portfolio</span>
                        </div>
                        <FiSettings />
                    </a>
                </div>
            </div>

            {!isSidebarOpen && (
                <button className='sidebarclose-btn' onClick={toggleSidebar}>
                    <FiSidebar />
                </button>
            )}
        </>
    )
}