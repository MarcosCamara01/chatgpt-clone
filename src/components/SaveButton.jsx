import React, { useState, useEffect } from 'react';
import { LuSave } from 'react-icons/lu';
import { BiCheck } from 'react-icons/bi';
import { fetchRequest } from '../helpers/fetchRequest';
import { useChatContext } from '../hooks/ChatContext';

export const SaveButton = ({ messages }) => {
    const [chatId, setChatId] = useState(null);
    const [showAnimation, setShowAnimation] = useState(false);
    const [storedMessagesLength, setStoredMessagesLength] = useState(0);
    const { chats, setChats } = useChatContext();

    useEffect(() => {
        if (showAnimation && messages.length > storedMessagesLength) {
            setShowAnimation(false);
        }
    }, [messages, showAnimation, storedMessagesLength]);

    const handleSave = async () => {
        try {
            const firstUserMessage = messages.find((message) => message.role === 'user');

            const title = firstUserMessage ? firstUserMessage.content : 'Default Title';
            const date = new Date();

            const dataToSave = {
                title,
                date,
                messages,
            };

            if (chatId) {
                const url = `/api/messages?id=${chatId}`;
                const method = 'PUT';

                const responseData = await fetchRequest(url, method, dataToSave);

                if (responseData) {
                    console.log('Messages updated successfully!');
                    setShowAnimation(true);
                    setStoredMessagesLength(messages.length);

                    const updatedChats = chats.map((chat) => {
                        if (chat._id === responseData._id) {
                            return { ...chat, messages: dataToSave.messages };
                        }
                        return chat;
                    });

                    setChats(updatedChats);
                }
            } else {
                const url = '/api/messages';
                const method = 'POST';

                const responseData = await fetchRequest(url, method, dataToSave);
                if (responseData) {
                    const updatedChat = { ...dataToSave, _id: responseData._id };
                    setChatId(responseData._id);
                    setChats((prevChats) => [updatedChat, ...prevChats]);
                    console.log('Messages saved successfully!');
                    setShowAnimation(true);
                    setStoredMessagesLength(messages.length);
                }
            }
        } catch (error) {
            console.error('Failed to save/update messages.', error);
        }
    };

    return (
        <button className={`save-btn ${showAnimation && "svg-big"}`} onClick={handleSave}>
            {showAnimation ? (
                <>
                    <BiCheck />
                    Saved
                </>
            ) : (
                <>
                    <LuSave />
                    Save
                </>
            )}
        </button>
    );
};
