'use server'
import fetchWithToken from "./fetchWithToken";

export type GetChannelMessageDto = {
    id : number
    text : string
    createdAt : Date
    updatedAt : Date
    channel : {
        id : number
        name : string
    }
    user : {
        id : number
        email : string
    }
}

export async function getChannelMessageBlock({
    channelId,
    timestamp
} : {
    channelId : number,
    timestamp : string
}): Promise<GetChannelMessageDto[]> {

    const api_host = process.env.API_HOST

    return await fetchWithToken(`${api_host}/channels/${channelId}/messages?timestamp=${timestamp}`);
}