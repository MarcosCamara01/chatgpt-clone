import { Session } from 'next-auth';
import React, { useCallback } from 'react';
import { BiSolidSend } from 'react-icons/bi';
import { toast } from 'sonner';
import { ChatRequestOptions } from 'ai';
import { Loader } from '../common/Loader';

interface PrincipalImput {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
    userKey: string | undefined;
    session: Session | null;
    isLoading: boolean;
}

export const PrincipalImput = ({
    handleSubmit,
    input,
    handleInputChange,
    userKey,
    session,
    isLoading
}: PrincipalImput) => {
    const handleSubmitWithCheck = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (session?.user) {
            if (userKey) {
                handleSubmit(event);
            } else {
                toast.error("You have to add an API key to do this.");
            }
        } else {
            toast.error("You must be registered to do this.");
        }
    }, [handleSubmit, userKey]);

    return (
        <>
            <form
                className='w-[90%] max-w-3xl flex flex-row pb-[52px]'
                onSubmit={handleSubmitWithCheck}
            >
                <div className='relative flex flex-col items-stretch justify-center w-full h-full'>
                    <div className='w-full h-14 px-4 rounded-xl bg-[#3E3F4B] custom-shadow flex items-center justify-center'>
                        <textarea
                            className='max-h-[180px] h-[24px] overflow-y-auto pr-16 resize-none w-full text-white text-[15px] leading-6 placeholder:text-[#8e8ea0] focus:outline-none bg-transparent'
                            placeholder='Send a message'
                            name='message'
                            id='message'
                            value={input}
                            onChange={handleInputChange}
                        />
                        <button
                            className='flex items-center justify-center text-[#ECECF1] p-2 rounded-md'
                            style={{
                                backgroundColor: input ? 'rgb(25, 195, 125)' : '',
                                opacity: input ? 1 : 0.4,
                                color: input ? '#fff' : '',
                            }}
                            type={isLoading ? "button" : "submit"}
                        >
                            {isLoading
                                ? <Loader height={20} width={20} />
                                : <BiSolidSend className='text-xl' />}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};
