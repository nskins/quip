'use client'
import { useActionState } from 'react'
import { signup } from './signup'

export default function SignupForm() {
    const initialState = {
        error: ''
    };

    const [state, formAction] = useActionState(signup, initialState);

    return (
        <div className="flex flex-col gap-4 w-80">
            <h1>Create Account</h1>
            {state && state.error && <p>{state.error}</p>}
            <form action={formAction} className="flex flex-col gap-4">
                <input type="email" name="email" required placeholder="Email" />
                <input type="password" name="password" required placeholder="Password" />
                <input type="password" name="confirm_password" required placeholder="Confirm password" />
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}