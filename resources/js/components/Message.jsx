import React, { useEffect } from "react";

const Message = ({ loggedInUserId, message }) => {
    useEffect(() => {
        // Log message to the console
        //console.log("message", message);
        //console.log("message.sender.id:", message.sender.id, "message.user_id:", message.user_id, "message.to_id:", message.to_id);
    }, [message]);

    //console.log("message", message);
    let date;
    const isNewlyCreatedMessage = ('time' in message); // Existing messages don't have time field, only new messages (created in app/Jobs/SendMessage.php) have time
    if (isNewlyCreatedMessage) {
        //console.log("New message");
        date = new Date(message.time);
        message.sender = {}; // Create field
        message.sender.id = message.user_id;
        message.sender.name = "dummy"; // TODO
        message.recipient = {}; // Create field
        message.recipient.name = "dummy"; // TODO
    } else {
        //console.log("existing message:", message.updated_at);
        date = new Date(message.updated_at);
    }
    //console.log("date:", date);
    // Extract the date and time components
    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = date.toTimeString().split(' ')[0];
    // Combine them into the desired format
    const shortTime = `${formattedDate} ${formattedTime}`;
    const isMessageSentByLoggedInUser = loggedInUserId === message.sender.id;
    return (
        <div className={`row ${isMessageSentByLoggedInUser ? "justify-content-end" : ""}`}>
            <div className="col-md-6">
                <small className="text-muted float-right">
                    {shortTime} -
                </small>
                <small className="text-muted"> From {message.sender.name} to {message.recipient.name}</small>
                <div className={`alert alert-${isMessageSentByLoggedInUser ? "primary" : "secondary"}`}
                     role="alert">
                    {message.text}
                </div>
            </div>
        </div>
    );
};

export default Message;
