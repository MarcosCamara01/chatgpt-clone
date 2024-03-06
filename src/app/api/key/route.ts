import { NextRequest, NextResponse } from 'next/server';
import Key from '../../../models/Key';
import { connectDB } from '../../../libs/mongoose';

connectDB();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    try {
        const apiKey = await Key.findOne({ userId });

        return NextResponse.json(apiKey);
    } catch (error) {
        console.error('Failed to fetch key.', error);
        return NextResponse.json({ error: 'Failed to fetch key.' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        const { apiKey } = await req.json();


        const dataToUpdate = {
            apiKey
        };

        const updatedKey = await Key.findByIdAndUpdate(id, dataToUpdate, { new: true });
        return NextResponse.json(updatedKey);
    } catch (error) {
        console.error('Failed to update key.', error);
        return NextResponse.json({ error: 'Failed to update key.' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { userId, apiKey } = await req.json();


        const dataToSave = {
            userId: userId,
            apiKey: apiKey,
        };
        const savedKey = await Key.create(dataToSave);
        return NextResponse.json(savedKey);
    } catch (error) {
        console.error('Failed to save product.', error);
        return NextResponse.json({ error: 'Failed to save key.' }, { status: 500 });
    }
}