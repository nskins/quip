import LogoutButton from './logout-button'

export default function Header() {
    return (
        <div className="flex flex-row bg-pink-100 pt-1 pb-1 text-black">
            <h1 className="text-2xl ml-4 self-center">Quip</h1>
            <span className="grow" />
            <LogoutButton className="mr-4" />
        </div>
    )
}