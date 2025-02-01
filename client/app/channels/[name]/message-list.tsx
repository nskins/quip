import { GetChannelMessageDto } from "./getChannelMessages"

export default function MessageList({ 
    messages 
} : { 
    messages: GetChannelMessageDto[]
}) {
    return (
        <div className="flex flex-col gap-4 w-full">
            <h1>Messages</h1>
            {messages && messages.map(m =>
                <div key={m.id}>
                    <div>{m.user.email}</div>
                    <div>{m.text}</div>
                    <div>{m.createdAt.toString()}</div>
                </div>    
            )}
        </div>
    )
}