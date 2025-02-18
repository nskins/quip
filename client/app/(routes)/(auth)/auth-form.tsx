'use client'
import { ReactNode, useActionState } from 'react'

type ErrorState = { error: string };

export default function AuthForm({
    onSubmit,
    title,
    inputs,
    submitText
} : {
    onSubmit: (previousState: ErrorState, formData: FormData) => Promise<ErrorState>,
    title: string,
    inputs: ReactNode,
    submitText: string
}) {
    const initialState = {
        error: ''
    };

    const [state, formAction] = useActionState(onSubmit, initialState);

    return (
        <div className="flex flex-col gap-4 w-80 bg-pink-400 p-4 rounded-lg text-black">
            <h1>{title}</h1>
            {state && state.error && <p>{state.error}</p>}
            <form action={formAction} className="flex flex-col gap-4">
                {inputs}
                <button className="p-1 bg-pink-200 rounded-lg" type="submit">{submitText}</button>
            </form>
        </div>
    )
}