import ChannelNavbar from "./channel-navbar";
import { getChannels } from "./getChannels";
import LogoutButton from "./logout-button";

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

    // TODO: get the channel messages for the active channel

    return (
        <div>
            <ChannelNavbar channels={channels} activeChannelId={activeChannel.id} />
            <LogoutButton />
        </div>
    );
}
