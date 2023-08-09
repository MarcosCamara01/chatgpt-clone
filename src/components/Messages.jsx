import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { GptIcon } from "../helpers/icons";
import '../styles/css/messages.css';

export const Messages = ({ messages }) => {
    return (
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
                            <div className={`messages-bx ${isChatGPT ? "message-gpt" : ""}`}>
                                {messageContent.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    )
}
