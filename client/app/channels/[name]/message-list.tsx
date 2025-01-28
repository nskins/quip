import { ChannelMessage } from './channel-message'

export default function MessageList({ 
    messages 
} : { 
    messages: ChannelMessage[]
}) {
    return (
        <div className="flex flex-col gap-4 w-80">
            <h1>Messages</h1>
            {messages && messages.map(m =>
                <div key={m.id}>{m.text}</div>       
            )}
        </div>
    )
}