export const fetchRequest = async (url, method, data) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error('Request failed');
        }
    } catch (error) {
        throw new Error(`Request error: ${error.message}`);
    }
};