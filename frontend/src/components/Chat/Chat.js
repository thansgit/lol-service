import React, { useEffect, useState, useRef } from 'react'
import io from "socket.io-client"
import { useDispatch, useSelector } from "react-redux";
import { chatsFetchAction } from "../../redux/slices/chat/chatSlices";
import Footer from "../../utils/Footer";
import Conversation from "./Conversation";
import Message from "./Message";



const Chat = () => {
    const dispatch = useDispatch();
    const socket = useRef();
    const users = useSelector(state => state.users)
    const { userAuth } = users;
    const currentUserId = userAuth?._id;

    const [arrivalMessage, setArrivalMessage] = useState('null')

    //Connect socket
    useEffect(() => {
        socket.current = io('http://localhost:5000');
        socket.current.on('getMessage', (data) => ({
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now(),

        }))
    }, [])

    // useEffect(() => {
    //     arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages([...messages, arrivalMessage])
    // },[arrivalMessage])
    //Send current user id to server in order to populate it with socket id
    useEffect(() => {
        socket.current.emit('addUser', currentUserId);
        socket.current.on('getUsers', onlineUsers => {
            console.log(onlineUsers);
        });
    }, [currentUserId])

    //Fetch all chats by current user
    useEffect(() => {
        dispatch(chatsFetchAction(currentUserId));
    }, [currentUserId, dispatch]);
    const chats = useSelector(state => state.chats)
    const { loading, appErr, serverErr, userChats } = chats;


    const message = {
        sender: currentUserId,
        text: 'NewMessage, maybe in useState',
        conversationId: 'currentChat._id'
    }

    //const receiverId = currentChat.members.find(member => member !== currentUserId)

    // socket.current.emit('sendMessage', {
    //     senderId: currentUserId,
    //     receiverId: receiverId,
    //     text: 'NewMessageState'
    // });


    return (
        <>
            {/* classname=Messenger */}
            <div className="min-h-screen flex">
                {/* chatMenus */}
                <div className=" basis-1/4 bg-custom-gray-light">
                    {/* ChatMenuWrapper */}
                    <div className="p-10 text-black">
                        <input placeholder="Search for friends..." className="w-11/12" />
                        <Conversation  />
                        <Conversation />
                        <Conversation />
                    </div>

                </div>
                {/* chatBox */}
                <div className="basis-1/2 bg-custom-gray">
                    {/* chatBoxWrapper */}
                    <div className="p-10 text-white">

                        <div className="">
                            <Message />
                            <Message own={true}/>
                            <Message />
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <textarea placeholder="Write something...." 
                            className="w-4/5 h-24 text-black"
                            />
                            <button className="">Send message</button>
                        </div>
                    </div>
                </div>
                {/* chatOnline */}
                <div className="basis-1/4 bg-custom-gray-light">
                    {/* chatOnlineWrapper */}
                    <div className="p-10 text-white">
                        online
                    </div>
                </div>

            </div>


            <Footer />
        </>
    )
}

export default Chat
