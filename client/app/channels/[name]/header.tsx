import LogoutButton from './logout-button'

export default function Header() {
    return (
        <div className="flex flex-row">
            <h1>FlamChat</h1>
            <LogoutButton />
        </div>
    )
}