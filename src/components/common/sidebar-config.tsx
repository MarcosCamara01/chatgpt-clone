import React from 'react'
import { PersonalButton } from '../auth/PersonalButton'
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth';
import { VscGithub } from 'react-icons/vsc';
import Link from 'next/link';

const SidebarConfig = async () => {
    const session: Session | null = await getServerSession(authOptions);

    return (
        <div className="py-2 border-t border-solid border-[#4D4D4F]">
            <Link
                href="https://github.com/MarcosCamara01/chatgpt-clone"
                target="_blank"
                className="gap-3 text-[13px] text-white p-3 flex items-center justify-between
                     rounded-md transition duration-100 ease hover:bg-[#2A2B32]">
                <div>
                    <span>App repository</span>
                </div>
                <VscGithub className='text-xl w-[20px]' />
            </Link>
            {
                session?.user
                    ? <PersonalButton session={session} />
                    : <Link
                        className="gap-3 w-full	text-white p-3 flex items-center justify-between rounded-md transition duration-100 ease hover:bg-[#2A2B32]"
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
    )
}

export default SidebarConfig