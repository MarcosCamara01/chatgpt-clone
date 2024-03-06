"use server";

import axios from "axios";

export const saveKey = async (apiKey: string, userId: string) => {
    try {
        const signupResponse = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/key`, {
            userId,
            apiKey
        });

        return signupResponse.data;
    } catch (error) {
        console.error(error);
    }
};
