
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../src/db/config";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json()

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            stream: true,
            messages,
            max_tokens: 1000,
            temperature: 0.7,
            top_p: 1,
            frequency_penalty: 1,
            presence_penalty: 1
        });

        
        const stream = OpenAIStream(response);

        return new StreamingTextResponse(stream);
    } catch (err) {
        console.error(err);
    }
}
