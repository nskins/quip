'use server'

import { cookies } from "next/headers";
import { Channel } from "./channel";

export async function getChannels(): Promise<Channel[]> {

    const cookieStore = await cookies();

    const access_token = cookieStore.get('access_token')?.value

    console.log(access_token)

    // TODO: if access token is empty/null, redirect to login page.

    const data = await fetch('http://localhost:3001/channels', {
        headers: { 'Authorization': `Bearer ${access_token}` }
    })

    const channels = await data.json()

    console.log(channels)

    return channels
}