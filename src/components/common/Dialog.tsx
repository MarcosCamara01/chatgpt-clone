"use client";

import React, { useState, useEffect, useRef, FormEvent, useTransition } from 'react';
import Link from 'next/link';
import {
    GetUserKeyResponse,
    getUserKeyClient,
    saveUserKey,
    updateUserKey
} from '@/libs/userKey/action';
import { Schema } from 'mongoose';
import { toast } from 'sonner';
import { Loader } from './Loader';

const Dialog = ({ id }: { id: Schema.Types.ObjectId | string }) => {
    const [open, setOpen] = useState(false);
    const [existKey, setExistKey] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    let [isPending, startTransition] = useTransition();

    useEffect(() => {
        checkKey()
    }, [])

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

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        if (!existKey) {
            const response = await saveUserKey({
                userKey: String(formData.get("userKey")),
                userId: id
            })

            if (response.status !== 200) {
                console.error(response.message)
                toast.error(response.message)
            } else {
                toast.success("API key saved successfully")
            }
        } else {
            const response = await updateUserKey(id, String(formData.get("userKey")))
            if (response.status !== 200) {
                console.error(response.message)
                toast.error(response.message)
            } else {
                toast.success("API key updated successfully")
            }
        }
    };

    const checkKey = async () => {
        const stringResponse = await getUserKeyClient(id);
        const response: GetUserKeyResponse = JSON.parse(stringResponse);

        if (response.status !== 200) {
            console.error("Error when checking if there is a saved user API key", response.message)
            setExistKey(false)
        } else if (response.status === 200 && response.userKey) {
            setExistKey(true)
        } else {
            setExistKey(false)
        }
    }

    return (
        <>
            <button
                className='w-full text-left py-1.5 px-3.5 '
                onClick={() => setOpen(!open)}
            >
                <span className="text-[13px] transition-opacity capitalize duration-150 ease-in-out delay-100">
                    Add your API key
                </span>
            </button>

            {open && (
                <div
                    className='fixed top-0 left-0 flex items-center justify-center w-full h-full backdrop-blur-md'
                >
                    <div
                        ref={ref}
                        className='px-6 py-10 w-full max-w-[400px] flex flex-col justify-between 
                        items-center gap-7 bg-[#202123] rounded text-white'
                    >
                        <h1 className="w-full text-2xl font-bold capitalize">
                            {existKey ? "Update" : "Save"} your API key
                        </h1>

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

                        <form
                            onSubmit={(event) => {
                                startTransition(() => handleSubmit(event));
                            }}
                            className='flex flex-col w-full gap-3'
                        >
                            <input
                                type="text"
                                placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                name="userKey"
                                className="w-full h-8 border border-solid border-[#4D4D4F] py-1 px-2.5 rounded bg-[#2A2B32] text-xs focus:outline-none focus:border-[#4D4D4F]"
                            />

                            <button
                                className="w-full bg-[#2A2B32] border border-solid border-[#4D4D4F] py-1.5 rounded
                                transition duration-150 ease hover:bg-[#202123] text-sm"
                            >
                                {isPending
                                ? <Loader height={20} width={20} />
                                : "Submit key"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dialog;
