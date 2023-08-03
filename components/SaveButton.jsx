"use client"

import React, { useState } from 'react';
import { LuSave } from 'react-icons/lu';

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
                const response = await fetch(`/api/save?id=${chatId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSave),
                });

                if (response.ok) {
                    console.log('Messages updated successfully!');
                } else {
                    console.error('Failed to update messages.');
                }
            } else {
                const response = await fetch('/api/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSave),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setChatId(responseData._id);
                    console.log('Messages saved successfully!');
                } else {
                    console.error('Failed to save messages.');
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
