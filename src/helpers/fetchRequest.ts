"use server"

export const fetchRequest = async (url: string, method: string, data: Date) => {
    try {
        const options: any = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: {}
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + url, options);

        if (response.ok) {
            if (method === 'DELETE') {
                return;
            }

            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error('Request failed');
        }
    } catch (error) {
        throw new Error(`Request error: ${error.message}`);
    }
};