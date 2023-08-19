import { NextRequest, NextResponse } from 'next/server'
import { Chat } from '../../../../models'
import { dbConnect } from '../../../../utils/mongoose'

export async function GET(req: NextRequest, params: { id: string }) {
    dbConnect();

    try {
        const chatFound = await Chat.findById(params.id);

        console.log(chatFound)

        if (!chatFound)
            return NextResponse.json(
                {
                    message: 'Chat not found',
                },
                {
                    status: 404,
                }
            );

        return NextResponse.json(chatFound);
    } catch (error) {
        console.error('Failed to fetch chat.', error);
        return NextResponse.json({ error: 'Failed to fetch chat.' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, params: { id: string }) {
    dbConnect();

    try {
        const dataToUpdate = await req.json();
        const updatedChat = await Chat.findByIdAndUpdate(params.id, dataToUpdate, { new: true });

        return NextResponse.json(updatedChat);
    } catch (error) {
        console.error('Failed to update chat.', error);
        return NextResponse.json({ error: 'Failed to update chat.' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, params: { id: string }) {
    dbConnect();

    try {
        const deletedChat = await Chat.findByIdAndDelete(params.id);

        if (!deletedChat)
            return NextResponse.json(
                {
                    message: 'Chat not found',
                },
                {
                    status: 404,
                }
            );

        return NextResponse.json(deletedChat);
    } catch (error) {
        console.error('Failed to remove chat.', error);
        return NextResponse.json({ error: 'Failed to remove chat.' }, { status: 500 });
    }
}
