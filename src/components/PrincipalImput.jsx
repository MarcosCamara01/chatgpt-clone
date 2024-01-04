import React from 'react';
import { BiSolidSend } from 'react-icons/bi';

export const PrincipalImput = ({ handleFormSubmit, textareaRef, input, handleInputChange }) => {
    return (
        <form 
        className='w-[90%] max-w-3xl flex flex-row pb-[52px]'
        onSubmit={handleFormSubmit}
        >
            <div className='w-full flex flex-col items-stretch justify-center h-full relative'>
                <div className='w-full py-4 pl-4 rounded-xl	flex flex-col bg-[#3E3F4B] custom-shadow'>
                    <textarea
                        className='max-h-[180px] h-[24px] overflow-y-auto pr-16 resize-none	w-full text-white text-[15px] leading-6 placeholder:text-[#8e8ea0] focus:outline-none bg-transparent'
                        ref={textareaRef}
                        placeholder='Send a message'
                        name='message'
                        id='message'
                        value={input}
                        onChange={handleInputChange}
                    ></textarea>
                    <button
                        className='flex items-center justify-center text-[#ECECF1] p-2	absolute right-3 bottom-3 rounded-md'
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
    )
}
