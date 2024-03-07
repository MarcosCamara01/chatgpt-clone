"use server";

import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../libs/auth";
import { Session } from "next-auth";

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

export const updateKey = async (apiKey: string, userId: string) => {
    try {
        const signupResponse = await axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/api/key`, {
            userId,
            apiKey
        });

        return signupResponse.data;
    } catch (error) {
        console.error(error);
    }
};

export const getUserKey = async () => {
    try {
        const session: Session | null = await getServerSession(authOptions);

        if (session) {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_APP_URL}/api/key?userId=${session.user._id}`
            );

            const userKeyDocument = response.data;
            if (userKeyDocument) {
                return userKeyDocument.apiKey;
            } else {
                return null;
            }
        }
    } catch (error) {
        console.error(error);
    }
};
