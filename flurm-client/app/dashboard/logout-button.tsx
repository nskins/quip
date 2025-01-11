'use client'
import { logout } from './logout'

export default function LogoutButton() {
    return (
        <>
            <button onClick={logout}>Logout</button>
        </>
    )
}