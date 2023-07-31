"use client"

import React, { useRef, useEffect, useState, useCallback } from 'react';
import '../assets/css/principalInput.css';
import '../assets/css/messages.css';
import { BiSolidSend } from 'react-icons/bi';
import { useChat } from "ai/react";
import { FirstScreen } from './FirstScreen';
import { AiOutlineUser } from 'react-icons/ai';
import { SaveButton } from './SaveButton';
import { GptIcon } from "../helpers/icons";

const ChatGPT = ({ isSidebarOpen }) => {
    const textareaRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const [messagesReady, setMessagesReady] = useState(false);
    const { messages, input, setInput, handleInputChange, handleSubmit } = useChat();

    const handleFormSubmit = useCallback(
        (event) => {
            event.preventDefault();
            handleSubmit(event);
        },
        [handleSubmit]
    );

    const handleInputButtonClick = (content) => {
        setInput(content);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleFormSubmit(event);
            }
        };

        const textarea = textareaRef.current;
        textarea.addEventListener('keydown', handleKeyDown);

        return () => {
            textarea.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleFormSubmit]);

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = '24px';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [input]);

    useEffect(() => {
        if (messages.length > 0) {
            setMessagesReady(true);
        }

        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }

        console.log(messages)
    }, [messages]);

    return (
        <div className='chat-gpt'>
            {messagesReady ? (
                <>
                    {messages.map((message) => {
                        const isChatGPT = message.role !== 'user';
                        const messageContent = message.content.split('\n\n');

                        return (
                            <div key={message.id} className={`bx-group ${isChatGPT ? "bx-clear" : "bx-dark"}`}>
                                <div className='bx-text'>
                                    {isChatGPT ?
                                        <div className='bx-svg'><GptIcon /></div>
                                        :
                                        <div className='bx-svg'><AiOutlineUser /></div>
                                    }
                                    <div className={`messages-bx ${isChatGPT && messageContent.length > 1 ? "message-gpt" : ""}`}>
                                        {messageContent.map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </>
            ) : (
                <FirstScreen onButtonClick={handleInputButtonClick} />
            )}

            <div className='bx-separator bx-dark' ref={messagesContainerRef}></div>

            <div className={isSidebarOpen ? "principal-input" : "principal-input big-input"}>
                {messages.length > 1 &&
                    <SaveButton />
                }
                <form onSubmit={handleFormSubmit}>
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
        </div>
    )
}

export default ChatGPT;