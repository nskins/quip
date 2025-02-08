import { GetChannelMessageDto, getChannelMessages } from "api/getChannelMessages"
import { useEffect, useRef, useState } from "react";
import { socket } from 'socket';

export default function MessageList({ 
    activeChannelId 
} : { 
    activeChannelId: number
}) {
    const initialMessages : GetChannelMessageDto[] = []

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState(initialMessages);
    
    const endRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        endRef.current?.scrollIntoView({ behavior: 'instant' })
    }
    
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onMessageCreated(message : GetChannelMessageDto) {
            if (message.channel.id === activeChannelId)
                setMessages([...messages, message]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('message-created', onMessageCreated);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('message-created', onMessageCreated);
        };
    }, [messages]);

    useEffect(() => {
        const getMessages = async () => {
            const currentTime = new Date().toISOString()

            const messages = await getChannelMessages({
                channelId: activeChannelId, 
                timestamp: currentTime 
            })
            setMessages(messages);
        }

        getMessages();
        
    }, [activeChannelId])

    useEffect(() => {
        scrollToBottom()
    })

    return (
        <div className="flex flex-col w-full">
            {messages && messages.map(m =>
                <div key={m.id} className="mx-4 my-2">
                    <div>{m.user.email}</div>
                    <div>{m.text}</div>
                    <div>{m.createdAt.toString()}</div>
                </div>    
            )}
            <div ref={endRef} />
        </div>
    )
}