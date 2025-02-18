'use client'
import { useActionState } from 'react'
import { login } from 'api/login'

export default function LoginForm() {
    const initialState = {
        error: ''
    };

    const [state, formAction] = useActionState(login, initialState);

    return (
        <div className="flex flex-col gap-4 w-80 bg-pink-400 p-4 rounded-lg text-black">
            <h1>Login</h1>
            {state && state.error && <p>{state.error}</p>}
            <form action={formAction} className="flex flex-col gap-4">
                <input className="p-1 rounded-md" type="email" name="email" required placeholder="Email" />
                <input className="p-1 rounded-md" type="password" name="password" required placeholder="Password" />
                <button className="p-1 bg-pink-200 rounded-lg" type="submit">Log In</button>
            </form>
        </div>
    )
}