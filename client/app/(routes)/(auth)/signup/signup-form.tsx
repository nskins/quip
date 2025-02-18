'use client'
import { signup } from 'api/signup'
import Input from '../input';
import AuthForm from '../auth-form';

export default function SignupForm() {
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
            <Input
                type="password"
                name="confirm_password"
                placeholder="Confirm password"
            />
        </>
    );

    return (
        <AuthForm
            onSubmit={signup}
            title="Create an account"
            inputs={inputs}
            submitText="Sign up"
        />
    )
}