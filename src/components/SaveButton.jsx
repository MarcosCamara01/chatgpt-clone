import React, { useState } from 'react';
import { LuSave } from 'react-icons/lu';
import { fetchRequest } from '../helpers/fetchRequest';
import { useChatContext } from '../helpers/ChatContext';

export const SaveButton = ({ messages }) => {
    const [chatId, setChatId] = useState(null);
    const { setChats } = useChatContext();

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
                }
            }
        } catch (error) {
            console.error('Failed to save/update messages.', error);
        }
    };

    return (
        <button className='save-btn' onClick={handleSave}>
            <LuSave />
            Save
        </button>
    );
};
