import React from 'react';
import { LuSave } from 'react-icons/lu';

export const SaveButton = ({ messages }) => {
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

            const response = await fetch('/api/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSave),
            });

            if (response.ok) {
                console.log('Messages saved successfully!');
            } else {
                console.error('Failed to save messages.');
            }
        } catch (error) {
            console.error('Failed to save messages.', error);
        }
    };

    return (
        <button className='save-btn' onClick={handleSave}>
            <LuSave />
            Save
        </button>
    );
};
