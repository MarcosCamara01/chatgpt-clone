import { Session } from 'next-auth';
import React, { useCallback } from 'react';
import { toast } from 'sonner';
import { ChatRequestOptions } from 'ai';
import { Loader } from '../common/Loader';
import Textarea from 'react-textarea-autosize'

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
    }, [handleSubmit, userKey, session?.user]);

    return (
        <>
            <form
                className='w-[90%] max-w-3xl flex flex-row pb-[52px]'
                onSubmit={handleSubmitWithCheck}
            >
                <div className='relative flex flex-col items-stretch justify-center w-full h-full'>
                    <div className='w-full min-h-[52px] px-4 rounded-xl bg-[#3E3F4B] custom-shadow flex items-end justify-center gap-3'>
                        <Textarea
                            className='min-h-[24px] p-4 max-h-[180px] h-full w-full resize-none text-white text-sm font-normal placeholder:text-[#8e8ea0] focus:outline-none bg-transparent'
                            placeholder='Send a message'
                            name='message'
                            id='message'
                            autoComplete="off"
                            rows={1}
                            tabIndex={0}
                            autoCorrect="off"
                            value={input}
                            onChange={handleInputChange}
                        />

                        <div className='flex items-center h-[52px] justify-center'>
                            <button
                                className='text-[#ECECF1] p-2 rounded-md'
                                style={{
                                    backgroundColor: input ? 'rgb(25, 195, 125)' : '',
                                    opacity: input ? 1 : 0.4,
                                    color: input ? '#fff' : '',
                                }}
                                type={isLoading ? "button" : "submit"}
                            >

                                {isLoading
                                    ? <Loader height={20} width={20} />
                                    : 
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path>
                                    </svg>
                                }
                                <span className="sr-only">Send Message</span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
