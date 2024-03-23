import React, { useCallback } from 'react';
import { BiSolidSend } from 'react-icons/bi';
import { toast } from 'sonner';

export const PrincipalImput = ({
    handleSubmit,
    input,
    handleInputChange,
    userKey,
    session
}) => {
    const handleSubmitWithCheck = useCallback((event) => {
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
                    <div className='w-full py-4 pl-4 rounded-xl flex flex-col bg-[#3E3F4B] custom-shadow'>
                        <textarea
                            className='max-h-[180px] h-[24px] overflow-y-auto pr-16 resize-none w-full text-white text-[15px] leading-6 placeholder:text-[#8e8ea0] focus:outline-none bg-transparent'
                            placeholder='Send a message'
                            name='message'
                            id='message'
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' && !event.shiftKey) {
                                    event.preventDefault();
                                    handleSubmit(event);
                                }
                            }}
                        ></textarea>
                        <button
                            className='flex items-center justify-center text-[#ECECF1] p-2 absolute right-3 bottom-3 rounded-md'
                            style={{
                                backgroundColor: input ? 'rgb(25, 195, 125)' : '',
                                opacity: input ? 1 : 0.4,
                                color: input ? '#fff' : '',
                            }}
                        >
                            <BiSolidSend className='text-base' />
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};
