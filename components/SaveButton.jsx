"use client"

import React, { useState } from 'react';
import { LuSave } from 'react-icons/lu';
import { fetchRequest } from '../helpers/fetchRequest';

export const SaveButton = ({ messages }) => {
    const [chatId, setChatId] = useState(null);

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
                const url = `/api/save?id=${chatId}`;
                const method = 'PUT';

                const responseData = await fetchRequest(url, method, dataToSave);

                if (responseData) {
                    console.log('Messages updated successfully!');
                }
            } else {
                const url = '/api/save';
                const method = 'POST';

                const responseData = await fetchRequest(url, method, dataToSave);
                if (responseData) {
                    setChatId(responseData._id);
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
