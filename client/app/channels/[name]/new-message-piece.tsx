import SendIcon from "./send-icon";

export default function NewMessagePiece() {
    return (
        <div className="flex flex-row h-16">
            <textarea className="grow"  />
            <button className="text-black bg-pink-300 p-2 rounded-md"><SendIcon /></button>
        </div>
    )
}