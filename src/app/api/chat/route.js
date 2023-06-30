import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const config = new Configuration({
    apiKey: "OpenAI_API_Key"
})

const openai = new OpenAIApi(config)

export async function POST(request) {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        stream: true,
        messages: [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Who won the world series in 2020?"},
            {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
            {"role": "user", "content": "Where was it played?"}
        ],
        max_tokens: 500,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1
    })

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
}