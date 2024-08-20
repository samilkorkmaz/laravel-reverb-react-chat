import React, { useEffect, useRef, useState } from "react";
import Message from "./Message.jsx";
import MessageInput from "./MessageInput.jsx";

const ChatBox = ({ rootUrl }) => {
    console.log("ChatBox");
    const mainElement = document.getElementById('main');

    // Extract user data from the DOM element
    const userData = mainElement.getAttribute('data-user');
    const user = JSON.parse(userData);
    console.log(user);

    // Extract messages data from the DOM element
    const messagesData = mainElement.getAttribute('data-messages');
    const initialMessages = JSON.parse(messagesData);
    console.log(initialMessages);

    const webSocketChannel = `App.Models.User.${user.id}`;
    //const webSocketChannel = `channel_for_everyone`;

    const [messages, setMessages] = useState(initialMessages); // Initialize with messages passed from the view
    const scroll = useRef();

    console.log("1");
    const scrollToBottom = () => {
        console.log("scrollToBottom");
        scroll.current.scrollIntoView({ behavior: "smooth" });
    };
    console.log("2");

    const connectWebSocket = () => {
        console.log("connectWebSocket");
        window.Echo.private(webSocketChannel)
            .listen('GotMessage', (e) => {
                // Append the new message to the state
                setMessages(prevMessages => [...prevMessages, e.message]);
                setTimeout(scrollToBottom, 0);
            });
    }
    console.log("3");

    useEffect(() => {
        console.log("useEffect");
        connectWebSocket();
        scrollToBottom();

        return () => {
            window.Echo.leave(webSocketChannel);
        }
    }, []);
    console.log("4");

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Chat Box - {user.name}</div>
                    <div className="card-body" style={{height: "500px", overflowY: "auto"}}>
                        {messages?.map((message) => (
                            <Message key={message.id}
                                     userId={user.id}
                                     message={message}
                            />
                        ))}
                        <span ref={scroll}></span>
                    </div>
                    <div className="card-footer">
                        <MessageInput rootUrl={rootUrl} currentUserId={user.id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
