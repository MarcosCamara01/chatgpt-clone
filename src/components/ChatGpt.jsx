"use client"

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useChat } from "ai/react";
import { FirstScreen } from './FirstScreen';
import { SaveButton } from './SaveButton';
import { Messages } from "./Messages";
import { PrincipalImput } from "./PrincipalImput";
import { Header } from './Header';
import { useSidebar } from '../hooks/SidebarContext';

const ChatGPT = () => {
    const textareaRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const [messagesReady, setMessagesReady] = useState(false);
    const { messages, input, setInput, handleInputChange, handleSubmit } = useChat();
    const { isSidebarOpen, isMobile } = useSidebar();

    useEffect(() => {
        document.title = "ChatGPT Clone | By Marcos Cámara";
    }, []);

    const handleFormSubmit = useCallback(
        (event) => {
            event.preventDefault();
            handleSubmit(event);
        },
        [handleSubmit]
    );

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

        if (messagesContainerRef.current && messagesReady) {
            messagesContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);

    const handleInputButtonClick = (content) => {
        setInput(content);
    };

    return (
        <div className={`h-screen absolute right-0 top-0 ${isSidebarOpen && !isMobile ? "small" : "big"}`}>
            {messagesReady ? (
                <>
                    <Header
                        isSidebarOpen={isSidebarOpen}
                        isMobile={isMobile}
                    />
                    <Messages
                        messages={messages}
                    />
                </>
            ) : (
                <FirstScreen
                    onButtonClick={handleInputButtonClick}
                />
            )}

            <div className='h-48 bg-[#343541]' ref={messagesContainerRef}></div>

            <div className={`fixed right-0 bottom-0 pt-2 pl-2 flex flex-col items-center justify-center principal-input
            ${isSidebarOpen && !isMobile ? "small" : "big"}`}>
                {messages.length > 1 &&
                    <SaveButton
                        messages={messages}
                    />
                }
                <PrincipalImput
                    handleFormSubmit={handleFormSubmit}
                    textareaRef={textareaRef}
                    input={input}
                    handleInputChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default ChatGPT;