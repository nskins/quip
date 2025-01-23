import ChannelNavbar from "./channel-navbar";
import { getChannels } from "./getChannels";
import LogoutButton from "./logout-button";

export default async function ChannelNamePage({
    params
}: {
    params: Promise<{ name: string }>
}) {
    const name = (await params).name

    // TODO: we need to verify the channel name is an existing channel

    const channels = await getChannels()

    // TODO: get the channel messages for the active channel

    return (
        <div>
            <ChannelNavbar channels={channels} />
            <LogoutButton />
        </div>
    );
}
