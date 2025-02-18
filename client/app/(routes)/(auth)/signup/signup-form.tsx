'use client'
import { useActionState } from 'react'
import { signup } from 'api/signup'

export default function SignupForm() {
    const initialState = {
        error: ''
    };

    const [state, formAction] = useActionState(signup, initialState);

    return (
        <div className="flex flex-col gap-4 w-80 bg-pink-400 p-4 rounded-lg text-black">
            <h1>Create Account</h1>
            {state && state.error && <p>{state.error}</p>}
            <form action={formAction} className="flex flex-col gap-4">
                <input className="p-1 rounded-md" type="email" name="email" required placeholder="Email" />
                <input className="p-1 rounded-md" type="password" name="password" required placeholder="Password" />
                <input className="p-1 rounded-md" type="password" name="confirm_password" required placeholder="Confirm password" />
                <button className="p-1 bg-pink-200 rounded-lg" type="submit">Sign up</button>
            </form>
        </div>
    )
}