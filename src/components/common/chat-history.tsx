import { getChats } from '@/app/actions';
import { getHeading } from '@/helpers/getHeading';
import { IChat } from '@/models/Chat';
import Link from 'next/link';
import React from 'react'
import { LuMessageSquare } from 'react-icons/lu';
import { toast } from 'sonner';

const ChatHistory = async () => {
    let currentHeading: string | null = null;
    const chats = await getChats();

    if (chats.status !== 200 || chats.chat === null) {
        toast.error(chats.message)
        return <p>{chats.message}</p>
    }

    return (
        <nav className='overflow-y-auto mr-[-0.5rem] h-[calc(100vh-169px)] pr-[10px] pb-[10px] nav-scroll'>
            <ul>
                {chats.chat.map((chat: IChat) => {
                    const heading = getHeading(chat.date);

                    const showHeading = heading !== currentHeading;
                    if (showHeading) {
                        currentHeading = heading;
                    }

                    if (chat.title) {
                        return (
                            <React.Fragment key={chat._id.toString()}>
                                {
                                    showHeading &&
                                    <h3 className='text-xs pt-3 px-3 pb-2 text-[#8e8ea0] font-medium'>
                                        {heading}
                                    </h3>
                                }
                                <li>
                                    <Link
                                        className='text-[#ECECF1] p-3 flex gap-3 rounded-md items-center hover:bg-[#2A2B32]'
                                        href={`/chats/${chat._id}`}
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
    )
}

export default ChatHistory
