import { NextResponse } from 'next/server'
import { Chat, IChat } from '../../../src/models'
import { connectToDatabase } from '../../../src/utils'

connectToDatabase()

export async function GET() {
    try {
        const chat = await Chat.find()
        return NextResponse.json(chat.reverse())
    } catch {
        return NextResponse.json('error', {
            status: 500
        })
    }
}

export async function POST(req: Request) {
    try {
        const body: IChat = await req.json()
        const newChat = new Chat(body)
        const saved = await newChat.save()
        return NextResponse.json(saved)
    } catch {
        return NextResponse.json('error', {
            status: 500
        })
    }
}

export async function DELETE(req: Request) {
    const query = new URL(req.url).searchParams
    const id = query.get('id')
    try {
        const deletedChat = await Chat.findByIdAndDelete(id)

        return NextResponse.json(deletedChat)
    } catch {
        return NextResponse.json(
            {
                error: 'Failed to remove post'
            },
            {
                status: 500
            }
        )
    }
}