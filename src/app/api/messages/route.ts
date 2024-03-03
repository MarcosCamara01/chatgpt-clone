import { NextRequest, NextResponse } from 'next/server';
import { Chat, IChat } from '../../../models';
import { connectDB } from '../../../libs/mongoose';

connectDB();

export async function GET() {
    try {
        const chat = await Chat.find();
        return NextResponse.json(chat.reverse());
    } catch (error) {
        console.error('Failed to fetch chats.', error);
        return NextResponse.json({ error: 'Failed to fetch chats.' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const query = new URL(req.url).searchParams;
    const id = query.get('id');

    try {
        const dataToUpdate = await req.json();
        const updatedChat = await Chat.findByIdAndUpdate(id, dataToUpdate, { new: true });

        return NextResponse.json(updatedChat);
    } catch (error) {
        console.error('Failed to update messages.', error);
        return NextResponse.json({ error: 'Failed to update messages.' }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        const dataToSave = await req.json();
        const savedChat = await Chat.create(dataToSave);
        return NextResponse.json({ _id: savedChat._id });
    } catch (error) {
        console.error('Failed to save messages.', error);
        return NextResponse.json({ error: 'Failed to save messages.' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const query = new URL(req.url).searchParams;
    const id = query.get('id');
    try {
        const deletedChat = await Chat.findByIdAndDelete(id);
        return NextResponse.json(deletedChat);
    } catch (error) {
        console.error('Failed to remove post.', error);
        return NextResponse.json({ error: 'Failed to remove post.' }, { status: 500 });
    }
}