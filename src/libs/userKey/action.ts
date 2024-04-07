"use server"

import Key, { KeyDocument } from "@/models/Key";
import { Schema } from "mongoose"
import { revalidatePath } from "next/cache";
import { connectDB } from "../mongoose";

export interface GetUserKeyResponse {
    userKey: KeyDocument | null;
    status: number;
    message?: string;
    error?: any;
}

connectDB();

export const getUserKey = async (id: string | Schema.Types.ObjectId) => {
    if (!id) {
        return { message: "Missing user id", status: 400, userKey: null };
    }

    try {
        const userKey: KeyDocument | null = await Key.findOne({ userId: id });
        return { userKey, status: 200 };
    } catch (error) {
        console.error(error);
        return { message: "Unexpected error", status: 500, error, userKey: null };
    }
}

export const getUserKeyClient = async (id: Schema.Types.ObjectId | string) => {
    if (!id) {
        return JSON.stringify({ message: "Missing user id", status: 400, userKey: null });
    }

    try {
        const userKey: KeyDocument | null = await Key.findOne({ userId: id });
        return JSON.stringify({ userKey, status: 200 });
    } catch (error) {
        console.error(error);
        return JSON.stringify({ message: "Unexpected error", status: 500, error, userKey: null });
    }
}

export const saveUserKey = async (dataToSave: KeyDocument) => {
    if (!dataToSave) {
        return { message: "Missing data", status: 400 };
    }

    try {
        const savedKey: KeyDocument = await Key.create(dataToSave);
        revalidatePath("/");
        return { userKey: savedKey.userKey, status: 200 };
    } catch (error) {
        console.error(error)
        return { message: "Unexpected error", status: 500, error };
    }
}

export const updateUserKey = async (id: Schema.Types.ObjectId | string, userKey: string) => {
    if (!id || !userKey) {
        return { message: "Missing data", status: 400 };
    }

    try {
        const updatedKey: KeyDocument | null = await Key.findOneAndUpdate({ userId: id, userKey });
        revalidatePath("/");
        return { updatedKey, status: 200 };
    } catch (error) {
        console.error(error);
        return { message: "Unexpected error", status: 500, error };
    }
}