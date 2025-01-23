export default async function ChannelNamePage({
    params
}: {
    params: Promise<{ name: string }>
}) {
    const name = (await params).name

    // TODO: get the channels
    // TODO: get the channel messages for the active channel

    return (
        <div>{name}</div>
    );
}
