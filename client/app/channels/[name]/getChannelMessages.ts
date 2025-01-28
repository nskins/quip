'use server'

import { cookies } from "next/headers";
import { ChannelMessage } from "./channel-message";

export async function getChannelMessages({
    channelId,
    timestamp
} : {
    channelId : number,
    timestamp : string
}): Promise<ChannelMessage[]> {

    const cookieStore = await cookies();

    const access_token = cookieStore.get('access_token')?.value

    // TODO: if access token is empty/null, redirect to login page.

    const data = await fetch(`http://localhost:3001/channels/${channelId}/messages?timestamp=${timestamp}`, {
        headers: { 'Authorization': `Bearer ${access_token}` }
    })

    const messages = await data.json()

    return messages
}