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

    messages.sort((a, b) => a.createdAt < b.createdAt ? -1 : 1);

    var groups = Object.groupBy(messages, m => new Date(m.createdAt).toLocaleDateString("en-US"))

    return (
        <div className="flex flex-col w-full">
            {groups && Object.keys(groups).map(g => {
                return (
                    <div key={g}>
                        <div className="flex justify-center p-1">{getDateHeader(groups[g][0])}</div>
                        {groups[g] && groups[g].map(m =>
                            <div key={m.id} className="mx-4 my-2">
                                <div>{m.user.email} · {new Date(m.createdAt).toLocaleTimeString("en-US")}</div>
                                <div>{m.text}</div>
                            </div>
                        )}
                    </div>
                )
            })}
            <div ref={endRef} />
        </div>
    )
}

function getDateHeader(exampleMessage : GetChannelMessageDto)
{
    var options = { 
        weekday: 'long',
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
    };

    var msgDate = new Date(exampleMessage.createdAt).toLocaleDateString("en-US", options);

    if (msgDate === new Date().toLocaleDateString("en-US", options))
        return "Today"
    else
        return msgDate
}