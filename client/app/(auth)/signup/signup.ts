'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signup(previousState: { error: string }, formData: FormData) {

    const email = formData.get('email')
    const password = formData.get('password')
    const confirm_password = formData.get('confirm_password')

    // TODO: this should be client-side validation.
    if (password !== confirm_password)
        return { error: 'Passwords do not match' }

    const data = await fetch('http://localhost:3001/auth/signup', {
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
        return { error: 'An error occurred' }
    }
}