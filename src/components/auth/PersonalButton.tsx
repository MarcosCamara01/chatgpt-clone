"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from 'next/image';
import Dialog from '../common/Dialog';

export function PersonalButton({ session }: { session: Session }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const ButtonRef = useRef<HTMLButtonElement>(null);
    const firstLetter = (session.user.name.charAt(0) || '').toUpperCase();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ref.current &&
                ButtonRef.current &&
                !ref.current.contains(event.target as Node) &&
                !ButtonRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <button
                className="gap-3 w-full	text-white p-3 flex items-center justify-between rounded-md transition duration-100 ease hover:bg-[#2A2B32]"
                onClick={() => setOpen(!open)}
                ref={ButtonRef}
            >
                <span className="text-[13px] transition-opacity duration-150 ease-in-out delay-100">
                    Personal
                </span>

                <div className='bg-white text-black text-xs min-w-[20px] rounded-full h-5 w-5 flex items-center justify-center overflow-hidden'>
                    {session?.user?.image ?
                        <Image
                            src={session?.user?.image}
                            alt={session?.user?.name}
                            width={20}
                            height={20}
                        />
                        : firstLetter}
                </div>
            </button>

            {open && (
                <div
                    ref={ref}
                    className='w-[244px] fixed bottom-[60px] left-2 border border-solid border-[#4D4D4F] rounded bg-[#202123] text-white'
                >
                    <div className='py-1.5 px-3.5'>
                        <div className='text-sm font-medium'>{session?.user.name}</div>
                        <div className='mt-1 text-xs text-[#8e8ea0]'>{session?.user.email}</div>
                    </div>

                    <div className='text-[13px] transition duration-150 ease
                     hover:bg-[#2A2B32] border-y border-solid border-[#4D4D4F]'>
                        <button
                            className='w-full text-left py-1.5 px-3.5'
                            onClick={() => {
                                signOut();
                            }}>
                            Log out
                        </button>
                    </div>
                    <div className='text-[13px] transition duration-150 ease hover:bg-[#2A2B32] rounded-b'>
                        <Dialog />
                    </div>
                </div>
            )}
        </>
    )
}