import React from 'react'
import { VscGithub } from 'react-icons/vsc';
import Link from 'next/link';
import Dialog from './Dialog';

const SidebarConfig = async () => {
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
            <Dialog />
        </div>
    )
}

export default SidebarConfig
