import { useContext, useEffect, useRef, useState } from 'react'
import './chat.scss'
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { format } from 'timeago.js'
import { SocketContext } from '../../context/SocketContext';
import { useNotificationStore } from '../../lib/notificationStore';
function Chat({ chats }) {
    const [chat, setChat] = useState(null);
    const { currentUser } = useContext(AuthContext)
    const { socket } = useContext(SocketContext)
    const messageRef=useRef();
    console.log(chats)

    const decrease=useNotificationStore((state)=>state.decrease);
    useEffect(()=>{
        messageRef.current?.scrollIntoView({behavior:"smooth"})
    },[chat])

    const handleOpenClick = async (id, receiver) => {
        try {
            const getSingleChat = await apiRequest.get("/chats/" + id);
            if(!getSingleChat.data.seenBy.includes(currentUser.id)){
                decrease();
            }
            setChat({ ...getSingleChat.data, receiver });
        } catch (error) {
            console.log(error)
        }

    }
    const test = () => {
        socket.emit("test", "hello from client secod time");
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const text = formData.get("text");

        try {
            const res = await apiRequest.post("/messages/" + chat.id, { text });
            setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
            //send message to the server from server to client
            socket.emit("sendMessage", {
                receiverId: receiver.id,
                data: res.data
            })
            e.target.reset();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const read = async () => {
            try {
                await apiRequest.put("/chats/read/" + chat.id);
            } catch (error) {
                console.log(error)
            }
        }
        if ((chat && socket)) {
            socket.on("getMessage", (data) => {
                if (chat.id === data.chatId) {
                    setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }))
                    read();
                }
            })
        }
        return () => {
            socket.off("getMessage");
          };
        
    },[chat,socket])
    return (
        <div className="chat">
            
            <div className="messages">
                <h1>Messages</h1>
                {
                    chats?.map((c) => (
                        <div className="message"
                            key={c.id}
                            style={{
                                backgroundColor:
                                    c.seenBy.includes(currentUser.id) || chat?.id == c.id ? "white" : "#fecd514e"
                            }}
                            onClick={() => handleOpenClick(c.id, c.receiver)}
                        >
                            <img src={c.receiver.avatar || "/logo.png"} alt="" />
                            <span>{c.receiver.username}</span>
                            <p>{c.lastMessage}</p>
                        </div>
                    ))
                }
            </div>
            {
                chat && <div className="chatBox">
                    <div className="top">
                        <div className="user">
                            <img src={chat.receiver.avatar || "/logo.png"} alt="" />
                            {chat.receiver.username}
                        </div>
                        <span className="close" onClick={() => setChat(null)}>X</span>
                    </div>
                    <div className="center">
                        {
                            chat.messages.map((message) => (
                                <div className="chatMessage" key={message.id}
                                    style={{
                                        alignSelf: message.userId === currentUser.id ? "flex-end" : "flex-start",
                                        textAlign: message.userId === currentUser.id ? "right" : "left",
                                    }}
                                >
                                    <p>{message.text} </p>
                                    <span>{format(message.createdAt)}</span>
                                </div>
                            ))
                        }
                        <div ref={messageRef}></div>
                    </div>
                    <form onSubmit={handleSubmit} className="bottom">
                        <textarea name="text" id="text" placeholder='type text'></textarea>
                        <button>Send</button>
                    </form>
                </div>
            }

        </div>
    )
}

export default Chat