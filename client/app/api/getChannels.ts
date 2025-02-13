'use server'
import { Channel } from "(routes)/channels/[name]/channel";
import fetchWithToken from "./fetchWithToken";

export async function getChannels(): Promise<Channel[]> {

    const api_host = process.env.API_HOST

    return await fetchWithToken(`${api_host}/channels`);
}