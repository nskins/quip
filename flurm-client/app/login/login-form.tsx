export default function LoginForm() {
    return (
        <form action={login}>
            <input type="text" name="email" />
            <input type="password" name="password" />
            <button type="submit">Log In</button>
        </form>
    )
}

async function login(formData: FormData) {
    'use server'

    const email = formData.get('email')
    const password = formData.get('password')

    const data = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    })

    const json = await data.json()
    console.log(json)
}