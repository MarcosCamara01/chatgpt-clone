"use client";

import React, { useState } from 'react';
import { saveKey } from '../helpers/saveKey';
import Link from 'next/link';

const NewKey = ({ userId }: { userId: string }) => {
    const [apiKey, setApiKey] = useState<string>("");

    const handleUpdate = async (e: React.SyntheticEvent<EventTarget>) => {
        try {
            const response = await saveKey(apiKey, userId);
            if (response) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='absolute top-0 right-0 z-20 flex items-center justify-center w-full h-screen px-4 backdrop-blur-md'>
            <div className='p-6 xs:p-10	w-full max-w-[400px] flex flex-col justify-between 
                items-center gap-7 bg-[#202123] rounded text-white'>
                <h1 className="w-full text-2xl font-bold text-center">Add your API Key</h1>

                <div className='flex flex-col w-full gap-3'>
                    <p className='text-sm'>
                        You need to add your OpenAI API key to continue using this application.
                        You can get your API Key
                        <Link
                            href="https://platform.openai.com/api-keys"
                            className='font-bold'
                        > here.</Link>
                    </p>
                    <p className='text-sm'>
                        It will be stored securely and no one will be able to access it.
                    </p>
                </div>

                <div className='flex flex-col w-full gap-3'>
                    <input
                        type="text"
                        placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        className="w-full h-8 border border-solid border-[#4D4D4F] py-1 px-2.5 rounded bg-[#2A2B32]
                     text-[13px] focus:outline-none focus:border-[#4D4D4F]"
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
    )
}

export default NewKey
