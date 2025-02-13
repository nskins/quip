'use server'

import { cookies } from "next/headers";
import { GetChannelMessageDto } from "./getChannelMessageBlock";

export async function getChannelMessages({
    channelId,
    timestamp
} : {
    channelId : number,
    timestamp : string
}): Promise<GetChannelMessageDto[]> {

    const cookieStore = await cookies();

    const access_token = cookieStore.get('access_token')?.value

    // TODO: if access token is empty/null, redirect to login page.

    const api_host = process.env.API_HOST

    const data = await fetch(`${api_host}/channels/${channelId}/messages`, {
        headers: { 'Authorization': `Bearer ${access_token}` }
    })

    const messages = await data.json()

    return messages
}