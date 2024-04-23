"use server"

import { Schema } from "mongoose";
import { Chat, IChat } from "../models/Chat";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/libs/mongoose";
import { cookies } from 'next/headers'

connectDB();

export const getChats = async () => {
    try {
        const chat: IChat[] = await Chat.find();
        chat.reverse();
        return { chat, status: 200 };
    } catch (error) {
        console.error(error);
        return { message: "Unexpected error", status: 500, error, chat: null };
    }
}

export const getOneChat = async (id: Schema.Types.ObjectId) => {
    if (!id) {
        return { message: "Missing data", status: 400 };
    }

    try {
        const chat: IChat | null = await Chat.findById(id);
        return { chat, status: 200 };
    } catch (error) {
        console.error(error);
        return { message: "Unexpected error", status: 500, error, chat: null };
    }
}

export const updateChat = async (id: Schema.Types.ObjectId, dataToUpdate: any) => {
    if (!id || !dataToUpdate) {
        return { message: "Missing data", status: 400 };
    }

    try {
        const updatedChat: IChat | null = await Chat.findByIdAndUpdate(id, dataToUpdate, { new: true });
        revalidatePath("/");
        return { updatedChat, status: 200 };
    } catch (error) {
        console.error(error);
        return { message: "Unexpected error", status: 500, error };
    }
}

export const saveChat = async (dataToSave: any) => {
    if (!dataToSave) {
        return { message: "Missing data", status: 400 };
    }

    try {
        const savedChat: IChat = await Chat.create(dataToSave);
        revalidatePath("/");
        return { _id: savedChat._id, status: 200 };
    } catch (error) {
        console.error(error)
        return { message: "Unexpected error", status: 500, error };
    }
}

export const deleteChat = async (id: Schema.Types.ObjectId) => {
    if (!id) {
        return { message: "Missing data", status: 400 };
    }

    try {
        const deletedChat = await Chat.findByIdAndDelete(id);
        revalidatePath("/");
        return { deletedChat, status: 200 };
    } catch (error) {
        console.error(error)
        return { message: "Unexpected error", status: 500, error };
    }
}

export async function saveKey(data: string) {
    cookies().set('userKey', data)
    revalidatePath("/");
}

export async function getUserKey() {
    const userCookies = cookies()
    const userKey = userCookies.get('userKey')
    return userKey;
}