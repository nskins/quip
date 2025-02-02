'use server'

import { cookies } from "next/headers";
import { Channel } from "./channel";

export async function getChannels(): Promise<Channel[]> {

    const cookieStore = await cookies();

    const access_token = cookieStore.get('access_token')?.value

    // TODO: if access token is empty/null, redirect to login page.

    const api_host = process.env.API_HOST

    const data = await fetch(`${api_host}/channels`, {
        headers: { 'Authorization': `Bearer ${access_token}` }
    })

    const channels = await data.json()

    return channels
}