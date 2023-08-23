import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { GptIcon } from "../helpers/icons";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/css/messages.css';

const customCodeStyle = {
  padding: '16px',
  backgroundColor: '#000',
};

export const Messages = ({ messages }) => {
    return (
        <>
            {messages.map((message) => {
                const isChatGPT = message.role !== 'user';
                const messageContent = message.content;
                const messageParts = messageContent.split(/(```[\s\S]*?```)/);

                return (
                    <div key={message.id} className={`bx-group ${isChatGPT ? "bx-clear" : "bx-dark"}`}>
                        <div className='bx-text'>
                            {isChatGPT ?
                                <div className='bx-svg'><GptIcon /></div>
                                :
                                <div className='bx-svg'><AiOutlineUser /></div>
                            }
                            <div className={`messages-bx ${isChatGPT ? "message-gpt" : ""}`}>
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
                                                    <p key={pIndex}>{paragraph}</p>
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
        </>
    )
}