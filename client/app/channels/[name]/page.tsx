import ChannelNavbar from "./channel-navbar";
import { getChannels } from "./getChannels";
import { getChannelMessages } from "./getChannelMessages"
import LogoutButton from "./logout-button";
import MessageList from "./message-list";

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
        <div>
            <ChannelNavbar channels={channels} activeChannelId={activeChannel.id} />
            <MessageList messages={messages} />
            <LogoutButton />
        </div>
    );
}
