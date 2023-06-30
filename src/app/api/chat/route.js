import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const config = new Configuration({
    apiKey: "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"
})

const openai = new OpenAIApi(config)

export async function POST(request) {
    const { messages } = await request.json()

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        stream: true,
        messages,
        max_tokens: 500,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1
    })

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
}