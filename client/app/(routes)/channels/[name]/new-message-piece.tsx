'use client'
import { useState } from "react";
import SendIcon from "./send-icon";
import { createChannelMessage } from "./createChannelMessage";

export default function NewMessagePiece({
    channelId
} : {
    channelId : number
}) {
    const [text, setText] = useState("");

    return (
        <div className="flex flex-row h-16 text-black">
            <textarea 
                onChange={e => setText(e.target.value)}
                className="grow" />
            <button
                onClick={() => createChannelMessage({channelId, text})}
                className="bg-pink-300 p-2 rounded-md">
                    <SendIcon />
            </button>
        </div>
    )
}