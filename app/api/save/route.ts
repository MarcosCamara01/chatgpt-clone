import { NextResponse } from 'next/server'
import { Chat, IChat } from '../../../src/models'
import { connectToDatabase } from '../../../src/utils'

connectToDatabase()

export async function GET() {
    try {
        const posts = await Chat.find()
        return NextResponse.json(posts.reverse())
    } catch {
        return NextResponse.json('error', {
            status: 500
        })
    }
}

export async function POST(req: Request) {
    try {
        const body: IChat = await req.json()
        const newPost = new Chat(body)
        const saved = await newPost.save()
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
        const deletedPost = await Chat.findByIdAndDelete(id)

        return NextResponse.json(deletedPost)
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