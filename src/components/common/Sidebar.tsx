"use client"

import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import { FiSidebar } from 'react-icons/fi';
import { VscGithub } from "react-icons/vsc";
import { LuMessageSquare } from 'react-icons/lu';
import { useSidebar } from '../../hooks/SidebarContext';
import Link from 'next/link';
import { getHeading } from '../../helpers/clientFunc';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { PersonalButton } from '../auth/PersonalButton';
import { Session } from 'next-auth';
import { IChat } from '@/models/Chat';

interface SidebarProps {
    isMobile: boolean;
    session: Session | null;
    stringResponse: string;
}

const Sidebar = ({ isMobile, session, stringResponse }: SidebarProps) => {
    const { sidebarOpen, setSidebarOpen } = useSidebar();
    const router = useRouter();
    const pathname = usePathname();
    let currentHeading: string | null = null;
    const chats: IChat[] = JSON.parse(stringResponse);

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
                    <button onClick={handleNewChatClick} className="w-full gap-3 text-[13px] text-white p-3	flex items-center border border-solid border-[#4D4D4F] rounded-md transition duration-100 ease hover:bg-[#2A2B32]">
                        <IoMdAdd className='text-base' />
                        <span className='text-[13px] h-[18px]'>New chat</span>
                    </button>
                    {
                        isMobile ?
                            <button className="p-3 flex items-center border border-solid border-[#4D4D4F] rounded-md transition duration-100 ease hover:bg-[#2A2B32]" onClick={toggleSidebar}>
                                <FiSidebar className='text-base text-white' />
                            </button>
                            : ""
                    }
                </div>
                <nav className={`${isMobile ? 'w-full' : 'max-w-[252px]'} overflow-y-auto mr-[-0.5rem] nav-height pr-[10px] pb-[10px] nav-scroll`}>
                    <ul>
                        {chats.map((chat: IChat) => {
                            const heading = getHeading(chat.date);

                            const showHeading = heading !== currentHeading;
                            if (showHeading) {
                                currentHeading = heading;
                            }

                            if (chat.title) {
                                return (
                                    <React.Fragment key={chat._id.toString()}>
                                        {showHeading && <h3 className='text-xs pt-3 px-3 pb-2 text-[#8e8ea0] font-medium'>{heading}</h3>}
                                        <li>
                                            <Link
                                                className='text-[#ECECF1] p-3 flex gap-3 rounded-md items-center hover:bg-[#2A2B32]'
                                                href={`/chats/${chat._id}`}
                                                onClick={toggleMobile}
                                            >
                                                <LuMessageSquare className='text-lg	min-w-[18px] min-h-[18px]' />
                                                <div className='relative w-full overflow-hidden text-[13px] break-all max-h-5'>
                                                    {chat.title}
                                                    <div className="absolute top-0 bottom-0 right-0 w-8 link-effect"></div>
                                                </div>
                                            </Link>
                                        </li>
                                    </React.Fragment>
                                );
                            }
                        })}
                    </ul>
                </nav>
                <div className="py-2 border-t border-solid border-[#4D4D4F]">
                    <a
                        href="https://github.com/MarcosCamara01/chatgpt-clone"
                        target="_blank"
                        className="gap-3 text-[13px] text-white p-3 flex items-center justify-between
                     rounded-md transition duration-100 ease hover:bg-[#2A2B32]">
                        <div>
                            <span>App repository</span>
                        </div>
                        <VscGithub className='text-xl w-[20px]' />
                    </a>
                    {
                        session?.user
                            ? <PersonalButton session={session} />
                            : <Link
                                className="gap-3 w-full	text-white p-3 flex items-center justify-between
                                rounded-md transition duration-100 ease hover:bg-[#2A2B32]"
                                href="/login"
                            >
                                <span className="text-[13px] transition-opacity duration-150 ease-in-out delay-100">
                                    Login
                                </span>

                                <svg
                                    data-testid="geist-icon"
                                    height="16"
                                    strokeLinejoin="round"
                                    viewBox="0 0 16 16"
                                    width="16"
                                    style={{ color: 'currentColor' }}
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M5.75 0C3.95507 0 2.5 1.45507 2.5 3.25V3.75C2.5 5.54493 3.95507 7 5.75 7H6.25C8.04493 7 9.5 5.54493 9.5 3.75V3.25C9.5 1.45507 8.04493 0 6.25 0H5.75ZM4 3.25C4 2.2835 4.7835 1.5 5.75 1.5H6.25C7.2165 1.5 8 2.2835 8 3.25V3.75C8 4.7165 7.2165 5.5 6.25 5.5H5.75C4.7835 5.5 4 4.7165 4 3.75V3.25ZM15.8107 5.75L15.2803 6.28033L12.5303 9.03033C12.2374 9.32322 11.7626 9.32322 11.4697 9.03033L10.4697 8.03033L9.93934 7.5L11 6.43934L11.5303 6.96967L12 7.43934L14.2197 5.21967L14.75 4.68934L15.8107 5.75ZM1.5 13.1709V14.5H10.5V13.1709C9.68042 11.5377 8.00692 10.5 6.17055 10.5H5.82945C3.99308 10.5 2.31958 11.5377 1.5 13.1709ZM0.0690305 12.6857C1.10604 10.4388 3.35483 9 5.82945 9H6.17055C8.64517 9 10.894 10.4388 11.931 12.6857L12 12.8353V13V15.25V16H11.25H0.75H0V15.25V13V12.8353L0.0690305 12.6857Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </Link>
                    }
                </div>
            </div>
            {
                isMobile ?
                    <button className={`fixed top-2.5 left-2.5 bg-[#343541] rounded-md p-3.5 flex items-center justify-center z-50 transition-opacity duration-150 ease hover:bg-[#2A2B32] ${!sidebarOpen ? "opacity-100" : "opacity-0"}`} onClick={toggleSidebar}>
                        <FiSidebar className='text-base text-white' />
                    </button>
                    :
                    <button
                        className={`fixed z-[1] top-[43%] w-8 h-[72px] flex items-center btn-sidebar ${sidebarOpen ? "left-[265px]" : "left-[5px]"}`}
                        onClick={toggleSidebar}
                    >
                        <div className='flex flex-col items-center w-8 h-8'>
                            <div className={`h-4 w-1 rounded-full bg-white transition duration-150 ease ${sidebarOpen ? "btn-close-top" : "btn-open-top"}`}></div>
                            <div className={`h-4 w-1 rounded-full bg-white transition duration-150 ease ${sidebarOpen ? "btn-close-bottom" : "btn-open-bottom"}`}></div>
                        </div>
                    </button>
            }
        </>
    );
};

export default Sidebar;