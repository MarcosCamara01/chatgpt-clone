"use client"

import { useChat } from "ai/react"

export const Messages = () => {
    const { messages } = useChat();

    return (
        <div>
            {
                messages.map(message => {
                    const isAbuela = message.role != "user"

                    return (
                        <div key={message.id}>
                            <p>
                                {isAbuela ? "ChatGPT: " : "Me: "}
                                <span>
                                    {message.content}
                                </span>
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )
}
