'use client'
import ChannelNavbar from "./channel-navbar";
import { getChannels } from "api/getChannels";
import { GetChannelMessageDto, getChannelMessages } from "api/getChannelMessages"
import { socket } from 'socket';
import MessageList from "./message-list";
import Header from "./header";
import NewMessagePiece from "./new-message-piece";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Channel } from "./channel";

export default function ChannelNamePage() {
    const initialMessages : GetChannelMessageDto[] = []
    const initialChannels : Channel[] = []
    const initialActiveChannelId : number = 0

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState(initialMessages);
    const [channels, setChannels] = useState(initialChannels);
    const [activeChannelId, setActiveChannelId] = useState(initialActiveChannelId)

    const params = useParams<{ name : string }>();

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
        const getData = async () => {
            const channels = await getChannels();
            setChannels(channels);

            const activeChannel = channels.find(c => c.name === params.name);
            
            // TODO: we should handle this error better.
            if (activeChannel === undefined)
                throw "404 CHANNEL NOT FOUND"

            setActiveChannelId(activeChannel.id)

            const currentTime = new Date().toISOString()

            const messages = await getChannelMessages({
                channelId: activeChannel.id, 
                timestamp: currentTime 
            })
            setMessages(messages);
        }

        getData()
    }, [])

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-row w-screen grow overflow-y-auto">
                <ChannelNavbar channels={channels} activeChannelId={activeChannelId} />
                <div className="flex flex-col w-screen">
                    <div className="grow overflow-y-auto">
                        <MessageList messages={messages} />
                    </div>
                    <div>
                        <NewMessagePiece channelId={activeChannelId} />
                    </div>
                </div>
            </div>
        </div>
        
    );
}
