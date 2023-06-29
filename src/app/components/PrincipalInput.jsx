"use client"

import React, { useRef, useEffect } from 'react';
import './principalInput.css';
import { BiSolidSend } from 'react-icons/bi';
import { useChat } from "ai/react";

export const PrincipalInput = () => {
    const textareaRef = useRef(null);
    const { messages, input, handleInputChange, handleSubmit } = useChat();

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = '24px';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [input]);

    useEffect(() => {
        
    }, [messages])

    return (
        <div className='principal-input'>
            <form onSubmit={handleSubmit}>
                <div className='form-firstbx'>
                    <div className='form-secondbx'>
                        <textarea
                            ref={textareaRef}
                            placeholder='Send a message'
                            name='message'
                            id='message'
                            value={input}
                            onChange={handleInputChange}
                        ></textarea>
                        <button
                            style={{
                                backgroundColor: input ? 'rgb(25, 195, 125)' : '',
                                opacity: input ? 1 : 0.4,
                                color: input ? '#fff' : '',
                            }}
                        >
                            <BiSolidSend />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};