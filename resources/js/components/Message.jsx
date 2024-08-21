import React, { useEffect } from "react";

const Message = ({ currentUserId, message }) => {
    useEffect(() => {
        // Log message to the console
        //console.log("message", message);
        //console.log("message.sender.id:", message.sender.id, "message.user_id:", message.user_id, "message.to_id:", message.to_id);
    }, [message]);

    const date = new Date(message.updated_at);
    // Extract the date and time components
    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = date.toTimeString().split(' ')[0];
    // Combine them into the desired format
    const shortTime = `${formattedDate} ${formattedTime}`;

    return (
        <div className={`row ${currentUserId === message.sender.id ? "justify-content-end" : ""}`}>
            <div className="col-md-6">
                <small className="text-muted float-right">
                    {shortTime} -
                </small>
                <small className="text-muted"> From {message.sender.name} to {message.recipient.name}</small>
                <div className={`alert alert-${currentUserId === message.sender.id ? "primary" : "secondary"}`}
                     role="alert">
                    {message.text}
                </div>
            </div>
        </div>
    );
};

export default Message;
