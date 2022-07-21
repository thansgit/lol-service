import React from 'react'
import io from "socket.io-client"
import { useDispatch, useSelector } from "react-redux";

const socket = io('http://localhost:5000')
const Chat = () => {

    //console.log(socket)

    const users = useSelector(state => state.users)
    const { userAuth } = users

    console.log(userAuth._id);
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center  bg-custom-gray py-12 px-4 sm:px-6 lg:px-8">
                <h3 className="text-white">Join a chat</h3>
                <form>
                    <input type='text' placeholder="John..." className="border-2 border-custom-yellow" />
                    <input type='text' placeholder="Room ID..." className="border-2 border-custom-yellow" />
                    <button type='submit' className="group relative w-full flex justify-center py-2 px-4
                      text-sm font-medium rounded-md text-white
                      bg-custom-blue hover:bg-indigo-700" >Join a room</button>
                </form>
            </div>
        </>
    )
}

export default Chat
