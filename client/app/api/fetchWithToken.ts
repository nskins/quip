'use server'
import { cookies } from "next/headers";

export default async function fetchWithToken(
    uri : string,
    method : string = "GET",
    body : string | undefined = undefined ) {

        const cookieStore = await cookies();

        const access_token = cookieStore.get('access_token')?.value

        const data = await fetch(uri, {
            method: method,
            headers: { 
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            body: body
        })

        const response = await data.json()

        return response
}