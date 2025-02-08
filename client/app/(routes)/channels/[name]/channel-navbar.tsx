import { useEffect, useState } from 'react'
import { Channel } from './channel'
import Link from 'next/link'
import { getChannels } from '@/api/getChannels'

export default function ChannelNavbar({ 
    activeChannelId 
} : { 
    activeChannelId: number 
}) {
    const initialChannels : Channel[] = []

    const [channels, setChannels] = useState(initialChannels);

    useEffect(() => {
        const getData = async () => {
            const channels = await getChannels()

            setChannels(channels);
        }

        getData();
    }, [])

    return (
        <div className="flex flex-col w-48 bg-pink-500">
            <h1 className="p-2 font-bold text-xl">Channels</h1>
            {channels && channels.map(c => {
                const style = (c.id === activeChannelId) ?
                    "p-2 bg-pink-200 text-black font-bold" :
                    "p-2 font-bold"
                
                    return (
                        <Link 
                            href={`/channels/${c.name}`} 
                            className={style}
                            key={c.id}>
                                {c.name}
                        </Link>
                    );
            })}
        </div>
    )
}