'use client'
import { logout } from './logout'

export default function LogoutButton({
    className
} : {
    className : string
}) {
    return (
        <button 
            className={`bg-pink-300 p-2 rounded-md ${className}`} 
            onClick={logout}>
                Logout
        </button>
    )
}