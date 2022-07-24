import React, { useState, useEffect } from 'react'
import {ArrowCircleRightIcon} from "@heroicons/react/solid";
import Moment from 'react-moment'

const ChatBox = ({ socket, nickName, room }) => {

    const [currentMessage, setCurrentMessage] = useState();

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: nickName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit('send_message', messageData);
        };
    };

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data)
        })
    }, [socket])

    return (
        <div className="flex  items-center bg-custom-gray">
            {/* Header */}
            <div className="">
                <p className="text-white">Live chat</p>
            </div>
            {/* Body */}
            <div className=""></div>
            {/* Footer */}
            <div className="bg-white">
                <input
                    type="text"
                    placeholder="Hey..."
                    onChange={(event) => setCurrentMessage(event.target.value)}
                    className="border-2 border-custom-yellow"
                />
                <button
                    className="border-2 border-custom-yellow"
                    onClick={sendMessage}
                >
                    <ArrowCircleRightIcon className="fill-black h-5 mt-5"/>
                </button>
            </div>
        </div>
    )
}

export default ChatBox
