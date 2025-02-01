import ChannelNavbar from "./channel-navbar";
import { getChannels } from "./getChannels";
import { getChannelMessages } from "./getChannelMessages"
import LogoutButton from "./logout-button";
import MessageList from "./message-list";
import Header from "./header";
import NewMessagePiece from "./new-message-piece";

export default async function ChannelNamePage({
    params
}: {
    params: Promise<{ name: string }>
}) {
    const activeChannelName = (await params).name

    const channels = await getChannels()
    const activeChannel = channels.find(c => c.name === activeChannelName)

    // TODO: We should handle an unavailable channel better.
    if (activeChannel === undefined)
        throw "404 CHANNEL NOT FOUND"

    const currentTime = new Date().toISOString()
    const messages = await getChannelMessages({ channelId: activeChannel.id, timestamp: currentTime })

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-row w-screen grow">
                <ChannelNavbar channels={channels} activeChannelId={activeChannel.id} />
                <div className="flex flex-col w-screen">
                    <MessageList messages={messages} />
                    <div className="flex flex-col justify-self-end">
                        <NewMessagePiece />
                    </div>
                </div>
            </div>
        </div>
        
    );
}
