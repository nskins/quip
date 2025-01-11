'use client'
import { useState, useActionState } from 'react'
import { login } from './login'

export default function LoginForm() {
    // TODO: I think we can remove email and password from state.
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const initialState = {
        error: ''
    };

    const [state, formAction] = useActionState(login, initialState);

    return (
        <>
            <h1>Login</h1>
            {state && state.error && <p>{state.error}</p>}
            <form action={formAction}>
                <input type="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Log In</button>
            </form>
        </>
    )
}