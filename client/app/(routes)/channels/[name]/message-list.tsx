import { GetChannelMessageDto } from "api/getChannelMessageBlock"
import { useEffect, useRef } from "react";

export default function MessageList({ 
    messages 
} : { 
    messages: GetChannelMessageDto[]
}) {
    const endRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        endRef.current?.scrollIntoView({ behavior: 'instant' })
    }

    useEffect(() => {
        scrollToBottom()
    })

    return (
        <div className="flex flex-col w-full">
            {messages && messages.map(m =>
                <div key={m.id} className="mx-4 my-2">
                    <div>{m.user.email} · {new Date(m.createdAt).toLocaleTimeString("en-US")}</div>
                    <div>{m.text}</div>
                </div>    
            )}
            <div ref={endRef} />
        </div>
    )
}