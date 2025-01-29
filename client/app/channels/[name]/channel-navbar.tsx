import { Channel } from './channel'
import Link from 'next/link'

export default function ChannelNavbar({ 
    channels, 
    activeChannelId 
} : { 
    channels: Channel[],
    activeChannelId: number 
}) {
    return (
        <div className="flex flex-col gap-4 w-48 h-screen">
            <h1>Channels</h1>
            {channels && channels.map(c =>
                (c.id === activeChannelId) ? 
                <Link href={`/channels/${c.name}`} className="bg-pink-200 text-black font-bold" key={c.id}>{c.name}</Link> : 
                <Link href={`/channels/${c.name}`} key={c.id}>{c.name}</Link>         
            )}
        </div>
    )
}