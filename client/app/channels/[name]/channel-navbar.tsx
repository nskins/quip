import { Channel } from './channel'

export default function ChannelNavbar({ 
    channels, 
    activeChannelId 
} : { 
    channels: Channel[],
    activeChannelId: number 
}) {
    return (
        <div className="flex flex-col gap-4 w-80">
            <h1>Channels</h1>
            {channels && channels.map(c =>
                (c.id === activeChannelId) ? 
                <div className="bg-pink-200 text-black font-bold" key={c.id}>{c.name}</div> : 
                <div key={c.id}>{c.name}</div>         
            )}
        </div>
    )
}