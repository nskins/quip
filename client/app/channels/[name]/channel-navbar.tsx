import { Channel } from './channel'

export default function ChannelNavbar({ channels }: { channels: Channel[] }) {
    return (
        <div className="flex flex-col gap-4 w-80">
            <h1>Channels</h1>
            {channels && channels.map(c =>
                <div key={c.id}>{c.name}</div>
            )}
        </div>
    )
}