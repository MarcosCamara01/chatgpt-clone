"use client";

import React, { useState, useEffect, useRef } from 'react';
import { updateKey } from '../../helpers/keyFunc';
import Link from 'next/link';

const UpdateKey = ({ userId }: { userId: string }) => {
    const [apiKey, setApiKey] = useState<string>("");
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleUpdate = async (e: React.SyntheticEvent<EventTarget>) => {
        try {
            const response = await updateKey(apiKey, userId);
            if (response) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ref.current &&
                !ref.current.contains(event.target as Node)
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
            <div className='py-1.5 px-3.5 text-[13px] transition duration-150 ease hover:bg-[#2A2B32] rounded-b'>
                <button
                    className='w-full text-left'
                    onClick={() => setOpen(!open)}
                >
                    <span className="text-[13px] transition-opacity duration-150 ease-in-out delay-100">
                        Update key
                    </span>
                </button>
            </div>

            {open && (
                <div
                    className='fixed top-0 left-0 flex items-center justify-center w-full h-full backdrop-blur-md'
                >
                    <div
                        ref={ref}
                        className='p-6 xs:p-10 w-full max-w-[400px] flex flex-col justify-between 
                        items-center gap-7 bg-[#202123] rounded text-white'
                    >
                        <h1 className="w-full text-2xl font-bold text-center">Update your API Key</h1>

                        <div className='flex flex-col w-full gap-3 inner-section'>
                            <p className='text-sm'>
                                It will be stored securely and no one will be able to access it.
                                You can get your API Key
                                <Link
                                    href="https://platform.openai.com/api-keys"
                                    className='font-bold'
                                    target='_blank'
                                > here.</Link>
                            </p>
                        </div>

                        <div className='flex flex-col w-full gap-3'>
                            <input
                                type="text"
                                placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                className="w-full h-8 border border-solid border-[#4D4D4F] py-1 px-2.5 rounded bg-[#2A2B32]
                                text-xs focus:outline-none focus:border-[#4D4D4F]"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                            />

                            <button
                                onClick={(e) => handleUpdate(e)}
                                className="w-full bg-[#2A2B32] border border-solid border-[#4D4D4F] py-1.5 rounded
                                transition duration-150 ease hover:bg-[#202123] text-[13px]"
                            >
                                Submit key
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateKey;
