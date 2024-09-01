import React, { useEffect, useRef, useState } from "react";
import Message from "./Message.jsx";
import MessageInput from "./MessageInput.jsx";

const ChatBox = ({ rootUrl }) => {
    //console.log("ChatBox");
    const mainElement = document.getElementById('main');

    // Extract data from the DOM elements
    const sendingUser = JSON.parse(mainElement.getAttribute('data-loggedInUser'));
    const receivingUser = JSON.parse(mainElement.getAttribute('data-selectedReceiver'));
    //console.log("sendingUser:", sendingUser, "receivingUser:", receivingUser);
    const initialMessages = JSON.parse(mainElement.getAttribute('data-messages'));
    //console.log("initialMessages:", initialMessages);

    let webSocketChannel;
    if (receivingUser.id === 0) { // Message is sent to everybody
        webSocketChannel = `channel_for_everyone`;
    } else {
        const userIds = [sendingUser.id, receivingUser.id];
        userIds.sort();
        webSocketChannel =  `channelBetweenUsers.${userIds[0]}.${userIds[1]}`;
    }
    //console.log(`ChatBox.jsx webSocketChannel: ${webSocketChannel}`);

    const [messages, setMessages] = useState(initialMessages); // Initialize with messages passed from the view
    const scroll = useRef();
    //console.log(user);
    //console.log('ChatBox', messages);

    const scrollToBottom = () => {
        //console.log("scrollToBottom");
        scroll.current.scrollIntoView({ behavior: "smooth" });
    };

    const connectWebSocket = () => {
        //console.log("connectWebSocket");
        window.Echo.private(webSocketChannel)
            .listen('GotMessage', (e) => {
                //console.log("GotMessage");
                // Append the new message to the state
                setMessages(prevMessages => [...prevMessages, e.message]);
                setTimeout(scrollToBottom, 0);
            });
    }

    useEffect(() => {
        //console.log("useEffect");
        connectWebSocket();
        scrollToBottom();

        return () => {
            window.Echo.leave(webSocketChannel);
        }
    }, []);

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Chat between {sendingUser.name} and {receivingUser.name}</div>
                    <div className="card-body" style={{height: "500px", overflowY: "auto"}}>
                        {messages?.map((message, index) => {
                            //console.log(`Rendering message ${index + 1}:`, message);
                            //console.log(`user.name: ${sendingUser.name}`);
                            return (
                                <Message key={message.id}
                                         loggedInUserId={sendingUser.id}
                                         message={message}
                                />
                            );
                        })}
                        <span ref={scroll}></span>
                    </div>
                    <div className="card-footer">
                        <MessageInput
                            rootUrl={rootUrl}
                            selectedUserId={receivingUser.id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
