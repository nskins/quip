'use server'
import { GetChannelMessageDto } from "./getChannelMessageBlock";
import fetchWithToken from "./fetchWithToken";

export async function getChannelMessages({
    channelId,
    timestamp
} : {
    channelId : number,
    timestamp : string
}): Promise<GetChannelMessageDto[]> {

    const api_host = process.env.API_HOST

    return await fetchWithToken(`${api_host}/channels/${channelId}/messages`);
}