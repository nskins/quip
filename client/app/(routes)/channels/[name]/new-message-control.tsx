'use client'
import { useState } from "react";
import SendIcon from "./send-icon";
import { createChannelMessage } from "api/createChannelMessage";

export default function NewMessageControl({
    channelId
} : {
    channelId : number
}) {
    const [text, setText] = useState("");

    const handleNewMessage = () => {
        createChannelMessage({channelId, text})
        setText("")
    }

    return (
        <div className="flex flex-row h-16 text-black gap-2">
            <textarea 
                onChange={e => setText(e.target.value)}
                className="grow resize-none"
                value={text}
                placeholder="Enter a message..."
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleNewMessage()
                    }}} />
            <button
                onClick={handleNewMessage}
                className="bg-pink-300 p-2 rounded-md">
                    <SendIcon />
            </button>
        </div>
    )
}