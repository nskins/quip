'use client'
import { useActionState } from 'react'
import { login } from './login'

export default function LoginForm() {
    const initialState = {
        error: ''
    };

    const [state, formAction] = useActionState(login, initialState);

    return (
        <div className="flex flex-col gap-4 w-80">
            <h1>Login</h1>
            {state && state.error && <p>{state.error}</p>}
            <form action={formAction} className="flex flex-col gap-4">
                <input type="email" name="email" required placeholder="Email" />
                <input type="password" name="password" required placeholder="Password" />
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}