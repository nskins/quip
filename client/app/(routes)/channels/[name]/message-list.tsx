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
                
                return groups[g] !== undefined ? 
                (
                    <div key={g}>
                        <div className="flex font-bold text-pink-300 justify-center p-2">{getDateHeader(groups[g][0])}</div>
                        <div className="flex flex-col gap-2">
                            {groups[g] && groups[g].map(m =>
                                <div key={m.id} className="bg-pink-50 text-black rounded-lg mx-2 p-1">
                                    <div>
                                        <span className="font-bold">{m.user.email}</span><span> · </span>
                                        <span>{new Date(m.createdAt).toLocaleTimeString("en-US")}</span>
                                    </div>
                                    <div>{m.text}</div>
                                </div>
                            )}
                        </div>
                    </div>
                ) :
                <></>
            })}
            <div ref={endRef} />
        </div>
    )
}

function getDateHeader(exampleMessage : GetChannelMessageDto)
{
    var options: Intl.DateTimeFormatOptions = {
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