'use server'
import fetchWithToken from "./fetchWithToken";

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

    const api_host = process.env.API_HOST

    return await fetchWithToken(
        `${api_host}/channels/${channelId}/messages`,
        "POST",
        JSON.stringify({ text : text }));
}