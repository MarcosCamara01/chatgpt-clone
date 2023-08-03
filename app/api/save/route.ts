import { NextRequest, NextResponse } from 'next/server'
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

export async function POST(req: NextRequest) {
    try {
      const dataToSave = await req.json();
      const savedChat = await Chat.create(dataToSave);
      return NextResponse.json(savedChat);
    } catch (error) {
      console.error('Failed to save messages.', error);
      return NextResponse.json('error', {
        status: 500,
      });
    }
  }
  
export async function DELETE(req: NextRequest) {
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