import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { GptIcon } from "../helpers/icons";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const customCodeStyle = {
    padding: '16px',
    backgroundColor: '#000',
};

export const Messages = ({ messages }) => {
    return (
        <div className='mt-[65px]'>
            {messages.map((message) => {
                const isChatGPT = message.role !== 'user';
                const messageContent = message.content;
                const messageParts = messageContent.split(/(```[\s\S]*?```)/);

                return (
                    <div
                        key={message.id}
                        className={`w-full ${isChatGPT ? "bg-[#444654]" : "bg-[#343541]"}`}
                    >
                        <div className='w-[90%] max-w-3xl py-6 mx-auto flex gap-6'>
                            {isChatGPT ?
                                <div
                                    className='bg-[#19C37D] min-w-[30px] max-w-[30px] h-[30px] flex items-center justify-center rounded-sm'
                                >
                                    <GptIcon />
                                </div>
                                :
                                <div
                                    className='bg-[#EC427B] min-w-[30px] max-w-[30px] h-[30px] flex items-center justify-center rounded-sm'
                                >
                                    <AiOutlineUser className="text-2xl min-w-[24px] h-[24px] text-white" />
                                </div>
                            }
                            <div>
                                {messageParts.map((part, index) => {
                                    if (part.startsWith('```')) {
                                        const codeBlockParts = part.split('\n');
                                        const language = codeBlockParts[0].replace(/```/, '').trim();
                                        const codeContent = codeBlockParts.slice(1, -1).join('\n');

                                        return (
                                            <SyntaxHighlighter
                                                key={index}
                                                language={language}
                                                style={atomDark}
                                                customStyle={customCodeStyle}>
                                                {codeContent}
                                            </SyntaxHighlighter>
                                        );
                                    } else {
                                        const paragraphs = part.split('\n\n');
                                        return (
                                            <div key={index}>
                                                {paragraphs.map((paragraph, pIndex) => (
                                                    <p className={`text-sm leading-normal sm:leading-[1.7rem] sm:text-base ${isChatGPT ? "text-[#D1D5DB] mt-[20px] first:mt-0" : "text-[#ECECF1]"}`} key={pIndex}>{paragraph}</p>
                                                ))}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}