"use server"

export async function fetchChats() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/messages`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch chats.', error);
    }
}