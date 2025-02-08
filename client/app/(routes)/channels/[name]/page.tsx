'use client'
import ChannelNavbar from "./channel-navbar";
import { getChannels } from "api/getChannels";
import MessageList from "./message-list";
import Header from "./header";
import NewMessagePiece from "./new-message-piece";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Channel } from "./channel";

export default function ChannelNamePage() {
    const initialChannels : Channel[] = []
    const initialActiveChannelId : number = 0

    const [channels, setChannels] = useState(initialChannels);
    const [activeChannelId, setActiveChannelId] = useState(initialActiveChannelId)

    const params = useParams<{ name : string }>();

    useEffect(() => {
        const getData = async () => {
            const channels = await getChannels();
            setChannels(channels);

            const activeChannel = channels.find(c => c.name === params.name);
            
            // TODO: we should handle this error better.
            if (activeChannel === undefined)
                throw "404 CHANNEL NOT FOUND"

            setActiveChannelId(activeChannel.id)
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
                        <MessageList activeChannelId={activeChannelId} />
                    </div>
                    <div className="mx-3 my-2">
                        <NewMessagePiece channelId={activeChannelId} />
                    </div>
                </div>
            </div>
        </div>
        
    );
}
