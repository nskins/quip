'use client'
import { login } from 'api/login'
import Input from '../input';
import AuthForm from '../auth-form';

export default function LoginForm() {
    const inputs = (
        <>
            <Input
                type="email"
                name="email"
                placeholder="Email"
            />
            <Input
                type="password"
                name="password"
                placeholder="Password"
            />
        </>
    );

    return (
        <AuthForm
            onSubmit={login}
            title="Login"
            inputs={inputs}
            submitText="Log in"
            linkPrompt="Don't have an account?"
            linkHref="/signup"
            linkText="Sign up"
        />
    )
}