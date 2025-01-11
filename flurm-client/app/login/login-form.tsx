'use client'
import { useState } from 'react'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const data = await fetch('http://localhost:3001/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        })

        const json = await data.json()

        if (json && json.access_token) {
            localStorage.setItem('access_token', json.access_token)
            // TODO: redirect to user dashboard
        }
        else {
            setError("Invalid credentials")
        }
    }

    return (
        <>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Log In</button>
            </form>
        </>
    )
}