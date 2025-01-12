'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(previousState: { error: string }, formData: FormData) {

    const email = formData.get('email')
    const password = formData.get('password')

    const data = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    })

    const json = await data.json()

    if (json && json.access_token) {

        const cookieStore = await cookies();

        cookieStore.set('access_token', json.access_token);

        redirect('/dashboard')
    }
    else {
        return { error: 'Invalid credentials' }
    }
}