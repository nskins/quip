'use client'
import { useActionState } from 'react'
import { login } from './login'

export default function LoginForm() {
    const initialState = {
        error: ''
    };

    const [state, formAction] = useActionState(login, initialState);

    return (
        <>
            <h1>Login</h1>
            {state && state.error && <p>{state.error}</p>}
            <form action={formAction}>
                <input type="email" name="email" required />
                <input type="password" name="password" required />
                <button type="submit">Log In</button>
            </form>
        </>
    )
}