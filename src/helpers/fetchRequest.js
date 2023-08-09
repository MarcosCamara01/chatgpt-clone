export const fetchRequest = async (url, method, data) => {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);

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