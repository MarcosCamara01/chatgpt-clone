import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages, userKey } = await req.json();

    const config = new Configuration({
      apiKey: userKey
    })

    const openai = new OpenAIApi(config)

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

    if (response.status !== 200) {
      if (response.status === 401) {
        return new Response('Error', {
          status: response.status,
          statusText: "Ensure the API key used is correct, clear your browser cache, or generate a new one."
        });
      } else if (response.status === 429) {
        return new Response('Error', {
          status: response.status,
          statusText: "You exceeded your current quota, please check your plan and billing details."
        });
      } else if (response.status === 500) {
        return new Response('Error', {
          status: response.status,  
          statusText: "The server had an error while processing your request."
        });
      } else if (response.status === 503) {
        return new Response('Error', {
          status: response.status,
          statusText: "The engine is currently overloaded, please try again later."
        });
      }
    }

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (err) {
    console.error(err);
  }
}