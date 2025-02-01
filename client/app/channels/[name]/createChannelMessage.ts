'use server'

import { cookies } from "next/headers";

export type CreateChannelMessageRequest = {
    text : string
}

export type CreateChannelMessageResponse = {
    id : number,
    text : string
}

export async function createChannelMessage({
    channelId, 
    text
}: {
    channelId: number,
    text: string
}): Promise<CreateChannelMessageResponse> {

    const cookieStore = await cookies();

    const access_token = cookieStore.get('access_token')?.value

    // TODO: if access token is empty/null, redirect to login page.

    const data = await fetch(`http://localhost:3001/channels/${channelId}/messages`, {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })

    const response = await data.json()

    return response
}