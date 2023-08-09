import React, { useEffect } from 'react';
import '../assets/css/sidebar.css'
import { IoMdAdd } from 'react-icons/io';
import { FiSettings, FiSidebar } from 'react-icons/fi';
import { LuMessageSquare } from 'react-icons/lu';
import { useChatContext } from '../helpers/ChatContext';

export const Sidebar = ({ isSidebarOpen, setSidebarOpen, isMobile }) => {
    const { chats, setChats } = useChatContext();

    useEffect(() => {
        fetchChats();
    }, []);

    async function fetchChats() {
        try {
            const response = await fetch('/api/save');
            const data = await response.json();
            setChats(data);
        } catch (error) {
            console.error('Failed to fetch chats.', error);
        }
    }

    let currentHeading = null;

    const handleClick = () => {
        window.location.reload();
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
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
                    <a onClick={handleClick} className='sidebar-link top-component button'>
                        <IoMdAdd />
                        <span>New chat</span>
                    </a>
                    <button className='top-component button' onClick={toggleSidebar}>
                        <FiSidebar />
                    </button>
                </div>
                <nav>
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
                                    <ul>
                                        <li><a href="#"><LuMessageSquare /><div>{chat.title} <div className='link-effect'></div> </div></a></li>
                                    </ul>
                                </React.Fragment>
                            );
                        }
                    })}
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